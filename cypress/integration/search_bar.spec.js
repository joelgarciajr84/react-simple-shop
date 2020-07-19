/* eslint-disable no-undef */
describe('Loading page', () => {
    it('Should load the page!', () => {
        cy.visit('')
    })


    it('Search for a product', () => {
        cy.get('.form-control').type("vestido curto");

    })

    it('Check filtered product', () => {
        cy.get('.container > .row > div > a > div > img').should('be.visible');
        cy.get('.container > .row > div > a > div > div > .card-title').should('contain', 'VESTIDO CURTO FESTIVAL');

    })

    it('Clear search bar', () => {
        cy.get('.form-control').clear()

    })

    it('All products must be present', () => {
        cy.get('.container > .row > div > a > div > img').should('be.visible');
        cy.get('.container > .row > div > a > div > div > .card-title').should('be.visible');
        cy.get('.container > .row > div > a > div > div > .card-text').should('be.visible');
        cy.get('.container > .row > div > a > div > div > button').should('be.visible');

    })
   

   
})