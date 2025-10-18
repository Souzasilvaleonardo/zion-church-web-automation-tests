Cypress.Commands.add('generateCPF', () => {
  function randomDigit() {
    return Math.floor(Math.random() * 9)
  }

  let cpf = ''
  for (let i = 0; i < 9; i++) {
    cpf += randomDigit().toString()
  }

  // cálculo dos dígitos verificadores
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let firstVerifier = 11 - (sum % 11)
  if (firstVerifier > 9) firstVerifier = 0
  cpf += firstVerifier

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  let secondVerifier = 11 - (sum % 11)
  if (secondVerifier > 9) secondVerifier = 0
  cpf += secondVerifier

  return cpf
})