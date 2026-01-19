const campoNome = '[id="name"]'
const campoEmail = '[id="email"]'
const checkboxMensagem = '[id="promotion"]'
const botaoSubmit = '[id="submit-payment"]'
const mensagemSucesso = '//*[contains(text(), "Thanks for your purchase")]'

class Pagamento {
    preencherFormulario(){
        cy.get(campoNome).should('be.visible').type(Cypress.env('nome'))
        cy.get(campoEmail).should('be.visible').type(Cypress.env('email'))

        const checkbox = Cypress._.sample([true, false]);

        if(checkbox){
            cy.get(checkboxMensagem).should('be.visible').check({ force: true })
        }else{
            cy.get(checkboxMensagem).should('be.visible').uncheck({ force: true })
        }
    }

    clicarSubmit(){
        cy.get(botaoSubmit).should('be.visible').click()
    }

    validarSucesso(){
        cy.xpath(mensagemSucesso).should('be.visible')
    }
}

export default new Pagamento