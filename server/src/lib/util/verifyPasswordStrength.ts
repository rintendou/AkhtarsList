const verifyPasswordStrength = (password: string): boolean => {
  const regexUpperCase = /[A-Z]/
  const regexLowerCase = /[a-z]/
  const regexNumeric = /[0-9]/
  const regexSpecialChar = /[!@#$%^&*]/

  if (
    password.length < 8 ||
    !regexUpperCase.test(password) ||
    !regexLowerCase.test(password) ||
    !regexNumeric.test(password) ||
    !regexSpecialChar.test(password)
  ) {
    return false
  } else {
    return true
  }
}

export default verifyPasswordStrength
