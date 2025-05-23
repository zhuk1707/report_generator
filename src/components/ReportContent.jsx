import React from "react";

export default function ReportContent({formInputs, salesItemInputs, setClipboard}) {
  const rate = isNaN(+formInputs.rate) ? 0 : +formInputs.rate;
  const shopName = {almi: "АЛМИ", mv: "МВ"}[formInputs.shopName] || formInputs.shopName;

  const rentCount = +formInputs.rentCount;
  const hardware = +formInputs.hardware;
  const rentProfit = rentCount * +formInputs.rentCost;
  const baseAmount = rentProfit + hardware;

  const sales = salesItemInputs.filter(({price}) => price !== 0);
  const salesList = sales
    .map(({itemName, price, count, checkbox}) => {
      return `${itemName} ${checkbox ? "used" : ""} X ${count} — ${price * count}р`;
    })
    .join("\n");


  const totalAmount = sales.reduce((sum, {price, count}) => sum + price * count, baseAmount);
  const totalAmountUsd = (totalAmount / rate).toFixed(2);

  const reportClipboard = [`Курс = ${rate}`, `${shopName}:`, `${rentCount} прокат(а/ов) — ${rentProfit}р`];

  if (sales.length) {
    reportClipboard.push("\nПродажи:", salesList);
  }

  if (hardware) {
    reportClipboard.push(`\nЖелезо — ${hardware}р`);
  }

  if (sales.length || hardware || rentCount) {
    reportClipboard.push(`\nИтого: ${totalAmount}р (${totalAmountUsd}$)`);
  }

  setClipboard(reportClipboard.join("\n"));

  return (
    <div className="report__container">
      {reportClipboard.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
}
