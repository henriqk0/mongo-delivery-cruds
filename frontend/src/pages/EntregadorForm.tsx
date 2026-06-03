import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { entregadoresAPI } from '../services/api';
import { ArrowLeft, Save } from 'lucide-react';

const EntregadorForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entregador, setEntregador] = useState({
    nomEntrg: '',
    numCNHEntrg: '',
    dscPlacaVeiculoEntrg: '',
    dscTipoVeiculoEntrg: '',
    numTelefoneEntrg: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      const loadEntregador = async () => {
        try {
          setLoading(true);
          const response = await entregadoresAPI.buscar(id);
          setEntregador(response.data);
        } catch (err) {
          setError('Erro ao carregar entregador');
          console.error(err);
          navigate('/entregadores');
        } finally {
          setLoading(false);
        }
      };
      loadEntregador();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEntregador(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        await entregadoresAPI.atualizar(id, entregador);
      } else {
        await entregadoresAPI.criar(entregador);
      }
      navigate('/entregadores');
    } catch (err) {
      setError(isEdit ? 'Erro ao atualizar entregador' : 'Erro ao criar entregador');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/entregadores')}
        className="flex items-center text-gray-600 hover:text-yellow-600 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Editar Entregador' : 'Novo Entregador'}
        </h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome
          </label>
          <input
            type="text"
            name="nomEntrg"
            value={entregador.nomEntrg}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CNH
          </label>
          <input
            type="text"
            name="numCNHEntrg"
            value={entregador.numCNHEntrg}
            onChange={handleChange}
            required
            maxLength={11}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Placa do Veículo
          </label>
          <input
            type="text"
            name="dscPlacaVeiculoEntrg"
            value={entregador.dscPlacaVeiculoEntrg}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Veículo
          </label>
          <select
            name="dscTipoVeiculoEntrg"
            value={entregador.dscTipoVeiculoEntrg}
            onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Selecione o tipo de veículo</option>
            <option value="moto">Moto</option>
            <option value="bicicleta">Bicicleta</option>
            <option value="carro">Carro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <input
            type="tel"
            name="numTelefoneEntrg"
            value={entregador.numTelefoneEntrg}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/entregadores')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:bg-yellow-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Salvando...' : isEdit ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntregadorForm;