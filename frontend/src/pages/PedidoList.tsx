import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { pedidosAPI } from '../services/api';
import { Trash2, Edit2, ShoppingCart, Calendar, DollarSign, User, PlusCircle } from 'lucide-react';

const PedidoList: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const response = await pedidosAPI.listar();
        setPedidos(response.data);
      } catch (err) {
        setError('Erro ao carregar pedidos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        await pedidosAPI.deletar(id);
        setPedidos(pedidos.filter(pedido => pedido.idPed !== id));
      } catch (err) {
        setError('Erro ao excluir pedido');
        console.error(err);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'em andamento':
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
        <Link
          to="/pedidos/novo"
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center gap-2 w sm:w-auto"
        >
          <PlusCircle className="h-4 w-4" />
          Novo Pedido
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {pedidos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">Nenhum pedido cadastrado.</p>
          <Link
            to="/pedidos/novo"
            className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors"
          >
            Criar Primeiro Pedido
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pedidos.map((pedido) => (
            <div
              key={pedido.idPed}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Pedido #{pedido.idPed?.slice(-6)}</h3>
                  {pedido.indStatusPed && (
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(pedido.indStatusPed)}`}>
                      {pedido.indStatusPed}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/pedidos/${pedido.idPed}/editar`}
                    className="text-yellow-600 hover:text-yellow-700 p-1"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(pedido.idPed)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                {pedido.idClntRefPed && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>Cliente: {pedido.idClntRefPed}</span>
                  </div>
                )}
                {pedido.dthCriacaoPed && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{new Date(pedido.dthCriacaoPed).toLocaleDateString('pt-BR')}</span>
                  </div>
                )}
                {pedido.vlrTotalPed !== undefined && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-yellow-600">
                      R$ {pedido.vlrTotalPed.toFixed(2).replace('.', ',')}
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