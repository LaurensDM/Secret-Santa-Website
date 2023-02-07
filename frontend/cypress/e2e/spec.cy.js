describe('visiting all routes, some should be shielded', () => {
  it('visits home', () => {
    cy.visit('http://localhost:3000/')
  });

  it('visits account', () => {
    cy.visit('http://localhost:3000/account')
    cy.get('h1').should('exist').should('contain','Login required')
  });


  it('visits info page', () => {
    cy.visit('http://localhost:3000/info')
    cy.get('h1').should('not.exist')
  });

  it('visits group page', () => {
    cy.visit('http://localhost:3000/group')
    cy.get('h1').should('exist').should('contain','Login required')
  });

  it('visits join a group page', () => {
    cy.visit('http://localhost:3000/groupjoin')
    cy.get('h1').should('exist').should('contain','Login required')
  });
})