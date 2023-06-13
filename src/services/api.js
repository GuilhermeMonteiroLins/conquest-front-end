const url = "http://localhost:8080/conquest";

export const apiUserCad = async (nameUser, cpf, email, password, group) => {
  let data;
  await fetch(`${url}/backoffice/user/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      userName: nameUser,
      userCpf: cpf,
      userEmail: email,
      userPassword: password,
      userGroup: group,
    }),
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      data = await error.json();
    });
  console.log(data);
  return data;
};

export const apiUserAlt = async (id, nome, cpf, email, senha, grupo, status) => {
  let data;
  const object = JSON.stringify({
    userId: id,
    userName: nome,
    userEmail: email,
    userCpf: cpf,
    userPassword: senha,
    userGroup: grupo,
    userStatus: status,
  })
  await fetch(`${url}/backoffice/user/update`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: object,
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      console.log(object)
      //data = await error.json();
    });
  console.log(data);
  return data;
};

export const apiUserList = async () => {
  let data;
  const object = []
  await fetch(`${url}/backoffice/user/list`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    }
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      console.log(object)
      //data = await error.json();
    });
  return data;
  // Retornar apenas a lista
};

export const apiCustomerLogin = async (email, password) => {
  let data
  const object = JSON.stringify({
    userEmail: email,
    userPassword: password
  })
  await fetch(`${url}/customer/logincustomer`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: object
  })
    .then(async response => {
      data = await response.json()
    })
    .catch(async error => {
      return null;
    })
  return data
}

export const apiCustomerCad = async (
  nome,
  cpf,
  email,
  senha,
  cep,
  logradouro,
  bairro,
  localidade,
  uf,
  complemento,
  numero,
  genero,
  dataAniver
) => {
  let data
  await fetch(`${url}/customer/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      userName: nome,
      userCpf: cpf,
      userEmail: email,
      userPassword: senha,
      userGender: genero,
      userBirthDate: dataAniver,
      userAddress: [
        {
          cep: cep,
          logradouro: logradouro,
          bairro: bairro,
          localidade: localidade,
          uf: uf,
          complemento: complemento,
          numero: numero,
          addressCustomer: true
        }
      ]
    })
  })
    .then(async response => {
      data = await response.json()
    })
    .catch(async error => {
      data = await error.json()
    })
  console.log(data)
  return data
}

export const apiCustomerAlt = async (id, nome, genero, dataNascimento, senha) => {
  let data
  const object = JSON.stringify({
    userId: id,
    userName: nome,
    userGender: genero,
    userBirthDate: dataNascimento,
    userPassword: senha
  })
  await fetch(`${url}/customer/update`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: object
  })
    .then(async response => {
      data = await response.json()
    })
    .catch(async error => {
      return null;
    })
  return data
};

