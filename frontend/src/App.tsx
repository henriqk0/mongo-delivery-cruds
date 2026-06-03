import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import ClienteList from './pages/ClienteList';
import ClienteForm from './pages/ClienteForm';
import RestauranteList from './pages/RestauranteList';
import RestauranteForm from './pages/RestauranteForm';
import ItemCardapioList from './pages/ItemCardapioList';
import ItemCardapioForm from './pages/ItemCardapioForm';
import PedidoList from './pages/PedidoList';
import PedidoForm from './pages/PedidoForm';
import EntregadorList from './pages/EntregadorList';
import EntregadorForm from './pages/EntregadorForm';
import HomePage from './pages/HomePage';
import { Menu, X, Truck } from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/clientes', label: 'Clientes' },
    { path: '/restaurantes', label: 'Restaurantes' },
    { path: '/itens-cardapio', label: 'Cardápio' },
    { path: '/pedidos', label: 'Pedidos' },
    { path: '/entregadores', label: 'Entregadores' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-yellow-500 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <Truck className="h-8 w-8 text-white mr-2" />
                  <span className="text-xl font-bold text-white">Delivery</span>
                </Link>
              </div>

              {/* Desktop menu */}
              <div className="hidden md:flex md:items-center md:space-x-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-white/90 hover:text-white hover:bg-yellow-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="flex md:hidden items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white p-2 rounded-md hover:bg-yellow-600 transition-colors"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-yellow-600">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white/90 hover:text-white hover:bg-yellow-500 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clientes" element={<ClienteList />} />
            <Route path="/clientes/novo" element={<ClienteForm />} />
            <Route path="/clientes/:id/editar" element={<ClienteForm />} />
            <Route path="/restaurantes" element={<RestauranteList />} />
            <Route path="/restaurantes/novo" element={<RestauranteForm />} />
            <Route path="/restaurantes/:id/editar" element={<RestauranteForm />} />
            <Route path="/itens-cardapio" element={<ItemCardapioList />} />
            <Route path="/itens-cardapio/novo" element={<ItemCardapioForm />} />
            <Route path="/itens-cardapio/:id/editar" element={<ItemCardapioForm />} />
            <Route path="/pedidos" element={<PedidoList />} />
            <Route path="/pedidos/novo" element={<PedidoForm />} />
            <Route path="/pedidos/:id/editar" element={<PedidoForm />} />
            <Route path="/entregadores" element={<EntregadorList />} />
            <Route path="/entregadores/novo" element={<EntregadorForm />} />
            <Route path="/entregadores/:id/editar" element={<EntregadorForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;