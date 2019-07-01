describe('app', () => {
  it('works', () => {
    cy.visit('/')
      .getAllByText(/about/i, {selector: 'a'})
      .click()
      .getByText(/About Kent C. Dodds/i)
  })
})
