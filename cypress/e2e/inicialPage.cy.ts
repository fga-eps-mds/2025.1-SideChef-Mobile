describe('Inicial Page', () => {
  beforeEach(() => { //before each test, the inicial page is visited
    cy.visit('/inicialPage');
  });
   it('deve exibir os elementos da tela inicial', () => { //verify if there is everything that should be on the page

   cy.contains('Ainda não há receitas registradas :( ').should('exist');

   cy.get('input[placeholder="Pesquisar..."]').should('exist');

   cy.get('input[placeholder="Pesquisar..."]').should('have.value', '');

   cy.get('[data-testid=search-icon').should('exist')

   cy.get('[data-testid=receipt-icon').should('exist')

   cy.get('[data-testid=camera-icon').should('exist')

   cy.get('[data-testid=perfil-icon').should('exist')
   
   cy.get('[data-testid=flutunte-icon').should('exist')

   



  });










});