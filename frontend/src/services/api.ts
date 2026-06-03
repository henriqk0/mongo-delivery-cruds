import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const clientesAPI = {
  listar: () => api.get('/cliente/'),
  criar: (data: any) => api.post('/cliente/', data),
  buscar: (id: string) => api.get(`/cliente/${id}`),
  atualizar: (id: string, data: any) => api.put(`/cliente/${id}`, data),
  deletar: (id: string) => api.delete(`/cliente/${id}`),
};

export const restaurantesAPI = {
  listar: () => api.get('/restaurante/'),
  criar: (data: any) => api.post('/restaurante/', data),
  buscar: (id: string) => api.get(`/restaurante/${id}`),
  atualizar: (id: string, data: any) => api.put(`/restaurante/${id}`, data),
  deletar: (id: string) => api.delete(`/restaurante/${id}`),
};

export const itensCardapioAPI = {
  listar: () => api.get('/item_cardapio/'),
  criar: (data: any) => api.post('/item_cardapio/', data),
  buscar: (id: string) => api.get(`/item_cardapio/${id}`),
  atualizar: (id: string, data: any) => api.put(`/item_cardapio/${id}`, data),
  deletar: (id: string) => api.delete(`/item_cardapio/${id}`),
};

export const pedidosAPI = {
  listar: () => api.get('/pedido/'),
  criar: (data: any) => api.post('/pedido/', data),
  buscar: (id: string) => api.get(`/pedido/${id}`),
  atualizar: (id: string, data: any) => api.put(`/pedido/${id}`, data),
  deletar: (id: string) => api.delete(`/pedido/${id}`),
};

export const entregadoresAPI = {
  listar: () => api.get('/entregador/'),
  criar: (data: any) => api.post('/entregador/', data),
  buscar: (id: string) => api.get(`/entregador/${id}`),
  atualizar: (id: string, data: any) => api.put(`/entregador/${id}`, data),
  deletar: (id: string) => api.delete(`/entregador/${id}`),
};

export default api;