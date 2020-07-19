/* eslint-disable no-undef */
describe('Loading page', () => {
    it('Should load the page!', () => {
        cy.visit('')
    })

    it('Logo should be visible', () => {
        cy.get('.col-md-12 > img').should('be.visible')

    })

    it('Menu should be visible', () => {
        cy.get('.navbar-nav').should('be.visible')

    })

    it('Search should be visible', () => {
        cy.get('.form-control').should('be.visible')
    })

    it('Catalog should be visible', () => {
        cy.get('.form-control').should('be.visible')
    })



    it('Check catalog properties', () => {
        cy.get('.container > .row > div > a > div > img').should('be.visible');
        cy.get('.container > .row > div > a > div > div > .card-title').should('be.visible');
        cy.get('.container > .row > div > a > div > div > .card-text').should('be.visible');
        cy.get('.container > .row > div > a > div > div > button').should('be.visible');

    })
})