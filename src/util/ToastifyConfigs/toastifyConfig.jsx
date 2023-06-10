const toastifyConfig = {
    login: {
        text: "Operação concluída com sucesso! 🚀",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        close: true
    },
    error: {
        text: "Usuário ou senha inválidos!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
    },
    warning: {
        text: "Atenção! Esta ação pode ser irreversível",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #f6d365, #fda085)",
    },
    Denied: {
        text: "Você não possui permissão para tal ação! ⛔",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #f6d365, #fda085)",
    },
    requiredAddress: {
        text: "Por favor, escolha um endereço!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"        
    },
    requiredAuthenticate: {
        text: "Necessário autenticar no sistema para prosseguir com o pagamento!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        close: true   
    },
    errorInPayment: {
        text: "Erro ao efetuar pagamento!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"     
    },
    errorCartEmpty: {
        text: "Seu carrinho esta vazio!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"     
    },
};

export default toastifyConfig; 