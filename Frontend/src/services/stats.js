import { api } from './api'

export const getStats = async() =>{
    const response = await api('/stats');
    return response.stats;
}