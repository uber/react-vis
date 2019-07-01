describe('app', () => {
  it('works', () => {
    cy.visit('/')
      .getAllByText(/about/i, {selector: 'a'})
      .click()
      .getByText(/About React Vis/i)
  })
})
