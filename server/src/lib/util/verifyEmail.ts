const verifyEmail = (email: string): boolean => {
    const regex = /^\S+@\S+\.\S+$/
    return regex.test(email)
}

export default verifyEmail