// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './radomCommands'

Cypress.on('uncaught:exception', (err) => {
  // Ignora os erros de redirecionamento do Next.js
  if (err.message.includes('NEXT_REDIRECT')) {
    return false;
  }

  if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
    return false;
  }

  // Se for outro erro, deixa o Cypress falhar normalmente
  return true;
});