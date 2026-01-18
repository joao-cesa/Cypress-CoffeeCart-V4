const botaoCheckout = '[data-test="checkout"]'

class Carrinho {
    validarProdutos() {
        cy.get('@listaEsperada').then((listaEsperada) => {
            const somaTotal = listaEsperada.reduce((acumulador, item) => {
                const valorNumerico = parseFloat(item.preco.replace('$', ''));
                return acumulador + valorNumerico;
            }, 0);

            const totalEsperado = 'Total: $' + somaTotal.toFixed(2);
            cy.log(`Total Esperado: ${totalEsperado}`);

            cy.get('[data-test="checkout"]').should('be.visible').trigger('mouseover');

            cy.get('ul.cart-preview').should('be.visible') .find('li.list-item') 
            .should('have.length', listaEsperada.length);

            listaEsperada.forEach((item) => {
                cy.get('ul.cart-preview').should('contain.text', item.nome);
            });
            cy.get('[data-test="checkout"]').invoke('text').should('contain', totalEsperado);
        });
    }
    
    deletarItem() {
        cy.get('@listaEsperada').then((listaEsperada) => {
            if (!listaEsperada || listaEsperada.length === 0) {
                cy.log('A lista de memória está vazia. Nada para deletar.');
                return;
            }
            cy.get('[data-test="checkout"]').trigger('mouseover');

            cy.get('button[aria-label^="Remove one"]').should('have.length.greaterThan', 0) .then(($botoes) => {
                const totalBotoes = $botoes.length;
                const indiceSorteado = Math.floor(Math.random() * totalBotoes);
                  
                const botaoAlvo = $botoes.eq(indiceSorteado);
                  
                if (!botaoAlvo || botaoAlvo.length === 0) {
                  throw new Error(`Erro ao selecionar botão no índice ${indiceSorteado}. Total de botões: ${totalBotoes}`);
                }
                const textoAria = botaoAlvo.attr('aria-label');

                if (!textoAria) {
                    throw new Error(`O botão sorteado (Index ${indiceSorteado}) não possui o atributo aria-label!`);
                }
                const nomeCafeRemovido = textoAria.replace('Remove one ', '').trim();

                cy.log(`Removendo: "${nomeCafeRemovido}" (Botão ${indiceSorteado + 1} de ${totalBotoes})`);

                cy.wrap(botaoAlvo).click({force: true}); 
                cy.get('[data-test="checkout"]').trigger('mouseover');
              });
        });
    }
    
    clicarChekout(){
        cy.get(botaoCheckout).should('be.visible').click()
    }

    validar_E_Deletar(){
        this.validarProdutos()
        this.deletarItem()
    }
}
export default new Carrinho