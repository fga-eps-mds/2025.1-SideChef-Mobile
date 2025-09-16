describe('Menu', () => {
  beforeEach(() => {
    cy.visit('/menu'); // ajuste a rota conforme necessário
  });

  it('deve exibir os elementos do menu', () => {
    cy.get('[data-testid="logo-icon"]').should('exist');
    cy.get('[data-testid="search-icon"]').should('exist');
    cy.get('[data-testid="receipt-icon"]').should('exist');
    cy.get('[data-testid="camera-icon"]').should('exist');
    cy.get('[data-testid="perfil-icon"]').should('exist');
    cy.get('[data-testid="flutunte-icon"]').should('exist');
  });

  it('deve redirecionar ao criar receitas quando clicar no botão flutuante (+)', () => {
    cy.get('[data-testid="flutunte-icon"]').click();
    cy.url({ timeout: 10000 }).should('include', '/addRecipe');
  });

  it('deve recarregar as receitas ao clicar no botão de receitas', () => {
    cy.intercept('GET', '**/getRecipes', {
      statusCode: 200,
      body: [
        {
          Name: 'Nova Receita',
          Type: 'Doce',
          Difficulty: 'Fácil',
          Ingredients: [
            { quantity: '1', ingredient: 'ovo' },
            { quantity: '2 colheres', ingredient: 'açúcar' }
          ],
          Preparation: 'Misture tudo.',
          _id: '1',
          image_url: 'https://via.placeholder.com/150'
        }
      ]
    }).as('getRecipes');

    cy.get('[data-testid="receipt-icon"]').click();
    cy.wait('@getRecipes');
    cy.contains('Nova Receita').should('exist');
  });

  it('deve redirecionar ao cadastro ao clicar no botão de perfil', () => {
    cy.get('[data-testid="perfil-icon"]').click();
    cy.url({ timeout: 10000 }).should('include', '/addUser');
  });

  it('deve exibir receitas sem o backend rodando (mock)', () => {
    cy.intercept('GET', '**/getRecipes', {
      statusCode: 200,
      body: [
        {
          Name: 'Pizza de Calabresa',
          Type: 'Salgado',
          Difficulty: 'Fácil',
          Ingredients: [
            { quantity: '', ingredient: 'calabresa' },
            { quantity: '', ingredient: 'queijo' },
            { quantity: '', ingredient: 'molho' }
          ],
          Preparation: 'Asse por 30 minutos.',
          _id: '2',
          image_url: 'https://via.placeholder.com/150'
        },
        {
          Name: 'Arroz com Pequi',
          Type: 'Salgado',
          Difficulty: 'Médio',
          Ingredients: [
            { quantity: '', ingredient: 'arroz' },
            { quantity: '', ingredient: 'pequi' },
            { quantity: '', ingredient: 'alho' }
          ],
          Preparation: 'Cozinhe por 20 minutos.',
          _id: '3',
          image_url: 'https://via.placeholder.com/150'
        }
      ]
    }).as('getRecipes');

    cy.visit('/menu');
    cy.wait('@getRecipes');

    cy.contains('Pizza de Calabresa').should('exist');
    cy.contains('Arroz com Pequi').should('exist');
  });

  it('deve expandir e retornar o card da receita ao clicar', () => {
    cy.intercept('GET', '**/getRecipes', {
      statusCode: 200,
      body: [
        {
          Name: 'Pizza de Calabresa',
          Type: 'Salgado',
          Difficulty: 'Fácil',
          Ingredients: [
            { quantity: '', ingredient: 'calabresa' },
            { quantity: '', ingredient: 'queijo' },
            { quantity: '', ingredient: 'molho' }
          ],
          Preparation: 'Asse por 30 minutos.',
          _id: '4',
          image_url: 'https://via.placeholder.com/150'
        }
      ]
    }).as('getRecipes');

    cy.visit('/menu');
    cy.wait('@getRecipes');

    cy.contains('Modo de Preparo:').should('not.exist');
    cy.contains('Pizza de Calabresa').click();

    cy.contains('Ingredientes').should('exist');
    cy.contains('calabresa').should('exist');
    cy.contains('queijo').should('exist');
    cy.contains('molho').should('exist');
    cy.contains('Preparo').should('exist');
    cy.contains('Asse por 30 minutos.').should('exist');

    cy.get('[data-testid="logo-icon"]').click(); // fecha a visualização
  });

  it('deve ativar e desativar a barra de pesquisa', () => {
    cy.get('[data-testid="search-icon"]').click();
    cy.get('input[placeholder="Pesquisar..."]').should('exist').type('bolo');
    cy.get('[data-testid="close-icon"]').click();
    cy.get('input[placeholder="Pesquisar..."]').should('not.exist');
  });
});
