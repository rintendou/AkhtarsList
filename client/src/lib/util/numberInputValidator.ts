const numberInputIsValid = (number: string) => {
  return (
    !isNaN(Number(number)) && number.trim.length !== 0 && Number(number) >= 0
  )
}

export default numberInputIsValid
