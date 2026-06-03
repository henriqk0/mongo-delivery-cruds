import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { clientesAPI } from '../services/api';
import { ArrowLeft, Save } from 'lucide-react';

const ClienteForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nomClnt: '',
    numCPFClnt: '',
    numTelefoneClnt: '',
    dscEmailClnt: '',
    dscEnderecoClnt: {
      dscTipoLogradouroClnt: '',
      nomLogradouroClnt: '',
      numLogradouroClnt: '',
      dscComplementoClnt: '',
      dscBairroClnt: '',
      numCepClnt: '',
      dscCidadeClnt: '',
      dscEstadoClnt: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      const loadCliente = async () => {
        try {
          setLoading(true);
          const response = await clientesAPI.buscar(id);
          setCliente(response.data);
        } catch (err) {
          setError('Erro ao carregar cliente');
          console.error(err);
          navigate('/clientes');
        } finally {
          setLoading(false);
        }
      };
      loadCliente();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCliente(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value,
        },
      }));
    } else {
      setCliente(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        await clientesAPI.atualizar(id, cliente);
      } else {
        await clientesAPI.criar(cliente);
      }
      navigate('/clientes');
    } catch (err) {
      setError(isEdit ? 'Erro ao atualizar cliente' : 'Erro ao criar cliente');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/clientes')}
        className="flex items-center text-gray-600 hover:text-yellow-600 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Editar Cliente' : 'Novo Cliente'}
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
            Nome completo
          </label>
          <input
            type="text"
            name="nomClnt"
            value={cliente.nomClnt}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CPF
          </label>
          <input
            type="text"
            name="numCPFClnt"
            value={cliente.numCPFClnt}
            onChange={handleChange}
            required
            maxLength={14}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <input
            type="tel"
            name="numTelefoneClnt"
            value={cliente.numTelefoneClnt}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-mail
          </label>
          <input
            type="email"
            name="dscEmailClnt"
            value={cliente.dscEmailClnt}
            onChange={handleChange}
            required
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
                name="dscEnderecoClnt.dscTipoLogradouroClnt"
                value={cliente.dscEnderecoClnt.dscTipoLogradouroClnt}
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
                name="dscEnderecoClnt.nomLogradouroClnt"
                value={cliente.dscEnderecoClnt.nomLogradouroClnt}
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
                name="dscEnderecoClnt.numLogradouroClnt"
                value={cliente.dscEnderecoClnt.numLogradouroClnt}
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
                name="dscEnderecoClnt.dscComplementoClnt"
                value={cliente.dscEnderecoClnt.dscComplementoClnt}
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
                name="dscEnderecoClnt.dscBairroClnt"
                value={cliente.dscEnderecoClnt.dscBairroClnt}
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
                name="dscEnderecoClnt.numCepClnt"
                value={cliente.dscEnderecoClnt.numCepClnt}
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
                name="dscEnderecoClnt.dscCidadeClnt"
                value={cliente.dscEnderecoClnt.dscCidadeClnt}
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
                name="dscEnderecoClnt.dscEstadoClnt"
                value={cliente.dscEnderecoClnt.dscEstadoClnt}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </fieldset>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/clientes')}
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

export default ClienteForm;