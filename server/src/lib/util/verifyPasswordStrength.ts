const verifyPasswordStrength = (password: string): boolean => {
  const regexUpperCase = /[A-Z]/
  const regexLowerCase = /[a-z]/
  const regexNumeric = /[0-9]/
  const regexSpecialChar = /[!@#$%^&*]/

  if (password.length < 8) {
    return false
  }

  if (!regexUpperCase.test(password)) {
    return false
  }

  if (!regexLowerCase.test(password)) {
    return false
  }

  if (!regexNumeric.test(password)) {
    return false
  }

  if (!regexSpecialChar.test(password)) {
    return false
  }

  return true
}

export default verifyPasswordStrength
