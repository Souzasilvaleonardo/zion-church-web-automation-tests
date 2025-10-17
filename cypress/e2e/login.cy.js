describe('login', () => {
  beforeEach(() => {
    cy.visit('/sign-in')
  })
  it.only('login successfully', () => {
    cy.login()
    
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/home`)
  })

  it.only('Login successfully country USA', () => {
  cy.wait(1000)

  cy.selectCountry('us')
  cy.get('.fi-us').should('be.visible')
})
  it.only('login error', () => {

    cy.login('error')

    cy.get('li[data-state = "open"]').should('be.visible')
    cy.contains('Erro ao fazer login').should('be.visible')
    cy.contains('As credenciais que você digitou são inválidas. Tente novamente.').should('be.visible')
      
  })
})