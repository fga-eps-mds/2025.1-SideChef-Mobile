describe('Tela de Login', () => {
  beforeEach(() => { //before each test, the login page is visited
    cy.visit('/login');
  });

  it('deve exibir os elementos da tela de login', () => { //verify if there is everything that should be on the page
    cy.contains('Falta pouco para iniciar a sua jornada na cozinha!').should('exist');
    cy.contains('Como deseja continuar?').should('exist');
    cy.contains('Continuar com o Google').should('exist');
    cy.contains('Outras opções').should('exist');
    cy.contains('Continuar sem salvar minhas receitas').should('exist');
    cy.get('[data-testid="red-logo"]').should('exist'); //verify if the red logo is present
    cy.get('[data-testid="google-icon"]').should('exist'); //verify if the google icon is present
  });

  it('deve redirecionar para a inicialPage"', () => {
    //using the testID to find the button
    cy.get('[data-testid="continuar-sem-salvar"]', { timeout: 10000 }).click();
    
    cy.contains('Ainda não há receitas registradas :(', { timeout: 10000 }).should('exist');

    //Verify if the URL is correct after clicking the button
    cy.url({ timeout: 10000 }).should('include', '/inicialPage');

    //verify if the "Pesquisar" exists on the new page
    cy.contains('Ainda não há receitas registradas :(', { timeout: 10000 }).should('exist');
  });
  
  it('deve abrir o modal de opções ao clicar no botão "Outras opções"', () => { //testing the modal opening

    cy.get('[data-testid="other-options-button"]', {timeout: 10000}).click(); //using the testID to find the button and click it
    cy.get('[data-testid="modal-overlay"]').should('exist'); //verify if the modal content is present
    cy.get('[data-testid="facebook-button"]').should('exist'); //verify if the Facebook button is present
    cy.get('[data-testid="celular-button"]').should('exist'); //verify if the Cellphone button is present
    cy.get('[data-testid="email-button"]').should('exist'); //verify if the Email button is present
  });

  it('deve fechar o modal ao clicar no overlay', () => { //testing the modal closing
    cy.get('[data-testid="other-options-button"]').click(); //open the modal
    cy.get('[data-testid="modal-overlay"]').click(); //click on the overlay to close the modal
    cy.get('[data-testid="modal-overlay"]').should('not.exist'); //verify if the modal is closed
  });

  
});


