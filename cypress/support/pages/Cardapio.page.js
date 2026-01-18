const espresso = '[data-test="Espresso"]' 
const espressoMacchiato = '[data-test="Espresso_Macchiato"]'
const cappuccino = '[data-test="Cappuccino"]'
const mocha = '[data-test="Mocha"]'
const flatWhite = '[data-test="Flat_White"]'
const americano = '[data-test="Americano"]'
const cafeLatte = '[data-test="Cafe_Latte"]'
const espressoConPanna = '[data-test="Espresso_Con Panna"]'
const cafeBreve = '[data-test="Cafe_Breve"]'

const listaDeCafes = [
    espresso, 
    espressoMacchiato, 
    cappuccino, 
    mocha, 
    flatWhite, 
    americano, 
    cafeLatte, 
    espressoConPanna, 
    cafeBreve
];

const cafesEscolhidos = Cypress._.sampleSize(listaDeCafes, 3);

const validarModel = '[class="promo"]'
const aceitarPromo = '[class="yes"]'

let listaValidacao = [];

class Cardapio {
    EscolherCafes() {
        listaValidacao = []; 

        cafesEscolhidos.forEach((item) => {
            cy.get(item).should('be.visible').closest('li').within(() => {
                cy.get('small').invoke('text').then((precoSmall) => {
                    cy.get('h4').invoke('text').then((h4) => { 
                        const precoLimpo = precoSmall.trim();
                        const nomeLimpo = h4.replace(precoLimpo, '').trim();

                        cy.log(` Capturei: ${nomeLimpo} | ${precoLimpo}`);

                        listaValidacao.push({
                            nome: nomeLimpo,
                            preco: precoLimpo
                        });
                    });
                });
            });
            cy.get(item).should('be.visible').realHover().realClick().wait(300); 
        });
        cy.wrap(listaValidacao).as('listaEsperada');
    }

    AceitarPromocao() {
        cy.get(validarModel).should('be.visible');
        cy.get(aceitarPromo).should('be.visible').click();
        listaValidacao.push({
            nome: '(Discounted) Mocha', 
            preco: '$4.00'
        });
        cy.wrap(listaValidacao).as('listaEsperada');
    }
    
    EscolherCafesEAceitarPromo(){
        this.EscolherCafes()
        this.AceitarPromocao()
    }
}

export default new Cardapio;
