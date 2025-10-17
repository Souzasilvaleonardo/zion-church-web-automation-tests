Cypress.Commands.add('login', (country = 'br', user, password) => {
  // monta as chaves dinamicamente com base no país
  const envUser = Cypress.env(`user_name_${country}`)
  const envPassword = Cypress.env(`user_password_${country}`)

  // usa o parâmetro passado OU o valor do env
  const finalUser = user || envUser
  const finalPassword = password || envPassword

  if (!finalUser || !finalPassword) {
    throw new Error(`⚠️ Missing credentials for country: ${country}`)
  }

  cy.visit('/sign-in')
  cy.wait(1000)

  // cy.selectCountry(country)

  cy.get('input[data-testid="sign-in-username-input"]').type(finalUser)
  cy.get('#password').type(finalPassword, { log: false })

  cy.contains('Entrar').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('img[alt="Usuário"]').click()
  cy.contains('Sair').click()
})

Cypress.Commands.add('selectCountry', (country) => {
  cy.get('button[data-testid="sign-in-username-input-nationality-select"]').click()

  cy.window().then((win) => {
    const select = win.document.querySelector('select[aria-hidden="true"]')
    select.value = country
    select.dispatchEvent(new Event('change', { bubbles: true }))

  })
})