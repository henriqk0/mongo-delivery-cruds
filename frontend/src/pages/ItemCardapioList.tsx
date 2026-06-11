import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { itensCardapioAPI, restaurantesAPI } from '../services/api';
import { Trash2, Edit2, ClipboardList, DollarSign, PlusCircle } from 'lucide-react';

const ItemCardapioList: React.FC = () => {
  const [itens, setItens] = useState<any[]>([]);
  const [restaurantes, setRestaurantes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroRestaurante, setFiltroRestaurante] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [itensRes, restaurantesRes] = await Promise.all([
          itensCardapioAPI.listar(),
          restaurantesAPI.listar(),
        ]);
        setItens(itensRes.data);
        setRestaurantes(restaurantesRes.data);
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

  const itensFiltrados = useMemo(() => {
    if (!filtroRestaurante) return itens;
    return itens.filter(i => i.idRestauranteItemc === filtroRestaurante);
  }, [itens, filtroRestaurante]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item do cardápio?')) {
      try {
        await itensCardapioAPI.deletar(id);
        setItens(itens.filter(item => item._id !== id));
      } catch (err) {
        setError('Erro ao excluir item do cardápio');
        console.error(err);
      }
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
          <ClipboardList className="h-6 w-6 mr-2 text-yellow-500" />
          Cardápio
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
            to="/itens-cardapio/novo"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <PlusCircle className="h-4 w-4" />
            Novo Item
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {itensFiltrados.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ClipboardList className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">
            {filtroRestaurante ? 'Nenhum item encontrado para este restaurante.' : 'Nenhum item do cardápio cadastrado.'}
          </p>
          {!filtroRestaurante && (
            <Link
              to="/itens-cardapio/novo"
              className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors"
            >
              Adicionar Primeiro Item
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {itensFiltrados.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{item.dscNomeItemc}</h3>
                <div className="flex gap-2">
                  <Link
                    to={`/itens-cardapio/${item._id}/editar`}
                    className="text-yellow-600 hover:text-yellow-700 p-1"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                {item.idRestauranteItemc && (
                  <p className="font-medium text-gray-800">
                    {restauranteMap[item.idRestauranteItemc] || 'Restaurante desconhecido'}
                  </p>
                )}
                {item.dscInformacaoItemc && (
                  <p className="text-gray-500">{item.dscInformacaoItemc}</p>
                )}
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-yellow-600">
                    R$ {item.valPrecoItemc.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemCardapioList;
