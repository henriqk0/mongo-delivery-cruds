import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pedidosAPI, clientesAPI, restaurantesAPI, entregadoresAPI, itensCardapioAPI, itensPedidoAPI } from '../services/api';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';

interface ItemSelecionado {
  idItemItemp: string;
  dscNomeItemc: string;
  qtdItemItemp: number;
  valPrecoUnitarioItemp: number;
}

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
    dscFormapagammentoPed: '',
    dscStatusPed: 'preparando',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientes, setClientes] = useState<any[]>([]);
  const [restaurantes, setRestaurantes] = useState<any[]>([]);
  const [entregadores, setEntregadores] = useState<any[]>([]);
  const [itensCardapio, setItensCardapio] = useState<any[]>([]);
  const [itensSelecionados, setItensSelecionados] = useState<ItemSelecionado[]>([]);
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
          const data = response.data;
          setPedido(data);
          if (data.idRestaurantePed) {
            carregarItensCardapio(data.idRestaurantePed);
          }
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

  const carregarItensCardapio = useCallback(async (restauranteId: string) => {
    try {
      const response = await itensCardapioAPI.listar();
      const filtrados = response.data.filter(
        (item: any) => item.idRestauranteItemc === restauranteId
      );
      setItensCardapio(filtrados);
    } catch (err) {
      console.error('Erro ao carregar itens do cardápio:', err);
    }
  }, []);

  const handleRestauranteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const restauranteId = e.target.value;
    setPedido(prev => ({ ...prev, idRestaurantePed: restauranteId }));
    setItensSelecionados([]);
    if (restauranteId) {
      carregarItensCardapio(restauranteId);
    } else {
      setItensCardapio([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setPedido(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setPedido(prev => ({ ...prev, [name]: value }));
    }
  };

  const adicionarItem = (item: any) => {
    setItensSelecionados(prev => {
      const existente = prev.find(i => i.idItemItemp === item._id);
      if (existente) {
        return prev.map(i =>
          i.idItemItemp === item._id
            ? { ...i, qtdItemItemp: i.qtdItemItemp + 1 }
            : i
        );
      }
      return [...prev, {
        idItemItemp: item._id,
        dscNomeItemc: item.dscNomeItemc,
        qtdItemItemp: 1,
        valPrecoUnitarioItemp: item.valPrecoItemc,
      }];
    });
  };

  const removerItem = (idItem: string) => {
    setItensSelecionados(prev => prev.filter(i => i.idItemItemp !== idItem));
  };

  const alterarQuantidade = (idItem: string, qtd: number) => {
    if (qtd <= 0) {
      removerItem(idItem);
      return;
    }
    setItensSelecionados(prev =>
      prev.map(i =>
        i.idItemItemp === idItem ? { ...i, qtdItemItemp: qtd } : i
      )
    );
  };

  const calcularTotal = () => {
    const subTotal = itensSelecionados.reduce(
      (acc, item) => acc + item.valPrecoUnitarioItemp * item.qtdItemItemp, 0
    );
    return subTotal + pedido.valTaxaentregaPed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const valTotalPed = calcularTotal();
      if (isEdit) {
        await pedidosAPI.atualizar(id, { ...pedido, valTotalPed });
      } else {
        const pedidoRes = await pedidosAPI.criar({ ...pedido, valTotalPed });
        const pedidoId = pedidoRes.data._id;
        for (const item of itensSelecionados) {
          await itensPedidoAPI.criar({
            idPedidoItemp: pedidoId,
            idItemItemp: item.idItemItemp,
            qtdItemItemp: item.qtdItemItemp,
            valPrecoUnitarioItemp: item.valPrecoUnitarioItemp,
          });
        }
      }
      navigate('/pedidos');
    } catch (err) {
      setError(isEdit ? 'Erro ao atualizar pedido' : 'Erro ao criar pedido');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const total = calcularTotal();

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
              <option key={cliente._id} value={cliente._id}>
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
            onChange={handleRestauranteChange}
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

        {itensCardapio.length > 0 && (
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Itens do Cardápio</h3>
            <div className="space-y-2">
              {itensCardapio
                .filter(item => item.dscDisponibilidadeItemc === 'disponivel')
                .map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.dscNomeItemc}</p>
                    <p className="text-xs text-gray-500">
                      R$ {item.valPrecoItemc.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => adicionarItem(item)}
                    className="text-yellow-600 hover:text-yellow-700 p-1"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {itensSelecionados.length > 0 && (
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Itens do Pedido</h3>
            <div className="space-y-2">
              {itensSelecionados.map((item) => (
                <div
                  key={item.idItemItemp}
                  className="flex items-center justify-between p-2 bg-yellow-50 rounded"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.dscNomeItemc}</p>
                    <p className="text-xs text-gray-500">
                      R$ {item.valPrecoUnitarioItemp.toFixed(2).replace('.', ',')} cada
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.qtdItemItemp}
                      onChange={(e) => alterarQuantidade(item.idItemItemp, parseInt(e.target.value) || 1)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                    />
                    <button
                      type="button"
                      onClick={() => removerItem(item.idItemItemp)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
              <option key={entregador._id} value={entregador._id}>
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
              Valor Total (calculado)
            </label>
            <div className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-800 font-medium">
              R$ {total.toFixed(2).replace('.', ',')}
            </div>
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
