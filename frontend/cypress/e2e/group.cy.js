describe("userGroups tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("show groups", () => {
    cy.get('[data-cy=account]').click();
    cy.intercept('GET','http://localhost:9000/api/userGroups/user/')
  });

  it("go to create group page", () => {
    cy.get('[data-cy=account]').click();
    cy.get('[data-cy=group_create]').click();
    cy.get('h1').should('exist').should('contain','groep')
  })

  it('very slow response', () => {
    cy.get('[data-cy=account]').click();
    cy.intercept('GET',
      'http://localhost:9000/api/userGroups/user/',
      (req) => {
        req.on('response', (res) => {
          res.setDelay(1000);
        });
      },
    ).as('slowResponse');
    cy.get('[data-cy=loading]').should('be.visible');
    cy.wait('@slowResponse');
    cy.get('[data-cy=loading]').should('not.exist');
  });

  it('error from backend', () => {
    cy.get('[data-cy=account]').click();
    cy.intercept(
      'GET',
      'http://localhost:9000/api/userGroups/user/',
      {
        statusCode: 500,
        body: {
          error: 'internal server error',
        },
      },
    );
    cy.get('[data-cy=error').should('be.visible');
  });
});