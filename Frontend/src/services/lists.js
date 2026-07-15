import { api } from './api'

export const getLists = async()=>{
    const response = await api('/lists');
    return response.lists;
}

export const addToList = async(book) =>{
    const response = await api('/lists' , {
        method: "POST",
        body: JSON.stringify(book),
    })
  return response.book
}