export const shortNumber = (num: number): string => {
  const twoDigits = 1000
  const oneDigit = 10000
  const threeDigits = 100000
  const million = 1000000
  if (num < twoDigits) return num.toString()
  if (num < oneDigit) return (num / 1000).toFixed(2).replace(/\.0$/, '') + 'K'
  if (num < threeDigits)
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  if (num < million) return (num / 1000).toFixed(0).replace(/\.0$/, '') + 'K'
  return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
}
