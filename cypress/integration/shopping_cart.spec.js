/* eslint-disable no-undef */
describe('Loading page', () => {
    it('Should load the page!', () => {
        cy.visit('/carrinho')
    })

    it('Should show empty cart message if shopping cart is empty', () => {
       
        const shoppingCartItensSize = localStorage.getItem('shoppingCartItens');
        if(!shoppingCartItensSize){
            cy.get('.mb-4 > h2').should('contain', 'Seu carrinho está vazio');
        }
    })

    it('Should got to home', () => {
        cy.visit('/')
    })
   
})