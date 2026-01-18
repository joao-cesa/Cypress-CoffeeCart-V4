import { Given, When, Then, And ,After} from "cypress-cucumber-preprocessor/steps"
import CardapioPage from "../pages/Cardapio.page";
import CarrinhoPage from "../pages/Carrinho.page";
import PagamentoPage from "../pages/Pagamento.page";

Given('que o usuario acessa o portal CoffeeCart', () =>{
    cy.visit('/')
});
 
And('que adiciona três ou mais cafés diferentes ao carrinho aceitando promoceos', () =>{
    CardapioPage.EscolherCafesEAceitarPromo()
})

And('que deleta um item do carrinho', () =>{
    CarrinhoPage.validar_E_Deletar()
})

And('entao prossegue para a interface de pagamento', () =>{
    CarrinhoPage.clicarChekout()
})

When('o usuario preencher os detalhes do pagamento', () =>{
    PagamentoPage.preencherFormulario()
})

And('o usuario confirmar a compra', () =>{
    PagamentoPage.clicarSubmit()
})

Then('uma mensagem de confirmação é exibida na tela', () =>{
    PagamentoPage.validarSucesso()
})

After(() => {
    cy.screenshot('e2e-sucesso-compra', { overwrite: true })
})