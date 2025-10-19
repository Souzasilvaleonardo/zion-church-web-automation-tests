import { faker } from '@faker-js/faker'

describe('Tela de login', () => {
  beforeEach(() => {
    cy.visit('/sign-in')
    cy.wait(1000)
  })
  it('Login successfully', () => {
    cy.login()
    
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/home`)
  })

//   it('Login successfully country USA', () => {  
//   cy.selectCountry('us')
//   cy.get('.fi-us').should('be.visible')

//   cy.login('us')
// })
  it('Login error', () => {

    cy.login('error')

    cy.get('li[data-state = "open"]').should('be.visible')
    cy.contains('Erro ao fazer login').should('be.visible')
    cy.contains('As credenciais que você digitou são inválidas. Tente novamente.').should('be.visible')
      
  })
  it('Cadastrar novo usuário BR', () => {
  const emailFaker = faker.internet.email({ firstName: 'teste' })
  const nameFaker = faker.person.fullName({ firstName: 'teste' })
  const numberFaker = faker.phone.number('(##) 9####-####')
  cy.generateCPF().then((cpf) => {
    cy.log('CPF gerado:', cpf)

    cy.contains('Cadastrar').click()
    cy.contains('h1', 'Seja bem vindo(a), à família Zion Church!').should('be.visible')

    cy.contains('Iniciar cadastro').click()

    cy.get('#documentNumber').type(cpf)
    cy.get('#email').type(emailFaker)

    cy.contains('Próximo').click()
    cy.contains('h1', 'Conte-nos um pouco mais sobre você.').should('be.visible')

    cy.get('#fullname').type(nameFaker)
    cy.get('#phone').type(numberFaker)

    cy.contains('Masculino').click()
    cy.get('#birthdate').type('16/04/1994', { force:true })

    cy.selectMaritalStatus('MARRIED')
    cy.contains('Próximo').click()

    cy.get('#zipCode').type('03577-090');
    cy.get('#street').invoke('val').should('not.be.empty')

    cy.contains('Próximo').click()
    cy.contains('h1', 'Nos fale sobre a sua jornada cristã.').should('be.visible')   

    
  })
})
})