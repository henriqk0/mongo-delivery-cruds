import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurantesAPI } from '../services/api';
import { ArrowLeft, Save } from 'lucide-react';

const RestauranteForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState({
    dscRazaoSocialRest: '',
    numCNPJRest: '',
    dscNomeFantasiaRest: '',
    numTelefoneRest: '',
    dscEmailRest: '',
    dscEnderecoRest: {
      dscTipoLogradouroRest: '',
      nomLogradouroRest: '',
      numLogradouroRest: '',
      dscComplementoRest: '',
      dscBairroRest: '',
      numCepRest: '',
      dscCidadeRest: '',
      dscEstadoRest: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      const loadRestaurante = async () => {
        try {
          setLoading(true);
          const response = await restaurantesAPI.buscar(id);
          setRestaurante(response.data);
        } catch (err) {
          setError('Erro ao carregar restaurante');
          console.error(err);
          navigate('/restaurantes');
        } finally {
          setLoading(false);
        }
      };
      loadRestaurante();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setRestaurante(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value,
        },
      }));
    } else {
      setRestaurante(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        await restaurantesAPI.atualizar(id, restaurante);
      } else {
        await restaurantesAPI.criar(restaurante);
      }
      navigate('/restaurantes');
    } catch (err) {
      setError(isEdit ? 'Erro ao atualizar restaurante' : 'Erro ao criar restaurante');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/restaurantes')}
        className="flex items-center text-gray-600 hover:text-yellow-600 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Editar Restaurante' : 'Novo Restaurante'}
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
            Razão Social
          </label>
          <input
            type="text"
            name="dscRazaoSocialRest"
            value={restaurante.dscRazaoSocialRest}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CNPJ
          </label>
          <input
            type="text"
            name="numCNPJRest"
            value={restaurante.numCNPJRest}
            onChange={handleChange}
            required
            maxLength={18}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome Fantasia
          </label>
          <input
            type="text"
            name="dscNomeFantasiaRest"
            value={restaurante.dscNomeFantasiaRest}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <input
            type="tel"
            name="numTelefoneRest"
            value={restaurante.numTelefoneRest}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-mail
          </label>
          <input
            type="email"
            name="dscEmailRest"
            value={restaurante.dscEmailRest}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <fieldset className="border border-gray-200 rounded-md p-4">
          <legend className="px-2 text-sm font-medium text-gray-700">Endereço</legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de logradouro
              </label>
              <input
                type="text"
                name="dscEnderecoRest.dscTipoLogradouroRest"
                value={restaurante.dscEnderecoRest.dscTipoLogradouroRest}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logradouro
              </label>
              <input
                type="text"
                name="dscEnderecoRest.nomLogradouroRest"
                value={restaurante.dscEnderecoRest.nomLogradouroRest}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número
              </label>
              <input
                type="text"
                name="dscEnderecoRest.numLogradouroRest"
                value={restaurante.dscEnderecoRest.numLogradouroRest}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complemento
              </label>
              <input
                type="text"
                name="dscEnderecoRest.dscComplementoRest"
                value={restaurante.dscEnderecoRest.dscComplementoRest}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bairro
              </label>
              <input
                type="text"
                name="dscEnderecoRest.dscBairroRest"
                value={restaurante.dscEnderecoRest.dscBairroRest}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CEP
              </label>
              <input
                type="text"
                name="dscEnderecoRest.numCepRest"
                value={restaurante.dscEnderecoRest.numCepRest}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                name="dscEnderecoRest.dscCidadeRest"
                value={restaurante.dscEnderecoRest.dscCidadeRest}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <input
                type="text"
                name="dscEnderecoRest.dscEstadoRest"
                value={restaurante.dscEnderecoRest.dscEstadoRest}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </fieldset>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/restaurantes')}
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

export default RestauranteForm;