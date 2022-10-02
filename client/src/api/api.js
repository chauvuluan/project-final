import { apiEndpoint } from '../config'

import Axios from 'axios'

export  function getEmployees(idToken){
 

  const response =  Axios.get(`${apiEndpoint}/employees`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Todos:', response.data)
  return response.data.todos
}