describe('Perfil Pessoal Geral', () => {
      beforeEach(() => {
    cy.visit("/sign-in");
    cy.wait(1000);
  });

  it.only('', () => {
    cy.login();
    cy.get('img[alt="Usuário"]').click()

    cy.contains('Meu Perfil').click()
    cy.contains('h2', 'Dados Pessoais').should('be.visible')

  })
})