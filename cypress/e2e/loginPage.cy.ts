describe('Página Inicial', () => {
  beforeEach(() => { //before each test, the Inicial page is visited
    cy.visit('/inicialPage');
  });

  it('deve exibir os elementos da tela de login', () => { //verify if there is everything that should be on the page
    cy.contains('Falta pouco para iniciar a sua jornada na cozinha!').should('exist');
    cy.contains('Como deseja continuar?').should('exist');
    cy.contains('Entrar').should('exist');
    cy.contains('Cadastrar').should('exist');
    cy.contains('Continuar sem salvar minhas receitas').should('exist');
    cy.get('[data-testid="red-logo"]').should('exist'); //verify if the red logo is present
  });

  it("deve redirecionar para o loginUsers", () => {
    //usinf the testID to find the button to click;
    cy.get('[data-testid="entrar-button"]', { timeout: 10000 }).click();

    //Verify if the URL is correct after clicking the button
    cy.url({ timeout: 10000 }).should('include', '/loginUser');
    

  });

  it('deve redirecionar para o Menu', () => {
    //using the testID to find the button
    cy.get('[data-testid="continuar-sem-salvar"]', { timeout: 10000 }).click();

    //Verify if the URL is correct after clicking the button
    cy.url({ timeout: 10000 }).should('include', '/menu');

  });
  
});


