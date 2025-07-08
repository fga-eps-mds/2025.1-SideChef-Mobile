describe('Página de Adicionar Receitas', () => {
  beforeEach(() => {
    cy.visit('/addRecipe');
  });

  it('deve exibir os elementos da "add_recipe', () => {
    // verify if there is everything that should be on the page
    cy.contains('+ Adicionar foto').should('exist');
    cy.contains('Adicionar Receitas').should('exist');
    cy.contains('Cancelar').should('exist');
    cy.contains('Salvar').should('exist');

    cy.get('input[placeholder="Título da Receita"]').should('have.value', '');
    cy.get('input[placeholder="Ingrediente 1"]').should('have.value', '');
    cy.get('textarea[placeholder="Descreva o modo de preparo"]').should('have.value', '');
  });

  it('Preenche o formulário de receita e salva', () => {

    cy.get('input[placeholder="Título da Receita"]').type('Bolo de Chocolate'); //testing the placeholder

    cy.contains('Selecione o tipo').click(); //Open the option of type
    cy.contains('Doce').click(); //select the "Doce" option

    cy.contains('Selecione a dificuldade').click(); //open the dificulty options
    cy.contains('Médio').click(); //select "média"

    cy.get('input[placeholder="Ingrediente 1"]').type('Farinha');     //Placeholder testing
    
    cy.contains('+ Adicionar Ingrediente').click(); //Adding more ingredients
    cy.get('input[placeholder="Ingrediente 2"]').type('Ovos');

    cy.get('textarea[placeholder="Descreva o modo de preparo"]').type('Misture tudo e leve ao forno por 30 minutos.'); //testing the placeholder

    cy.contains('Salvar').click();
    }); 
 
  it('Cancelar e retorna para "/menu"', () => {

  cy.get('input[placeholder="Título da Receita"]').type('Teste Cancelar');

  cy.contains('Cancelar').click(); //Verify if the Cancelar i in the page and click in it. 
  cy.location('pathname', { timeout: 10000 }).should('eq', '/menu');

        });  
});
