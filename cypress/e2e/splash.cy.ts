describe('Splash Screen', () => {
  it('deve exibir a imagem animada e redirecionar para o login', () => {
    cy.visit('/');

    //verfy if the splash logo is visible
    cy.get('[data-testid=splash-logo]').should('be.visible');

    //wait for the animation to complete
    cy.wait(3000);

    //verify if the user is redirected to the login page
    cy.url().should('include', '/login');
    cy.contains('Continuar com o Google').should('exist');  
  });
});
