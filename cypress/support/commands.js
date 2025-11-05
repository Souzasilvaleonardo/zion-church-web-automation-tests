import { faker } from '@faker-js/faker'

Cypress.Commands.add('login', (country = 'br', user, password) => {
  // monta as chaves dinamicamente com base no país
  const envUser = Cypress.env('user_data')[`user_name_${country}`]
  const envPassword = Cypress.env('user_data')[`user_password_${country}`]

  // usa o parâmetro passado OU o valor do env
  const finalUser = user || envUser
  const finalPassword = password || envPassword

  if (!finalUser || !finalPassword) {
    throw new Error(`⚠️ Credenciais ausentes para o país: ${country}`)
  }

  cy.get('input[data-testid="sign-in-username-input"]').type(finalUser)
  cy.get('#password').type(finalPassword, { log: false })

  cy.contains('Entrar').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('img[alt="Usuário"]').click()
  cy.contains('Sair').click()
})

Cypress.Commands.add('registerUser', () => {
        const emailFaker = faker.internet.email({ firstName: "teste" });
    const nameFaker = faker.person.fullName({ firstName: "teste" });
    const numberFaker = faker.phone.number("(##) 9####-####");
    cy.generateCPF().then((cpf) => {
      cy.log("CPF gerado:", cpf);

      cy.contains("Cadastrar").click();
      cy.contains("h1", "Seja bem vindo(a), à família Zion Church!").should(
        "be.visible"
      );

      cy.contains("Iniciar cadastro").click();

      cy.get("#documentNumber").type(cpf);
      cy.get("#email").type(emailFaker);
      cy.contains("Próximo").click();

      cy.contains("h1", "Conte-nos um pouco mais sobre você.").should("be.visible");
      cy.get("#fullname").type(nameFaker);
      cy.get("#phone").type(numberFaker);
      cy.contains("Masculino").click();
      cy.calendarBirthdate("1994", "3", "10");
      cy.get("#birthdate").invoke("val").should("not.be.empty");
      cy.selectMaritalStatus("MARRIED");
      cy.contains("Próximo").click();

      cy.get("#zipCode").type("03577-090");
      cy.get("#street").invoke("val").should("not.be.empty");
      cy.contains("Próximo").click();

      // Jornada Cristã
      cy.contains("h1", "Nos fale sobre a sua jornada cristã.").should("be.visible");
      cy.get('span[id="is-baptized-yes"]').click();
      cy.contains("label", "Seu batismo foi por aspersão ou imersão?").should("be.visible");
      cy.get('span[id="baptism-type-immersion"]').click();
      cy.get('button[role="combobox"]').should("be.visible").click({ force: true });

      cy.window().then((win) => {
        const blocked = win.document.querySelector('span[style*="pointer-events: none"]');
        if (blocked) blocked.style.pointerEvents = 'auto';

        const option = [...win.document.querySelectorAll('[role="option"], span, div, button')]
          .find(el => el.textContent.trim() === '2016');

        if (option) {
          option.click(); // dispara o clique real que o React captura
          option.dispatchEvent(new win.Event('change', { bubbles: true }));
        }
      });
      cy.get("body").click(0, 0, { force: true });
      cy.get('button[role="combobox"]').should('contain.text', '2016');

      cy.contains("label", "Você é batizado no espírito santo?").should("be.visible");
      cy.get('span[id="is-baptized-holy-spirit-yes"]').click();
      cy.get('button[role="combobox"]').eq(1).click();

      cy.window().then((win) => {
        const blocked = win.document.querySelector('span[style*="pointer-events: none"]');
        if (blocked) blocked.style.pointerEvents = 'auto';

        const option = [...win.document.querySelectorAll('[role="option"], span, div, button')]
          .find(el => el.textContent.trim() === '2017');

        if (option) {
          option.click();
          option.dispatchEvent(new win.Event('change', { bubbles: true }));
        }
      });
      cy.get("body").click(0, 0, { force: true });
      cy.get('button[role="combobox"]', { timeout: 5000 }).should('contain.text', '2017');
  

      cy.contains("label","Você considera a Igreja Zion como sua igreja local?").should("be.visible");
      cy.get('span[id="belongs-to-organization-yes"]').click();
      cy.get('button[role="combobox"]').eq(2).click();
      
      cy.window().then((win) => {
        const blocked = win.document.querySelector('span[style*="pointer-events: none"]');
        if (blocked) blocked.style.pointerEvents = 'auto';

        const option = [...win.document.querySelectorAll('[role="option"], span, div, button')]
          .find(el => el.textContent.trim() === '2019');

        if (option) {
          option.click(); 
          option.dispatchEvent(new win.Event('change', { bubbles: true }));
        }
      });
      cy.get('body').click(0, 0, { force: true });
      cy.get('button[role="combobox"]').should('contain.text', '2019');
      cy.contains('Próximo').click()

      cy.contains("h1", "O que você tem buscado recentemente?").should(
        "be.visible"
      );
      const matters = [
        "Artes e Design",
        "Avivamento",
        "Casamento",
        "Ciência e Tecnologia",
        "Criação de Filhos",
        "Culinária",
        "Dons Espirituais",
        "Feminilidade",
        "Finanças",
        "Fitness e Bem Estar",
        "Hombridade",
        "Jogos e Música",
        "Literatura",
        "Missões",
        "Moda e Estilo",
        "Relacionamento Cristão",
        "Series e Filmes",
        "Teologia",
        "Valores da Família",
        "Viagens e Aventuras",
      ];
      matters.forEach((matters) => {
        cy.contains("div", matters).should("be.visible");
      });
      cy.contains('Casamento').click()
      cy.contains('Ciência e Tecnologia').click()
      cy.contains('Valores da Família').click()
      cy.contains('Próximo').click()

      cy.contains('h1', 'Agora, capricha na foto!').should('be.visible')
      cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/avatar.jpg', { force:true })
        .should((input) => {
          expect(input[0].files[0].name).to.equal('avatar.jpg')
        })
      cy.wait(1000)
      cy.contains('Salvar').click({ force: true })
      cy.contains('Próximo').click()

      cy.contains('h1', 'Agora vamos te conectar à sua comunidade local.').should('be.visible')
      cy.contains('Zion São Paulo').click()
      cy.contains('Próximo').click()

      cy.contains('h1', 'Para finalizar, vamos criar sua senha.').should('be.visible')
      cy.get('#password').type('Teste@132')
      cy.get('#passwordRepeated').type('Teste@132')
      cy.get('#terms').click()
      cy.get('button[type="submit"]').click()
       });
})

