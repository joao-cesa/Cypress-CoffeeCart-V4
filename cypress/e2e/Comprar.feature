#utf-8
#language: pt

Funcionalidade: Comprar Cafés
  Cenario: Comprar Cafés Sortidos
     Dado que o usuario acessa o portal CoffeeCart
        E que adiciona três ou mais cafés diferentes ao carrinho aceitando promoceos
        E que deleta um item do carrinho
        E entao prossegue para a interface de pagamento
        Quando o usuario preencher os detalhes do pagamento
        E o usuario confirmar a compra
        Então uma mensagem de confirmação é exibida na tela