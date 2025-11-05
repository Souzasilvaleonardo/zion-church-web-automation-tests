describe('Perfil Pessoal Geral', () => {
      beforeEach(() => {
    cy.visit("/sign-in");
    cy.wait(1000);
  });

  it('Edição de dados pessoais', () => {
    cy.login();
    cy.get('img[alt="Usuário"]').click()

    cy.contains('Meu Perfil').click()
    cy.contains('h2', 'Dados Pessoais').should('be.visible')

    cy.get('#edit-personal-information-button').click()
    cy.contains('h2', 'Dados Pessoais').should('be.visible')

    cy.get('#fullname').clear()
    cy.get('#fullname').type('Jesus Cristo')
    cy.get('#maritalStatus').click()
          cy.window().then((win) => {
        const blocked = win.document.querySelector('span[style*="pointer-events: none"]');
        if (blocked) blocked.style.pointerEvents = 'auto';

        const option = [...win.document.querySelectorAll('[role="option"], span, div, button')]
          .find(el => el.textContent.trim() === 'Solteiro(a)');

        if (option) {
          option.click();
          option.dispatchEvent(new win.Event('change', { bubbles: true }));
        }
      });
      cy.get("body").click(0, 0, { force: true });
      cy.contains('Solteiro(a)').should('be.visible')
      cy.contains('Confirmar').click()

      cy.contains('Perfil atualizado com sucesso!').should('be.visible')
  })
  it('Edição de dado eclesiaticos', () => {
    cy.login();
    cy.get('img[alt="Usuário"]').click()

    cy.contains('Meu Perfil').click()
    cy.contains('h2', 'Dados Pessoais').should('be.visible')

    cy.get('#edit-spiritual-information-button').click()
    cy.contains('h2', 'Dados eclesiásticos').should('be.visible')

    cy.get('button[data-state="checked"]').eq(1)
      .click()
    cy.get('button[data-state="unchecked"]').should('be.visible')

    cy.get('button[data-state="unchecked"]').click()
    cy.get('button[data-state="checked"]')
      .eq(1)
      .should('be.visible')
    cy.calendarBatizimoAgua("1994", "3", "10")

    cy.get('#churchOrigin').clear()
    cy.get('#churchOrigin').type('Igreja Judaica Messia')

    cy.contains('Confirmar').click()

    cy.contains('Perfil atualizado com sucesso!').should('be.visible')
  })
  it.only('Edição de Dados de Contato', () => {
    cy.login();
    cy.get('img[alt="Usuário"]').click()

    cy.contains('Meu Perfil').click()
    cy.contains('h2', 'Dados Pessoais').should('be.visible')

    cy.get('#edit-contact-information-button').click()
    cy.contains('h2', 'Dados de contato').should('be.visible')

  })
})