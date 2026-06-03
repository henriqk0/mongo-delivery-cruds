import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pedidosAPI, clientesAPI, restaurantesAPI, entregadoresAPI } from '../services/api';
import { ArrowLeft, Save } from 'lucide-react';

const PedidoForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState({
    idClientePed: '',
    idRestaurantePed: '',
    idEntregadorPed: '',
    datPed: '',
    horPed: '',
    valTaxaentregaPed: 0,
    valTotalPed: 0,
    dscFormapagammentoPed: '',
    dscStatusPed: 'preparando',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientes, setClientes] = useState<any[]>([]);
  const [restaurantes, setRestaurantes] = useState<any[]>([]);
  const [entregadores, setEntregadores] = useState<any[]>([]);
  const isEdit = !!id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, restaurantesRes, entregadoresRes] = await Promise.all([
          clientesAPI.listar(),
          restaurantesAPI.listar(),
          entregadoresAPI.listar()
        ]);
        setClientes(clientesRes.data);
        setRestaurantes(restaurantesRes.data);
        setEntregadores(entregadoresRes.data);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isEdit) {
      const loadPedido = async () => {
        try {
          setLoading(true);
          const response = await pedidosAPI.buscar(id);
          setPedido(response.data);
        } catch (err) {
          setError('Erro ao carregar pedido');
          console.error(err);
          navigate('/pedidos');
        } finally {
          setLoading(false);
        }
      };
      loadPedido();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setPedido(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setPedido(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        await pedidosAPI.atualizar(id, pedido);
      } else {
        await pedidosAPI.criar(pedido);
      }
      navigate('/pedidos');
    } catch (err) {
      setError(isEdit ? 'Erro ao atualizar pedido' : 'Erro ao criar pedido');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/pedidos')}
        className="flex items-center text-gray-600 hover:text-yellow-600 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Editar Pedido' : 'Novo Pedido'}
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
            Cliente
          </label>
          <select
            name="idClientePed"
            value={pedido.idClientePed}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente: any) => (
              <option key={cliente.idClnt} value={cliente.idClnt}>
                {cliente.nomClnt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Restaurante
          </label>
          <select
            name="idRestaurantePed"
            value={pedido.idRestaurantePed}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Selecione um restaurante</option>
            {restaurantes.map((restaurante: any) => (
              <option key={restaurante.idRest} value={restaurante.idRest}>
                {restaurante.dscNomeFantasiaRest || restaurante.dscRazaoSocialRest}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entregador
          </label>
          <select
            name="idEntregadorPed"
            value={pedido.idEntregadorPed}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Nenhum (opcional)</option>
            {entregadores.map((entregador: any) => (
              <option key={entregador.idEntrg} value={entregador.idEntrg}>
                {entregador.nomEntrg}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data do Pedido
            </label>
            <input
              type="date"
              name="datPed"
              value={pedido.datPed}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora do Pedido
            </label>
            <input
              type="time"
              name="horPed"
              value={pedido.horPed}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taxa de Entrega (R$)
            </label>
            <input
              type="number"
              name="valTaxaentregaPed"
              value={pedido.valTaxaentregaPed}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Total (R$)
            </label>
            <input
              type="number"
              name="valTotalPed"
              value={pedido.valTotalPed}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Forma de Pagamento
          </label>
          <select
            name="dscFormapagammentoPed"
            value={pedido.dscFormapagammentoPed}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Selecione a forma de pagamento</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao_credito">Cartão de Crédito</option>
            <option value="cartao_debito">Cartão de Débito</option>
            <option value="pix">PIX</option>
            <option value="vale_refeição">Vale Refeição</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status do Pedido
          </label>
          <select
            name="dscStatusPed"
            value={pedido.dscStatusPed}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="preparando">Preparando</option>
            <option value="a caminho">A Caminho</option>
            <option value="entregue">Entregue</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/pedidos')}
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

export default PedidoForm;