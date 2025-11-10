describe('logout', () => {
  beforeEach(() => {
    cy.visit('/sign-in')
    cy.wait(1000)
  })
  it('successfully', () => {
    cy.login() // session reutiliza login

    cy.logout()
    cy.url().should('include', '/sign-in')
    cy.contains('Entrar').should('be.visible')
  })
})