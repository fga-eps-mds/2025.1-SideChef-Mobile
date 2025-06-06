describe('Menu', () => {
  beforeEach(() => {
    cy.visit('/menu');
  });

  it('deve exibir os elementos do menu', () => {
    // verify if there is everything that should be on the page
    cy.contains('Ainda não há receitas registradas :(').should('exist');

    cy.get('input[placeholder="Pesquisar..."]').should('exist');
    cy.get('input[placeholder="Pesquisar..."]').should('have.value', '');

    cy.get('[data-testid="search-icon"]').should('exist');
    cy.get('[data-testid="receipt-icon"]').should('exist');
    cy.get('[data-testid="camera-icon"]').should('exist');
    cy.get('[data-testid="perfil-icon"]').should('exist');
    cy.get('[data-testid="flutunte-icon"]').should('exist');
  });

  it('deve exibir alerta ao clicar no botão flutuante (+)', () => {
    
    // simulates click on flutunte "+" button
    cy.get('[data-testid="flutunte-icon"]').click();
    
    // intercepts alerts for testing
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Ir para perfil');
    });

  });
   
  it('deve exibir alerta ao clicar no botão de receitas', () => {
    
    // simulates click on receipt button
    cy.get('[data-testid="receipt-icon"]').click();
    
    //intercepts alerts for testing
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Ir para recipes');
    });
  });

  it('deve redirecionar ao cadastro ao clicar no botão de perfil', () => {

    //simulates clicking on the profile button
    cy.get('[data-testid="perfil-icon"]', { timeout: 10000 }).click();

    cy.url({ timeout: 10000 }).should('include', '/addUser');
    
  });



  it('deve exibir receitas sem o backend rodando', () => {
    // this test mocks the backend response for the recipe list
    cy.intercept('GET', '**/getRecipes', {  // intercept the GET request to getRecipes
      statusCode: 200,                      // this is what the backend would return
      body: [
        {
          Nome: 'Pizza de Calabresa', 
          tipo: 'Salgado',
          Dificuldade: 'Fácil',
          Ingredientes: ['calabresa', 'queijo', 'molho'],   // this var's are in portuguese because in "RECIPE_SERVICE" it is also in portuguese. Need to change it!
          Preparo: 'Asse por 30 minutos.'
        },
        {
          Nome: 'Arroz com Pequi',
          tipo: 'Salgado',
          Dificuldade: 'Médio',
          Ingredientes: ['arroz', 'pequi', 'alho'],
          Preparo: 'Cozinhe por 20 minutos.'
        }
      ]
    }).as('getRecipes'); 

    // visit the screen again for the intercept to work properly
    cy.visit('/menu');
    cy.wait('@getRecipes');

    // verify if the recipes are displayed on the page
    cy.contains('Pizza de Calabresa', { timeout: 10000 }).should('exist');
    cy.contains('Arroz com Pequi').should('exist');
  });


  //Need to test when you click in the cards, and when you unclick it too!
});

