import capitaliseWord from "./capitaliseWord.js";

const createSoldDeviseString = (name, type, size, isUsed, cost) => {
  let newName = capitaliseWord(name)
  let newSize = ''

  if (size === 'mikro') newSize = '10mm'
  if (size === 'ultra') newSize = '4mm'
  if (size === 'nano') newSize = '2mm'

  let newIsUsed = isUsed ? 'used' : 'new'
  return `${newName} ${type}. ${newSize} ${newIsUsed} — ${cost}p`
}

export default createSoldDeviseString