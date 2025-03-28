import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const cnpjApi = axios.create({
  baseURL: 'https://publica.cnpj.ws/cnpj',
  headers: {
    Authorization: `Bearer ${process.env.CNPJ_API_KEY}`,
  },
}) 