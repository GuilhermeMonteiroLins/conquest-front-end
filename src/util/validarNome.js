const validarNome = (nome) => {
    
    nome = nome.trim()
    let padrao = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
    
    return padrao.test(nome)
}

export default validarNome