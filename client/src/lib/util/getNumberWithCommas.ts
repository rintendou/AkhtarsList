const getNumberWithCommas = (number: number) => {
  // Convert the number to a string
  let numberString = String(number)

  // Insert commas at every 3 digits from the end of the string
  numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return numberString
}

export default getNumberWithCommas
