# 📦 README — Modelagem de Banco de Dados para App de Delivery

## 📌 Visão Geral

Este documento descreve as entidades e atributos necessários para modelar o banco de dados de um aplicativo de delivery, conectando **clientes**, **restaurantes**, **itens de cardápio**, **pedidos** e **entregadores**.

---

## 🧑‍💼 Entidade: cliente

Armazena as informações dos usuários que realizam pedidos.

**Atributos:**

* `idClnt` (PK) — Identificador único do cliente
* `nomClnt` — Nome completo
* `numCPFClnt` — CPF do cliente
* `numTelefoneClnt` — Número de telefone
* `dscEmailClnt` — Endereço de e-mail
* `dscEnderecoClnt` — Endereço para entrega contendo: `dscTipoLogradouroClnt`, `nomLogradouroClnt`, `numLogradouroClnt`, `dscComplementoClnt`, `dscBairroClnt`, `numCepClnt`, `dscCidadeClnt`, `dscEstadoClnt`

---

## 🍽️ Entidade: restaurante

Representa os estabelecimentos cadastrados na plataforma.

**Atributos:**

* `idRest` (PK) — Identificador único do restaurante
* `dscRazaoSocialRest` — Nome jurídico da empresa
* `numCNPJRest` — CNPJ
* `dscNomeFantasiaRest` — Nome comercial
* `numTelefoneRest` — Contato telefônico
* `dscEmailRest` — E-mail
* `dscEnderecoRest` — Endereço do restaurante contendo: `dscTipoLogradouroRest`, `nomLogradouroRest`, `numLogradouroRest`, `dscComplementoRest`, `dscBairroRest`, `numCepRest`, `dscCidadeRest`, `dscEstadoRest`

---

## 📋 Entidade: itemcardapio

Itens disponíveis para venda em cada restaurante.

**Atributos:**

* `idItemc` (PK) — Identificador único do item
* `idRestauranteItemc` (FK) — Restaurante ao qual o item pertence
* `dscNomeItemc` — Nome do item
* `dscInformacaoItemc` — Descrição do item
* `valPrecoItemc` — Preço unitário
* `dscDisponibilidadeItemc` — Status (disponível / esgotado)

---

## 🧾 Entidade: pedido

Registra os pedidos feitos pelos clientes.

**Atributos:**

* `idPed` (PK) — Identificador do pedido
* `idClientePed` (FK) — Cliente que realizou o pedido
* `idRestaurantePed` (FK) — Restaurante do pedido
* `idEntregadorPed` (FK) — Entregador responsável (após conclusão)
* `datPed` — Data do pedido
* `horPed` — Hora do pedido
* `valTaxaentregaPed` — Valor da taxa de entrega
* `valTotalPed` — Valor final
* `dscFormapagammentoPed` — Método de pagamento
* `dscStatusPed` — Status do pedido (preparando, a caminho, entregue)

---

## 🧩 Entidade: itempedido

Tabela associativa para representar os itens dentro de um pedido.

**Atributos:**

* `idItemp` (PK) — Identificador
* `idPedidoItemp` (FK) — Pedido associado
* `idItemItemp` (FK) — Item do cardápio
* `qtdItemItemp` — Quantidade do item
* `valPrecoUnitarioItemp` — Preço no momento do pedido

---

## 🚚 Entidade: entregador

Representa os parceiros responsáveis pelas entregas.

**Atributos:**

* `idEntrg` (PK) — Identificador único
* `nomEntrg` — Nome do entregador
* `numCNHEntrg` — Número da CNH
* `dscPlacaVeiculoEntrg` — Placa do veículo
* `DscTipoVeiculoEntrg` — Tipo (moto, bicicleta, carro)
* `numTelefoneEntrg` — Contato

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

