import 'cypress-file-upload';

describe('Zion Campus', () => {
    beforeEach(() => {
        cy.visit("/sign-in");
        cy.wait(1000);
    })
    it('Criar e deletar Campus', () => {
        cy.login()

        cy.get('button[data-testid="sidebar-trigger"]').click()
        cy.get('li[data-sidebar="menu-item"]').contains('Campus').click()
        cy.contains('Novo campus').click()

        cy.get('input[type="file"]').attachFile('avatar.jpg');
        cy.contains('Salvar').click()
        cy.get('#name').type('Zion Butantã')
        cy.get('#region').click()
        cy.window().then((win) => {
            const select = win.document.querySelector('select[aria-hidden="true"]')
            select.value = '72d29695-1122-4699-a518-f8d7a087e602'
            select.dispatchEvent(new Event('change', { bubbles: true }))
        })
        cy.get("body").click(0, 0, { force: true });

        cy.contains('Criar campus').click()
        cy.contains('Campus criado!').should('be.visible')
    })
    it.only('Editar Campus', () => {
        cy.login();
        cy.get('button[data-testid="sidebar-trigger"]').click()
        cy.get('li[data-sidebar="menu-item"]').contains('Campus').click()

        cy.get('img[alt="Zion Miami logo"]').click()
        cy.contains('h1', 'Zion Miami').should('be.visible')

        cy.contains('Gerenciar').click()
        cy.contains('h2', 'Dados básicos').should('be.visible')

        cy.get('input[id="address.number"]').clear()
        cy.contains('Salvar alterações').click()
        cy.contains('Número é obrigatório').should('be.visible')   
        cy.get('input[id="address.number"]').type('1234', {force: true})
        cy.contains('Salvar alterações').click()

        cy.contains('Campus atualizado com sucesso').should('be.visible')
    })
    it('', () => {
        
    })
})