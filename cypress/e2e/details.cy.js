import results from '../fixtures/stubbedResults'

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
    cy.get('article').eq(0).click()
  })

  it('Should display the name of the bathroom and how far it is', () => {
    cy.get("section[class='background details'] > p").should("contain", "Starbucks")
    cy.get("section[class='background details'] > p[class='distance']").should("contain", "1.56 miles");
  })

  it("Should display a transgender flag icon if the bathroom is unisex, a baby icon if the bathroom has a changing table, and a person in a wheelchair icon if it is ADA accessible", () => {
    cy.get('img[alt="Unisex"]').should("have.attr", "src").should("equal", "/assets/transgender.png")
  });


})