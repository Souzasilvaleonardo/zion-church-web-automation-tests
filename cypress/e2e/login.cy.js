import { faker } from "@faker-js/faker";

describe("Tela de login", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
    cy.wait(1000);
  });
  it("Login successfully", () => {
    cy.login();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/home`);
  });

  //   it('Login successfully country USA', () => {
  //   cy.selectCountry('us')
  //   cy.get('.fi-us').should('be.visible')

  //   cy.login('us')
  // })
  it("Login error", () => {
    cy.login("error");

    cy.get('li[data-state = "open"]').should("be.visible");
    cy.contains("Erro ao fazer login").should("be.visible");
    cy.contains(
      "As credenciais que você digitou são inválidas. Tente novamente."
    ).should("be.visible");
  });
  it.only("Cadastrar novo usuário BR", () => {
    cy.registerUser()
    
    cy.contains('Conta criada, com sucesso!').should('be.visible')
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/sign-in`);
  });
  it('Esqueci minha senha', () =>{
    cy.contains('Esqueceu sua senha?').click()
    cy.contains('h1', 'Redefinir senha').should('be.visible')
    cy.get('#username').type(Cypress.env('user_data')['user_name_change'])
    cy.contains('Próximo').click();
  })
});