Cypress.Commands.add('selectCountry', (country) => {
  cy.get('button[data-testid="sign-in-username-input-nationality-select"]').click()

  cy.window().then((win) => {
    const select = win.document.querySelector('select[aria-hidden="true"]')
    select.value = country
    select.dispatchEvent(new Event('change', { bubbles: true }))
  })
})

Cypress.Commands.add('selectMaritalStatus', (maritalStatus) => {
  cy.get('#maritalStatus').click()

  cy.window().then((win) => {  
    const selects = win.document.querySelectorAll('select[aria-hidden="true"]')
    const select = selects[1]
    if(!select) {
      throw new Error('⚠️ Nenhum select encontrado no índice 1')
    }
    select.value = maritalStatus
    select.dispatchEvent(new Event('change', { bubbles: true }))
  })
  cy.get('body').click(0, 0, { force: true })
})

Cypress.Commands.add('calendarBirthdate', (year, month, day) => {
    cy.get('#birthdate').click()//type('04 de out. de 1994', { force:true })
    cy.get('select[aria-label="Choose the Year"]').select(year)
    cy.get('select[aria-label="Choose the Month"]').select(month)
    cy.get(`button[data-day="4/${day}/${year}"]`).click() 
})

Cypress.Commands.add('calendarBatizimoAgua', (year, month, day) => {
    cy.get('#baptismYear').click()//type('04 de out. de 1994', { force:true })
    cy.get('select[aria-label="Choose the Year"]').select(year)
    cy.get('select[aria-label="Choose the Month"]').select(month)
    cy.get(`button[data-day="4/${day}/${year}"]`).click() 
})