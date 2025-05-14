import React from "react";

export default function ReportContent({formInputs, salesItemInputs, setClipboard}) {
  let rate = +formInputs.rate
  if (isNaN(rate)) rate = 0

  const shopNameFromInput = formInputs.shopName
  const shopList = {
    almi: "АЛМИ",
    mv: 'МВ'
  }
  const shopName = shopList[shopNameFromInput]

  const rentCount = +formInputs.rentCount
  const hardware = +formInputs.hardware

  const rentProfit = rentCount * 14
  const amount = rentCount * 14 + hardware

  const sales = salesItemInputs.filter(el => {
    if (el.price !== 0) {
      return el
    }
  })

  const allAmount = sales.reduce((prev, el) => {
    return prev + (el.price * el.count)
  }, amount)

  const allAmountUsd = (allAmount / rate).toFixed(2)

  const renderSales = (sales) => {
    return sales.map((el, index) => {
      return <div key={index}>{el.itemName} {el.checkbox ? 'used' : ''} — {el.price}р</div>
    })
  }

  const getSalesList = (sales) => {
    return sales.reduce((prev, el) => {
      return prev + `${el.itemName} ${el.checkbox ? 'used' : ''} — ${el.price}р\n`
    }, '')
  }

  if (hardware && sales.length && rentCount) {
    setClipboard(`Курс = ${rate}\n${shopName}:\n${rentCount} прокат(а/ов) — ${rentProfit}р\n\nПродажи:\n${getSalesList(sales)}\nЖелезо — ${hardware}р\n\nИтого: ${allAmount}р (${allAmountUsd}$)`)

    return (
      <div className="report__container">
        Курс = {rate} <br/>
        {shopName}:<br/>
        {rentCount} прокат(а/ов) — {rentProfit}р<br/> <br/>
        Продажи:
        {renderSales(sales)} <br/>
        Железо — {hardware}р<br/><br/>
        Итого: {allAmount}р ({allAmountUsd}$)<br/>
      </div>
    );
  }

  if (sales.length && rentCount) {
    setClipboard(`Курс = ${rate}\n${shopName}:\n${rentCount} прокат(а/ов) — ${rentProfit}р\n\nПродажи:\n${getSalesList(sales)}\nИтого: ${allAmount}р (${allAmountUsd}$)`)

    return (
      <div className="report__container">
        Курс = {rate} <br/>
        {shopName}:<br/>
        {rentCount} прокат(а/ов) — {rentProfit}р<br/> <br/>
        Продажи:
        {renderSales(sales)} <br/>
        Итого: {allAmount}р ({allAmountUsd}$)<br/>
      </div>
    );
  }

  if (hardware && sales.length) {

    setClipboard(`Курс = ${rate}\n${shopName}:\n${rentCount} прокат(а/ов) — ${rentProfit}р\n\nПродажи:\n${getSalesList(sales)} \nЖелезо — ${hardware}р\nИтого: ${allAmount}р (${allAmountUsd}$)`)

    return (
      <div className="report__container">
        Курс = {rate} <br/>
        {shopName}:<br/>
        {rentCount} прокат(а/ов) — {rentProfit}р<br/> <br/>
        Продажи:
        {renderSales(sales)} <br/>
        Железо — {hardware}р<br/><br/>
        Итого: {allAmount}р ({allAmountUsd}$)<br/>
      </div>
    );
  }

  if (hardware) {
    setClipboard(`Курс = ${rate} \n${shopName}:\n${rentCount} прокат(а/ов) — ${rentProfit}р\nЖелезо — ${hardware}\nИтого: ${allAmount}р (${allAmountUsd}$)`)

    return (
      <div className="report__container">
        Курс = {rate} <br/>
        {shopName}:<br/>
        {rentCount} прокат(а/ов) — {rentProfit}р<br/>
        Железо — {hardware}<br/>
        Итого: {allAmount}р ({allAmountUsd}$)<br/>
      </div>)

  }

  if (sales.length) {
    setClipboard(`Курс = ${rate}\n${shopName}:\n${rentCount} прокат(а/ов) — ${rentProfit}р\n\nПродажи:\n${getSalesList(sales)}\nИтого: ${allAmount}р (${allAmountUsd}$)`)

    return (
      <div className='report__container'>
        Курс = {rate} <br/>
        {shopName}:<br/>
        {rentCount} прокат(а/ов) — {rentProfit}р<br/><br/>
        Продажи:
        {renderSales(sales)} <br/>
        Итого: {allAmount}р ({allAmountUsd}$)<br/>
      </div>
    )
  }

  if (!rentCount) {
    setClipboard(`${shopName}: 0\n`)

    return (
      <div className="report__container">
        {shopName}: 0<br/>
      </div>
    )
  }

  setClipboard(`Курс = ${rate}\n${shopName}:\n${rentCount} прокат(а/ов) — ${allAmount}р (${allAmountUsd}$)`)
  return (
    <div className="report__container">
      Курс = {rate} <br/>
      {shopName}:<br/>
      {rentCount} прокат(а/ов) — {allAmount}р ({allAmountUsd}$)
    </div>
  )
}
