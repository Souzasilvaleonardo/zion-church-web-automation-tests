Cypress.Commands.add("updatePersonalInformation", () => {
  cy.contains("Meu Perfil").click();
  cy.contains("h2", "Dados Pessoais").should("be.visible");

  cy.get("#edit-personal-information-button").click();
  cy.contains("h2", "Dados Pessoais").should("be.visible");

  cy.get("#fullname").clear();
  cy.get("#fullname").type("Jesus Cristo");
  cy.get("#maritalStatus").click();
  cy.window().then((win) => {
    const blocked = win.document.querySelector(
      'span[style*="pointer-events: none"]'
    );
    if (blocked) blocked.style.pointerEvents = "auto";

    const option = [
      ...win.document.querySelectorAll('[role="option"], span, div, button'),
    ].find((el) => el.textContent.trim() === "Solteiro(a)");

    if (option) {
      option.click();
      option.dispatchEvent(new win.Event("change", { bubbles: true }));
    }
  });
  cy.get("body").click(0, 0, { force: true });
  cy.contains("Solteiro(a)").should("be.visible");
  cy.contains("Confirmar").click();
});

Cypress.Commands.add("editFamilyMembers", () => {
  // digita o nome
  cy.get("#selectedUser").type("caio");
  cy.get('div[class="font-medium"]').contains("Caio Almeida Silva").click();

  cy.get("#familiarityType").click();
  cy.get('div[role="listbox"]').contains("Marido").click();

  cy.contains("Confirmar").click();

  cy.contains("Familiar adicionado com sucesso!").should("be.visible");

  cy.get(
    'button[data-testid="profile-family-information-remove-be17f6ee-abcb-4fd1-9eba-66c4833bafe8"]'
  ).click();
});

Cypress.Commands.add("editDocuments", () => {
  cy.get("#documentType").click();
  cy.window().then((win) => {
    const select = win.document.querySelector('select[aria-hidden="true"]');
    select.value = "PHOTO";
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
  cy.get("body").click(0, 0, { force: true });

  cy.get('input[type="file"]').attachFile("teste.pdf");
  cy.contains("Salvar").click();

  cy.contains("Documento enviado com sucesso!").should("be.visible");

  cy.contains("span", "teste.pdf")
    .parent() // pega o pai imediato (um único elemento)
    .find("button") // encontra o botão dentro desse pai
    .click({ force: true });

  cy.get('div[role="menu"]').contains("Remover").click();
});

Cypress.Commands.add("editEcclesiasticalData", () => {
  cy.get('button[data-state="checked"]').eq(1).click();
  cy.get('button[data-state="unchecked"]').should("be.visible");

  cy.get('button[data-state="unchecked"]').click();
  cy.get('button[data-state="checked"]').eq(1).should("be.visible");
  cy.calendarBatizimoAgua("1994", "3", "10");

  cy.get("#churchOrigin").clear();
  cy.get("#churchOrigin").type("Igreja Judaica Messia");

  cy.contains("Confirmar").click();
});
