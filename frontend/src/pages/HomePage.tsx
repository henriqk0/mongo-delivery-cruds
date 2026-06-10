import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Utensils, ClipboardList, ShoppingCart, Bike } from 'lucide-react';

const HomePage: React.FC = () => {
  const entities = [
    {
      icon: Users,
      title: 'Clientes',
      description: 'Gerencie os clientes do seu sistema de delivery.',
      href: '/clientes',
    },
    {
      icon: Utensils,
      title: 'Restaurantes',
      description: 'Cadastre e gerencie os restaurantes parceiros.',
      href: '/restaurantes',
    },
    {
      icon: ClipboardList,
      title: 'Cardápio',
      description: 'Gerencie os itens do cardápio dos restaurantes.',
      href: '/itens-cardapio',
    },
    {
      icon: ShoppingCart,
      title: 'Pedidos',
      description: 'Acompanhe e gerencie os pedidos realizados.',
      href: '/pedidos',
    },
    {
      icon: Bike,
      title: 'Entregadores',
      description: 'Gerencie os entregadores disponíveis.',
      href: '/entregadores',
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-yellow-600">
        Sistema de Delivery
      </h1>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {entities.map((entity) => (
          <Link
            key={entity.href}
            to={entity.href}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="flex items-center mb-3 sm:mb-4">
              <entity.icon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mr-3" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {entity.title}
              </h2>
            </div>
            <p className="text-gray-600 mb-4 flex-grow text-sm sm:text-base">
              {entity.description}
            </p>
            <span className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors text-sm font-medium text-center">
              Ver {entity.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;