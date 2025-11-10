import { faker } from '@faker-js/faker';
import 'cypress-file-upload';

describe('Perfil Pessoal Geral', () => {
      beforeEach(() => {
    cy.visit("/sign-in");
    cy.wait(1000);
  });

  it('Edição de dados pessoais', () => {
    cy.login();
    cy.get('img[alt="Usuário"]').click()

    cy.updatePersonalInformation()

    cy.contains('Perfil atualizado com sucesso!').should('be.visible') 
  })
  it('Edição de dado eclesiaticos', () => {
    cy.login();
    cy.get('img[alt="Usuário"]').click()

    cy.contains('Meu Perfil').click()
    cy.contains('h2', 'Dados Pessoais').should('be.visible')

    cy.get('#edit-spiritual-information-button').click()
    cy.contains('h2', 'Dados eclesiásticos').should('be.visible')

    cy.editEcclesiasticalData()

    cy.contains('Perfil atualizado com sucesso!').should('be.visible')
    //Incompleto precisa terminar
  })
  it('Edição de Dados de Contato', () => {
    const email = faker.internet.email({firstName: 'jesus'})
    
    cy.login();
    cy.get('img[alt="Usuário"]').click()

    cy.contains('Meu Perfil').click()
    cy.contains('h2', 'Dados Pessoais').should('be.visible')

    cy.get('#edit-contact-information-button').click()
    cy.contains('h2', 'Dados de contato').should('be.visible')

    cy.get('#email').clear()
    cy.get('#email').type(email)

    cy.contains('Confirmar').click()

    //necessário terminar

  })
it('Edição de Familiares', () => {
  cy.login();
  cy.get('img[alt="Usuário"]').click();

  cy.contains('Meu Perfil').click();
  cy.contains('h2', 'Dados Pessoais', 'Familiares').should('be.visible');

  cy.get('button[data-testid="profile-family-information-add-button"]').click();
  cy.contains('h2', 'Dados familiares').should('be.visible');

  cy.editFamilyMembers()
  
  cy.contains('Familiar removido com sucesso!').should('be.visible')
  });
  it('Edição de documentos', () => {
  cy.login();
  cy.get('img[alt="Usuário"]').click();

  cy.contains('Meu Perfil').click();
  cy.contains('h2', 'Dados Pessoais','Documentos').should('be.visible');

  cy.get('button[data-testid="profile-document-information-add-button"]').click()
  cy.contains('h2', 'Dados de documento').should('be.visible')

  cy.editDocuments()

  cy.contains('Documento removido com sucesso!').should('be.visible')
  })
})