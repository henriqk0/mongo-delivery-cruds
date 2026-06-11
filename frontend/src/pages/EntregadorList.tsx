import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { entregadoresAPI } from '../services/api';
import { Trash2, Edit2, Bike, Phone, PlusCircle } from 'lucide-react';

const EntregadorList: React.FC = () => {
  const [entregadores, setEntregadores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntregadores = async () => {
      try {
        setLoading(true);
        const response = await entregadoresAPI.listar();
        setEntregadores(response.data);
      } catch (err) {
        setError('Erro ao carregar entregadores');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntregadores();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este entregador?')) {
      try {
        await entregadoresAPI.deletar(id);
        setEntregadores(entregadores.filter(entregador => entregador._id !== id));
      } catch (err) {
        setError('Erro ao excluir entregador');
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
          <Bike className="h-6 w-6 mr-2 text-yellow-500" />
          Entregadores
        </h1>
        <Link
          to="/entregadores/novo"
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center gap-2 w sm:w-auto"
        >
          <PlusCircle className="h-4 w-4" />
          Novo Entregador
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {entregadores.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Bike className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">Nenhum entregador cadastrado.</p>
          <Link
            to="/entregadores/novo"
            className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors"
          >
            Adicionar Primeiro Entregador
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entregadores.map((entregador) => (
            <div
              key={entregador._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{entregador.nomEntrg}</h3>
                <div className="flex gap-2">
                  <Link
                    to={`/entregadores/${entregador._id}/editar`}
                    className="text-yellow-600 hover:text-yellow-700 p-1"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(entregador._id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">CNH:</span>
                  <span>{entregador.numCNHEntrg}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Veículo:</span>
                  <span>{entregador.dscTipoVeiculoEntrg} ({entregador.dscPlacaVeiculoEntrg})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{entregador.numTelefoneEntrg}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntregadorList;
