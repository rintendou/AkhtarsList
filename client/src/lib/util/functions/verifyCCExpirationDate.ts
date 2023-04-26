const verifyCCExpirationDate = (date: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
    return regex.test(date)
}

export default verifyCCExpirationDate