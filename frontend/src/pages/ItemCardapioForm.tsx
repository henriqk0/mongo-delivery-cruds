import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { itensCardapioAPI, restaurantesAPI } from '../services/api';
import { ArrowLeft, Save } from 'lucide-react';

const ItemCardapioForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    idRestauranteItemc: '',
    dscNomeItemc: '',
    dscInformacaoItemc: '',
    valPrecoItemc: 0,
    dscDisponibilidadeItemc: 'disponivel',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restaurantes, setRestaurantes] = useState<any[]>([]);
  const isEdit = !!id;

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const response = await restaurantesAPI.listar();
        setRestaurantes(response.data);
      } catch (err) {
        console.error('Erro ao carregar restaurantes:', err);
      }
    };
    fetchRestaurantes();
  }, []);

  useEffect(() => {
    if (isEdit) {
      const loadItem = async () => {
        try {
          setLoading(true);
          const response = await itensCardapioAPI.buscar(id);
          setItem(response.data);
        } catch (err) {
          setError('Erro ao carregar item do cardápio');
          console.error(err);
          navigate('/itens-cardapio');
        } finally {
          setLoading(false);
        }
      };
      loadItem();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setItem(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setItem(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        await itensCardapioAPI.atualizar(id, item);
      } else {
        await itensCardapioAPI.criar(item);
      }
      navigate('/itens-cardapio');
    } catch (err) {
      setError(isEdit ? 'Erro ao atualizar item do cardápio' : 'Erro ao criar item do cardápio');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/itens-cardapio')}
        className="flex items-center text-gray-600 hover:text-yellow-600 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Editar Item do Cardápio' : 'Novo Item do Cardápio'}
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
            Restaurante
          </label>
          <select
            name="idRestauranteItemc"
            value={item.idRestauranteItemc}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Selecione um restaurante</option>
            {restaurantes.map((restaurante: any) => (
              <option key={restaurante._id} value={restaurante._id}>
                {restaurante.dscNomeFantasiaRest || restaurante.dscRazaoSocialRest}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Item
          </label>
          <input
            type="text"
            name="dscNomeItemc"
            value={item.dscNomeItemc}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            name="dscInformacaoItemc"
            value={item.dscInformacaoItemc}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço (R$)
          </label>
          <input
            type="number"
            name="valPrecoItemc"
            value={item.valPrecoItemc}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disponibilidade
          </label>
          <select
            name="dscDisponibilidadeItemc"
            value={item.dscDisponibilidadeItemc}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="disponivel">Disponível</option>
            <option value="esgotado">Esgotado</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/itens-cardapio')}
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

export default ItemCardapioForm;