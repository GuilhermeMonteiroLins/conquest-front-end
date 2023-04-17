const validarEmail = (email) => {
    email = email.trim()
    let containsDot = email.indexOf(".")
    let containsAt = email.indexOf("@")

    return containsAt != -1 && containsDot != -1
}


export default validarEmail