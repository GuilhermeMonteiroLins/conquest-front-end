const validarCPF = (CPF) => {
    let soma = 0
    let resto = 0

    const cpfLimpo = CPF.replace(/\D+/g, '')
    const padrao = /^(\d)\1{10}$/

    if (padrao.test(cpfLimpo) || cpfLimpo.length != 11) {
        return false
    }

    for (let i=1; i<=9; i++) {  
	    soma = soma + parseInt(cpfLimpo.substring(i-1, i)) * (11 - i); 
    }

    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) 
	resto = 0;
    if (resto != parseInt(cpfLimpo.substring(9, 10)) )
	return false;
	soma = 0;
    for (let i = 1; i <= 10; i++) 
       soma = soma + parseInt(cpfLimpo.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11
    
    if ((resto == 10) || (resto == 11)) 
	resto = 0
    
    if (resto != parseInt(cpfLimpo.substring(10, 11) ) ) {
        return false
    }
    return true
}
/*
console.log(validarCPF("64893284029"))
console.log(validarCPF("12332112312"))
console.log(validarCPF("11111111111"))
console.log(validarCPF('69160768010'))
*/

export default validarCPF