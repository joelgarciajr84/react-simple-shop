/* eslint-disable no-undef */
// import { createStore } from 'redux';
describe('Loading page', () => {
   

   


    it('Should visti the home!', () => {
        cy.visit('')
    })

    it('Catalog should be visible', () => {
        cy.get('.form-control').should('be.visible')
    })

   

    it('Should click to buy', () => {
        cy.get(':nth-child(1) > a > .card > .card-body > .btn').click();
    })

    it('Should be at the product page', () => {
        cy.url().should('include', '/produto')

    })

    it('Should check product properties', () => {
        cy.get('.title').should('be.visible');
        cy.get('.num').should('be.visible');
        cy.get('.param-feature > dd').should('be.visible');
        cy.get('.form-control').should('be.visible');
        cy.get('.col-sm-7 > .param > dd > :nth-child(1)').should('be.visible');
        cy.get('.btn').should('be.visible');
    })


    it('Should select the quantity', () => {
        cy.get('.form-control').select("2");
    })

    it('Should select the size', () => {
        cy.get(':nth-child(2) > #inlineRadio2').click();

    })

    it("should have the right initial state", function() {
        cy.window().its("store").invoke("getState")

          
      });

    it('Should click in the buy button', () => {
        
        cy.get('.btn').click();
    })

   
    

   
   
   
   
})