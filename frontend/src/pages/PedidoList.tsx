import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { pedidosAPI, restaurantesAPI, clientesAPI } from '../services/api';
import { Trash2, Edit2, ShoppingCart, Calendar, DollarSign, PlusCircle } from 'lucide-react';

const PedidoList: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [restaurantes, setRestaurantes] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroRestaurante, setFiltroRestaurante] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [pedidosRes, restaurantesRes, clientesRes] = await Promise.all([
          pedidosAPI.listar(),
          restaurantesAPI.listar(),
          clientesAPI.listar(),
        ]);
        setPedidos(pedidosRes.data);
        setRestaurantes(restaurantesRes.data);
        setClientes(clientesRes.data);
      } catch (err) {
        setError('Erro ao carregar dados');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const restauranteMap = useMemo(() => {
    const map: Record<string, string> = {};
    restaurantes.forEach(r => {
      map[r._id] = r.dscNomeFantasiaRest || r.dscRazaoSocialRest;
    });
    return map;
  }, [restaurantes]);

  const clienteMap = useMemo(() => {
    const map: Record<string, string> = {};
    clientes.forEach(c => {
      map[c._id] = c.nomClnt;
    });
    return map;
  }, [clientes]);

  const pedidosFiltrados = useMemo(() => {
    if (!filtroRestaurante) return pedidos;
    return pedidos.filter(p => p.idRestaurantePed === filtroRestaurante);
  }, [pedidos, filtroRestaurante]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        await pedidosAPI.deletar(id);
        setPedidos(pedidos.filter(pedido => pedido._id !== id));
      } catch (err) {
        setError('Erro ao excluir pedido');
        console.error(err);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'preparando':
        return 'bg-yellow-100 text-yellow-800';
      case 'a caminho':
        return 'bg-blue-100 text-blue-800';
      case 'entregue':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-yellow-600 animate-pulse">Carregando...</div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <ShoppingCart className="h-6 w-6 mr-2 text-yellow-500" />
          Pedidos
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filtroRestaurante}
            onChange={e => setFiltroRestaurante(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Todos os restaurantes</option>
            {restaurantes.map(r => (
              <option key={r._id} value={r._id}>
                {r.dscNomeFantasiaRest || r.dscRazaoSocialRest}
              </option>
            ))}
          </select>
          <Link
            to="/pedidos/novo"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <PlusCircle className="h-4 w-4" />
            Novo Pedido
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {pedidosFiltrados.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">
            {filtroRestaurante ? 'Nenhum pedido encontrado para este restaurante.' : 'Nenhum pedido cadastrado.'}
          </p>
          {!filtroRestaurante && (
            <Link
              to="/pedidos/novo"
              className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors"
            >
              Criar Primeiro Pedido
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pedidosFiltrados.map((pedido) => (
            <div
              key={pedido._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Pedido #{pedido._id?.slice(-6)}</h3>
                  {pedido.dscStatusPed && (
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(pedido.dscStatusPed)}`}>
                      {pedido.dscStatusPed}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/pedidos/${pedido._id}/editar`}
                    className="text-yellow-600 hover:text-yellow-700 p-1"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(pedido._id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                {pedido.idRestaurantePed && (
                  <p className="font-medium text-gray-800">
                    {restauranteMap[pedido.idRestaurantePed] || 'Restaurante desconhecido'}
                  </p>
                )}
                {pedido.idClientePed && (
                  <p className="text-gray-500">
                    Cliente: {clienteMap[pedido.idClientePed] || pedido.idClientePed}
                  </p>
                )}
                {pedido.datPed && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{pedido.datPed}</span>
                  </div>
                )}
                {pedido.valTotalPed !== undefined && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-yellow-600">
                      R$ {pedido.valTotalPed.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PedidoList;
