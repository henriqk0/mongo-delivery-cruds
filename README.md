# 📦 README — Modelagem de Banco de Dados para App de Delivery

## 📌 Visão Geral

Este documento descreve as entidades e atributos necessários para modelar o banco de dados de um aplicativo de delivery, conectando **clientes**, **restaurantes**, **itens de cardápio**, **pedidos** e **entregadores**.

---

## 🧑‍💼 Entidade: Cliente

Armazena as informações dos usuários que realizam pedidos.

**Atributos:**

* `id_cliente` (PK) — Identificador único do cliente
* `nome` — Nome completo
* `cpf` — CPF do cliente
* `telefone` — Número de telefone
* `email` — Endereço de e-mail
* `endereco_entrega` — Endereço para entrega

---

## 🍽️ Entidade: Restaurante

Representa os estabelecimentos cadastrados na plataforma.

**Atributos:**

* `id_restaurante` (PK) — Identificador único do restaurante
* `razao_social` — Nome jurídico da empresa
* `cnpj` — CNPJ
* `nome_fantasia` — Nome comercial
* `telefone` — Contato telefônico
* `email` — E-mail
* `endereco` — Endereço do restaurante

---

## 📋 Entidade: ItemCardapio

Itens disponíveis para venda em cada restaurante.

**Atributos:**

* `id_item` (PK) — Identificador único do item
* `id_restaurante` (FK) — Restaurante ao qual o item pertence
* `nome` — Nome do item
* `descricao` — Descrição do item
* `preco_unitario` — Preço unitário
* `disponibilidade` — Status (disponível / esgotado)

---

## 🧾 Entidade: Pedido

Registra os pedidos feitos pelos clientes.

**Atributos:**

* `id_pedido` (PK) — Identificador do pedido
* `id_cliente` (FK) — Cliente que realizou o pedido
* `id_restaurante` (FK) — Restaurante do pedido
* `id_entregador` (FK) — Entregador responsável (após conclusão)
* `data_hora` — Data e hora do pedido
* `valor_produtos` — Soma dos itens
* `taxa_entrega` — Valor da entrega
* `valor_total` — Valor final
* `forma_pagamento` — Método de pagamento
* `status` — Status do pedido (preparando, a caminho, entregue)

---

## 🧩 Entidade: ItemPedido

Tabela associativa para representar os itens dentro de um pedido.

**Atributos:**

* `id_item_pedido` (PK) — Identificador
* `id_pedido` (FK) — Pedido associado
* `id_item` (FK) — Item do cardápio
* `quantidade` — Quantidade do item
* `preco_unitario` — Preço no momento do pedido

---

## 🚚 Entidade: Entregador

Representa os parceiros responsáveis pelas entregas.

**Atributos:**

* `id_entregador` (PK) — Identificador único
* `nome` — Nome do entregador
* `cnh` — Número da CNH
* `placa_veiculo` — Placa do veículo
* `tipo_veiculo` — Tipo (moto, bicicleta, carro)
* `telefone` — Contato

---

## 🔗 Relacionamentos (Resumo)

* Um **cliente** pode fazer vários **pedidos** (1:N)
* Um **restaurante** possui vários **itens de cardápio** (1:N)
* Um **pedido** contém vários **itens** (N:N via ItemPedido)
* Um **pedido** pertence a um único **restaurante** (N:1)
* Um **pedido** pode ser entregue por um único **entregador** (N:1)

---

## ✅ Observações

* Cada pedido contém itens de **apenas um restaurante**.
* O entregador só é associado após a conclusão ou durante a entrega.
* A entidade **ItemPedido** resolve a relação muitos-para-muitos entre pedidos e itens.

---

## 🏁 Conclusão

Essa modelagem garante organização, escalabilidade e integridade dos dados, permitindo o funcionamento eficiente de um sistema de delivery.

