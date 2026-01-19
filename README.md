# ☕ CoffeeCart Automation (Legado)

> Automação E2E focada na validação via Interface de Preview (Mini-Cart).

## 📋 Descrição do Projeto

Este projeto automatiza o fluxo de compra no e-commerce [CoffeeCart](https://coffee-cart.app/), com uma estratégia de validação otimizada.

Diferente do fluxo tradicional que navega para a página dedicada do carrinho, este script realiza as **conferências de valores e itens diretamente no Preview do Menu (Mini-Cart)**. Essa abordagem reduz o tempo de execução e foca na agilidade do teste.

## ⚙️ O que esta automação faz?

O robô executa o seguinte fluxo lógico:

1.  **Seleção de Produtos:** Acessa o menu e adiciona 3 cafés ao carrinho.
2.  **Promoção:** Identifica e aceita a promoção condicional (Mochas/Descontos).
3.  **Validação em Preview:** Abre o resumo do pedido (Mini-Cart) ainda na tela do menu e valida se os itens e totais estão corretos.
4.  **Checkout:** Prossegue para a etapa de pagamento.
5.  **Pagamento:** Preenche o formulário com massa de dados controlada via arquivo de configuração.
6.  **Finalização:** Confirma a compra e valida a mensagem de sucesso.

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** JavaScript (Node.js)
* **Framework:** Cypress
* **BDD Engine:** `cypress-cucumber-preprocessor` (v4.3.1 - Versão Legacy)
* **Estratégia de Seleção:** CSS Selectors e XPath
* **Dados:** Massa de dados externa via `cypress.env.json`.

## 🚀 Como Executar

### Pré-Requisitos
É necessário ter o **Node.js** instalado (versão 16 ou superior).

### 🔐 Configuração de Ambiente (Massa de Dados)

Este projeto utiliza um arquivo JSON externo para gerenciar a massa de dados (nome e email), evitando hardcoding no script.

1.  Na raiz do projeto, crie um arquivo chamado `cypress.env.json`.
2.  Copie o conteúdo abaixo e cole no arquivo (você pode alterar os valores se desejar):

```json
{
    "nome": "Usuario Exemplo",
    "email": "teste123@example.com"
}
```
### Instalação

1.  Baixe o projeto (via Git Clone ou extraindo o .zip).
2.  Abra a pasta do projeto no **VS Code**.
3.  No terminal do VS Code, instale as dependências:
    ```bash
    npm install
    ```

## Executando o Teste
Tem algumas maneiras de rodar o teste.
### Navegador (Recomendado)
1.  Abra o terminal e digite:
    ```bash
    npx cypress open
    ```
2.  Selecione a opção **"E2E Testing"**.
3.  Escolha o navegador de sua preferência (Chrome,Electron,Edge...).
4.  Na lista de testes (Specs), clique em **`CoffeeCart.feature`**.
---
### Terminal 
1. Abra o terminal e digite:
    ```bash
    npx cypress run
    ```
## 📂 Organização e Padrões

**Idioma e Nomenclatura:**
O projeto foi desenvolvido priorizando o **Português (PT-BR)** na escrita dos cenários (Gherkin) e na nomenclatura de arquivos/variáveis, visando clareza. Termos em inglês foram mantidos apenas onde exigido pela sintaxe da linguagem ou ferramentas.

**Estrutura:**
O código segue o padrão **Page Object Model (POM)** para separar a lógica de interação da lógica de negócio.

---
Desenvolvido como parte do desafio técnico de QA.
