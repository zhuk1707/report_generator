import formatNumber from "./formatNumber.js";
import createSoldDeviseString from "./createSoldDeviseString.js";

const generateReportArray = (formData, soldDevices) => {
  let reportArr = [`Курс $ = ${formData.rate}\n`]

  let shopName = ''
  if (formData.shopName === "almi") shopName = 'АЛМИ'
  if (formData.shopName === "mv") shopName = 'МВ'

  if (!formData.rentCount && !soldDevices.length > 0 && !formData.hardware) {
    return `${shopName}: 0р`
  }

  reportArr.push(shopName + ':\n')

  const allRentsValue = formData.rentCost * formData.rentCount
  const allSoldDevicesValue = soldDevices.reduce((prev, curr) => {
    return prev + +curr.deviceCost
  }, 0)

  reportArr.push(`${formData.rentCount} прокат(а/ов) — ${allRentsValue}р`)

  if (soldDevices.length > 0) {
    reportArr.push('\n\nПродажи:\n')

    let allSoldDevicesList = soldDevices.map((el) => '  ' + createSoldDeviseString(el.deviceName,
      el.deviceType,
      el.deviceSize,
      el.isUsed,
      el.deviceCost
    ))

    reportArr.push(allSoldDevicesList.join('\n'))
  }

  if (formData.hardware > 0) {
    reportArr.push(`\n\nЖелезо — ${formData.hardware}р`)
  }

  const allProfit = allRentsValue + formData.hardware + allSoldDevicesValue
  const allProfitUSD = formatNumber(allProfit / formData.rate)
  reportArr.push(`\n\nИтого: ${allProfit}р (${allProfitUSD}$)`)

  return reportArr
}

export default generateReportArray