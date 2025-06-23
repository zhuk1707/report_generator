const formatNumber = (number) => {
  return Number.isInteger(number)
    ? number
    : (Math.round(number * 100)) / 100
}

export default formatNumber