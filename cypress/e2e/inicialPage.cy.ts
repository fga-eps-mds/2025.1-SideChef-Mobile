describe('Inicial Page', () => {
  it('deve exibir os elementos da tela inicial', () => { //verify if there is everything that should be on the page
    cy.visit('/inicialPage');

    cy.contains('Ainda não há receitas registradas :(').should('exist');

    cy.get('input[placeholder="Pesquisar..."]').should('exist');

    cy.get('input[placeholder="Pesquisar..."]').should('have.value', '');

    cy.get('[data-testid="search-icon"]').should('exist');

    cy.get('[data-testid="receipt-icon"]').should('exist');

    cy.get('[data-testid="camera-icon"]').should('exist');

    cy.get('[data-testid="perfil-icon"]').should('exist');
    
    cy.get('[data-testid="flutunte-icon"]').should('exist');
  });

  describe('inicialPage com acesso às receitas mockadas', () => {
    it('deve exibir receitas sem o backend rodando', () => {

      //this test mocks the backend response for the recipe list
      cy.intercept('GET', '**/getRecipes', {  //intercept the GET request to getRecipes
  statusCode: 200,                            //this is what the backend would return
  body: [
    {
      Nome: 'Pizza de Calabresa', 
      tipo: 'Salgado',
      Dificuldade: 'Fácil',
      Ingredientes: ['calabresa', 'queijo', 'molho'],   //this var's are in portuguese because in "RECIPE_SERVICE" it is also in portuguese. Need to change it!
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
 

      cy.visit('/inicialPage');
      cy.wait('@getRecipes');

      //verify if the recipes are displayed on the page
      cy.contains('Pizza de Calabresa').should('exist');
      cy.contains('Arroz com Pequi').should('exist');
    });
  });
});
