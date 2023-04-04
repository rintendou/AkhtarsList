const numberInputIsValid = (number: string) => {
  return !isNaN(Number(number)) && number.length !== 0 && Number(number) >= 0
}

export default numberInputIsValid
