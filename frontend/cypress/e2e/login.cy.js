describe('login', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should successfully log into the app', () => {
    cy.get('h1').should('exist');
  });

  it('should successfully log out of the app', () => {
    cy.logout();

    cy.get('h1').should('exist');
  });
});