describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Should display the site title', () => {
    cy.get('h1[class="site-title"]').should('contain', 'Lav Link')
  })

  it('Should display the site tagline', () => {
    cy.get('p:nth-of-type(1)').should('contain', 'find safer relief near you')
  })

  it('Should display the site logo and filter icons', () => {
    cy.get('img[class="landing-toilet-icon"]').should('be.visible')
    cy.get('img[class="wheelchair-icon"]').should('be.visible')
    cy.get('img[class="unisex-icon"]').should('be.visible')
    cy.get('img[class="baby-icon"]').should('be.visible')
  })

  it('Should display all 5 inputs, their labels and search button', () => {
    cy.get('input[name="currentLocation"]').should('be.visible')
    cy.get('label[for="currentLocation"]').should('be.visible')
    cy.get('input[name="zipcodeInput"]').should('be.visible')
    cy.get('input[name="adaAccessible"]').should('be.visible')
    cy.get('label[for="adaAccessible"]').should('be.visible')
    cy.get('input[name="unisex"]').should('be.visible')
    cy.get('label[for="unisex"]').should('be.visible')
    cy.get('input[name="changingTable"]').should('be.visible')
    cy.get('label[for="changingTable"]').should('be.visible')
    cy.get('button[name="searchButton"]').should('be.visible')
  })
})