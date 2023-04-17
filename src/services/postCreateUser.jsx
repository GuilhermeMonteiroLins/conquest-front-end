import { api } from "./api"
export default async (userJSON) =>{
    api.post("/conquest/backoffice/user/register", userJSON)
    .then(response => console.log(response.data))
    .catch(error => console.error(error))
}