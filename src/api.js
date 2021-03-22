import axios from 'axios'

let instance = axios.create({
  withCredentials:true, 
  baseURL:'https://social-network.samuraijs.com/api/1.0/users',
  headers:{"API-KEY":"c0a17497-1a2e-493a-b759-d597a8494645"}
})

const getUsers = (currentPage, pageSize)=>{
  return instance.get(`?page= ${currentPage} &count= ${pageSize}`)
}

export default getUsers