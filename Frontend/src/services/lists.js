import { api } from './api'

export const getLists = async()=>{
    const response = await api('/lists');
    return response.lists;
}