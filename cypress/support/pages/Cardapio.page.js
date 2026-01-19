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

const validarModel = '//div[@class="promo"]'
const aceitarPromo = '//button[@class="yes"]'

let listaValidacao = [];

class Cardapio {
    escolherCafes() {
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
            cy.get(item).should('be.visible').realHover().realClick(); 
        });
        cy.wrap(listaValidacao).as('listaEsperada');
    }

    aceitarPromocao() {
        cy.xpath(validarModel).should('be.visible');
        cy.xpath(aceitarPromo).should('be.visible').click();
        listaValidacao.push({
            nome: '(Discounted) Mocha', 
            preco: '$4.00'
        });
        cy.wrap(listaValidacao).as('listaEsperada');
    }
    
    escolherCafesEAceitarPromo(){
        this.escolherCafes()
        this.aceitarPromocao()
    }
}

export default new Cardapio;
