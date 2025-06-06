describe('Página de Cadastro', () => {
  beforeEach(() => { //before each test, the Inicial page is visited
    cy.visit('/addUser');
  });

  it('deve exibir os elementos do menu', () => {
    // verify if there is everything that should be on the page

    cy.get('input[placeholder="Nome completo"]').should('exist');
    cy.get('input[placeholder="Nome completo"]').should('have.value', '');

    cy.get('input[placeholder="CPF"]').should('exist');
    cy.get('input[placeholder="CPF"]').should('have.value', '');

    cy.get('input[placeholder="E-mail"]').should('exist');
    cy.get('input[placeholder="E-mail"]').should('have.value', '');

    cy.get('input[placeholder="Confirmar e-mail"]').should('exist');
    cy.get('input[placeholder="Confirmar e-mail"]').should('have.value', '');

    cy.get('input[placeholder="Senha"]').should('exist');
    cy.get('input[placeholder="Senha"]').should('have.value', '');

    cy.get('input[placeholder="Confirmar senha"]').should('exist');
    cy.get('input[placeholder="Confirmar senha"]').should('have.value', '');

    cy.get('[data-testid="logo-icon"]').should('exist');
  });

  it('deve permitir digitar nos campos de entrada', () => {
    
    //name
    cy.get('[data-testid="input-name"]', { timeout: 10000 }).should('exist');
    cy.wait(100);
    cy.get('[data-testid="input-name"]').should('not.be.disabled');
    cy.get('[data-testid="input-name"]').click().type('João Marcelo');
    cy.get('[data-testid="input-name"]').should('have.value', 'João Marcelo');
    
    //CPF
    cy.get('[data-testid="input-CPF"]', { timeout: 10000 }).should('exist');
    cy.wait(100);
    cy.get('[data-testid="input-CPF"]').should('not.be.disabled');
    cy.get('[data-testid="input-CPF"]').click().type('12345678901');
    cy.get('[data-testid="input-CPF"]').should('have.value', '12345678901');

    //email
    cy.get('[data-testid="input-email"]', { timeout: 10000 }).should('exist');
    cy.wait(100);
    cy.get('[data-testid="input-email"]').should('not.be.disabled');
    cy.get('[data-testid="input-email"]').click().type('email@gmail.com');
    cy.get('[data-testid="input-email"]').should('have.value', 'email@gmail.com');

    //check-email
    cy.get('[data-testid="input-check-email"]', { timeout: 10000 }).should('exist');
    cy.wait(100);
    cy.get('[data-testid="input-check-email"]').should('not.be.disabled');
    cy.get('[data-testid="input-check-email"]').click().type('email@gmail.com');
    cy.get('[data-testid="input-check-email"]').should('have.value', 'email@gmail.com');

    //password
    cy.get('[data-testid="input-password"]', { timeout: 10000 }).should('exist');
    cy.wait(100);
    cy.get('[data-testid="input-password"]').should('not.be.disabled');
    cy.get('[data-testid="input-password"]').click().type('senhaSecreta');
    cy.get('[data-testid="input-password"]').should('have.value', 'senhaSecreta');

    //check-password
    cy.get('[data-testid="input-check-password"]', { timeout: 10000 }).should('exist');
    cy.wait(100);
    cy.get('[data-testid="input-check-password"]').should('not.be.disabled');
    cy.get('[data-testid="input-check-password"]').click().type('senhaSecreta');
    cy.get('[data-testid="input-check-password"]').should('have.value', 'senhaSecreta');
  });

});

