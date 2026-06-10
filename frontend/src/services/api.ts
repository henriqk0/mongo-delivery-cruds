const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

async function request<T>(method: string, path: string, data?: unknown): Promise<{ data: T }> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return { data: json };
}

export const clientesAPI = {
  listar: () => request<any[]>('GET', '/cliente/'),
  criar: (data: any) => request<any>('POST', '/cliente/', data),
  buscar: (id: string) => request<any>('GET', `/cliente/${id}`),
  atualizar: (id: string, data: any) => request<any>('PUT', `/cliente/${id}`, data),
  deletar: (id: string) => request<any>('DELETE', `/cliente/${id}`),
};

export const restaurantesAPI = {
  listar: () => request<any[]>('GET', '/restaurante/'),
  criar: (data: any) => request<any>('POST', '/restaurante/', data),
  buscar: (id: string) => request<any>('GET', `/restaurante/${id}`),
  atualizar: (id: string, data: any) => request<any>('PUT', `/restaurante/${id}`, data),
  deletar: (id: string) => request<any>('DELETE', `/restaurante/${id}`),
};

export const itensCardapioAPI = {
  listar: () => request<any[]>('GET', '/item_cardapio/'),
  criar: (data: any) => request<any>('POST', '/item_cardapio/', data),
  buscar: (id: string) => request<any>('GET', `/item_cardapio/${id}`),
  atualizar: (id: string, data: any) => request<any>('PUT', `/item_cardapio/${id}`, data),
  deletar: (id: string) => request<any>('DELETE', `/item_cardapio/${id}`),
};

export const pedidosAPI = {
  listar: () => request<any[]>('GET', '/pedido/'),
  criar: (data: any) => request<any>('POST', '/pedido/', data),
  buscar: (id: string) => request<any>('GET', `/pedido/${id}`),
  atualizar: (id: string, data: any) => request<any>('PUT', `/pedido/${id}`, data),
  deletar: (id: string) => request<any>('DELETE', `/pedido/${id}`),
};

export const entregadoresAPI = {
  listar: () => request<any[]>('GET', '/entregador/'),
  criar: (data: any) => request<any>('POST', '/entregador/', data),
  buscar: (id: string) => request<any>('GET', `/entregador/${id}`),
  atualizar: (id: string, data: any) => request<any>('PUT', `/entregador/${id}`, data),
  deletar: (id: string) => request<any>('DELETE', `/entregador/${id}`),
};

const api = { request };
export default api;