export const apiCustomerData = async (id) => {
  let data;
  await fetch(`${url}/customer?id_customer=${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    }
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      //data = await error.json();
    });
  return data;
};


export const apiListAddress = async (idUser) => {
  const response = await fetch(`${url}/customer/list/address?id_customer=${idUser}`);
  return response;
}

export const apiUserBackLogin = async (email, password) => {
  let data;
  const object = JSON.stringify({
    userEmail: email,
    userPassword: password,
  })
  await fetch(`${url}/user/loginbackoffice`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: object,
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      console.log(object)
      //data = await error.json();
    });
  return data;
};

export const apiProdUpdate = async (prodId, prodName, prodDesc, prodQtd, prodValue, prodReview, prodStatus, prodImages) => {
  let data;
  const object = JSON.stringify({
    productId: prodId,
    productName: prodName,
    productDescription: prodDesc,
    productQuantity: prodQtd,
    productValue: prodValue,
    productReview: prodReview,
    productStatus: prodStatus,
    productImages: prodImages
  })
  await fetch(`${url}/backoffice/product/update`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: object,
  })
    .then(async (response) => {
      data = await response.status;
    })
    .catch(async (error) => {
      console.log(object)
    });
  console.log(data);
  return data;
};


export const apiProdList = async () => {
  let data = [];
  const object = []
  await fetch(`${url}/backoffice/product/list`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    }
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      console.log(object)
      //data = await error.json();
    });
  return data;
  // Retornar apenas a lista
};


export const apiCEPList = async (cep) => {
  let data

  await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(async response => {
      data = await response.json()
      console.log(data)
    })
    .catch(async error => {
      console.log(error)
      //data = await error.json();
    })
  return data
  // Retornar apenas a lista
}

export const apiUserStatus = async (id, statusUser) => {
  let data;
  const object = JSON.stringify({
    userId: id,
    userStatus: statusUser,
  })
  await fetch(`${url}/backoffice/user/update/status`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: object,
  })
    .then(async (response) => {
      data = await response.status;
    })
    .catch(async (error) => {
      console.log(object)
      //data = await error.json();
    });
  console.log(data);
  return data;
};

export const apiProdStatus = async (productId, productStatus) => {
  let data;
  const object = JSON.stringify({
    productId: productId,
    productStatus: productStatus
  })
  await fetch(`${url}/backoffice/product/update/status`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: object,
  })
    .then(async (response) => {
      data = await response.status;
    })
    .catch(async (error) => {
      console.log(object)
    });
  console.log(data);
  return data;
};

export const apiUserSearch = async (nameUser) => {
  let data;
  const object = JSON.stringify({
    userName: nameUser,
  })
  console.log(object)
  await fetch(`${url}/backoffice/user/search`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: object,
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      console.log(error)
    });
  console.log(data);
  return data;
}

export const apiProdSearch = async (prod) => {
  let data;
  const object = JSON.stringify({
    productName: prod,
  })
  console.log(object)
  await fetch(`${url}/backoffice/product/search`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: object,
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      console.log(error)
    });
  console.log(data);
  return data;
}

export const apiUserData = async (userId) => {
  let data;
  await fetch(`${url}/backoffice/user?id_user=` + userId, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    }
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      //data = await error.json();
    });
  return data;
};

export const apiProdVisualize = async (prodId) => {
  let data;
  await fetch(`${url}/backoffice/product/visualize?product_id=` + prodId, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    }
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      //data = await error.json();
    });
  return data;
};


export const apiCadProduct = async (object) => {
  console.log(object);
  let response = await fetch(`${url}/backoffice/product/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      productName: object.productName,
      productDescription: object.productDescription,
      productQuantity: object.productQuantity,
      productValue: object.productValue,
      productReview: object.productReview,
      productImages: object.productImages
    })
  });


  return response.status;
}

export const listAllProducts = async () => {
  let data
  await fetch(`${url}/product`, {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  })
  .then(response => data = response.json())
  .catch(error => console.log(error))
  return data;
}

export const listAllProductsBySearch = async (searchString) => {
  try {
    const response = await fetch(`${url}/product/search`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        productName: searchString,
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const orderAdd = async (json) => {
  const response = await fetch(`${url}/customer/order/add`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(json)
  });

  if (response.status === 200) {
    return response.json();
  }

  return null;
}

export const apiOrderList = async (id) => {
  let data = [];
  const object = []
  await fetch(`${url}/customer/order?customer_id=${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    }
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      console.log(object)
      //data = await error.json();
    });
  return data;
  // Retornar apenas a lista
};

export const apiAddAddress = async (address, idCustomer) => {
  let data = {}
  const payload = {
    userId: idCustomer,
    // addressId: address.addressId,
    cep: address.cep,
    logradouro: address.logradouro,
    bairro: address.bairro,
    localidade: address.localidade,
    uf: address.uf,
    complemento: address.complemento,
    numero: address.numero,
    isAddressCustomer: address.addressCustomer
  }
  
  // window.alert('content/n ' + Object.entries(payload))
  // console.log('conteudo', payload)

  await fetch(`${url}/customer/register/address`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json",
    }
  })
  .then(async (response) => {
    data = await response.json();
  })
  .catch(async (error) => {
    console.log(object)
    //data = await error.json();
  });

  return data
}

export const apiOrders = async () => {
  let data = [];
  const object = []
  await fetch(`${url}/backoffice/order`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    }
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      console.log(object)
      //data = await error.json();
    });
  return data;
  // Retornar apenas a lista
};

export const apiOrderSearch = async (id) => {
  let data;

  await fetch(`${url}/backoffice/order/id/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(async (response) => {
      data = await response.json();
    })
    .catch(async (error) => {
      console.log(error)
    });

  return data;
}

export const apiUpdateOrder = async (status, customerId, userId, orderId) => {
  let data;

  const object = JSON.stringify({
    status: status,
    customerId: customerId,
    orderId:orderId
  })
  await fetch(`${url}/backoffice/order/update/status?user_id=${userId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: object,
  })
    .then(async (response) => {
      data = await response.status;
    })
    .catch(async (error) => {
      console.log(object)
    });
  return data;
}

export const apiDisableAddress = async (idAddress) => {
  const response = await fetch(`${url}/customer/disable/address?id_address=${idAddress}`);
  return response;
}