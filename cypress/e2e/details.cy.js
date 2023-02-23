import results from '../fixtures/getResult'

describe('Bahtroom Details Page', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=30&offset=0&lat=42.146494&lng=%20-88.164651",
      },
      {
        statusCode: 200,
        body: results,
      }
    );
    cy.visit("http://localhost:3000");
    cy.get('input[class="zipcode-input"]').type("60010")
    cy.get('button[class="search-button"]').click()
  })

  it('passes', () => {
    cy.get("div")
  })
})