const generateDateStringPattern = () => {
    let stringDate = ''
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()
    const year = date.getFullYear()

    stringDate = `${day}/${month}/${year}`
    return stringDate
}

export default generateDateStringPattern;