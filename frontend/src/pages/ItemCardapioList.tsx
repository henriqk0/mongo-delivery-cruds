import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { itensCardapioAPI } from '../services/api';
import { Trash2, Edit2, ClipboardList, DollarSign, PlusCircle } from 'lucide-react';

const ItemCardapioList: React.FC = () => {
  const [itens, setItens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItens = async () => {
      try {
        setLoading(true);
        const response = await itensCardapioAPI.listar();
        setItens(response.data);
      } catch (err) {
        setError('Erro ao carregar itens do cardápio');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItens();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item do cardápio?')) {
      try {
        await itensCardapioAPI.deletar(id);
        setItens(itens.filter(item => item.idItemc !== id));
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
        <Link
          to="/itens-cardapio/novo"
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center gap-2 w sm:w-auto"
        >
          <PlusCircle className="h-4 w-4" />
          Novo Item
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {itens.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ClipboardList className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">Nenhum item do cardápio cadastrado.</p>
          <Link
            to="/itens-cardapio/novo"
            className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors"
          >
            Adicionar Primeiro Item
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((item) => (
            <div
              key={item.idItemc}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{item.nomItemc}</h3>
                <div className="flex gap-2">
                  <Link
                    to={`/itens-cardapio/${item.idItemc}/editar`}
                    className="text-yellow-600 hover:text-yellow-700 p-1"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.idItemc)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                {item.dscItemc && (
                  <p className="text-gray-500">{item.dscItemc}</p>
                )}
                {item.vlrItemc && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-yellow-600">
                      R$ {item.vlrItemc.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}
                {item.idRestRefItemc && (
                  <div className="text-xs text-gray-400">
                    Restaurant ID: {item.idRestRefItemc}
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

export default ItemCardapioList;