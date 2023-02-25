import results from "../fixtures/stubbedResults";

describe("All Results Page", () => {
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
    cy.get('input[class="zipcode-input"]').type("60010");
    cy.get('button[class="search-button"]').click();
  
  });

  it("Should display logo", () => {
    cy.get('.heading').should('be.visible')
    cy.get('.showing').should('be.visible')
  })

  it("Should display all inputs, icons and search button", () => {
    cy.get('label[class="input-label"]').should("be.visible");
    cy.get('input[name="zipcode"]').should("be.visible");
    cy.get('img[alt="wheelchair icon"]').should("be.visible");
    cy.get('input[name="adaAccessible"]').should("be.visible");
    cy.get('img[alt="unisex icon"]').should("be.visible");
    cy.get('input[name="unisex"]').should("be.visible");
    cy.get('img[alt="changing table icon"]').should("be.visible");
    cy.get('input[name="changingTable"]').should("be.visible");
    cy.get('.changeButton').should("be.visible");
  });


  it("Should display the all of the bathroom results", () => {
    cy.get(".result-card").should('have.length', 3)
  })

  it('Should display appropriate results if ADA preference is clicked', () => {
    cy.get('input[name="adaAccessible"]').click();
    cy.get('.changeButton').click()
    cy.get(".result-card").first().contains('Jewel-Osco')
    cy.get(".result-card").eq(1).contains('Harper College Building M')
  })

  it('Should display appropriate results if unisex preference is clicked', () => {
    cy.get('input[name="unisex"]').click();
    cy.get('.changeButton').click()
    cy.get(".result-card").first().contains('Starbucks')
    cy.get(".result-card").eq(1).contains('Harper College Building M')
  })

  it('Should display appropriate results if changing table preference is clicked', () => {
    cy.get('input[name="changingTable"]').click();
    cy.get('.changeButton').click()
    cy.get(".result-card").contains('Harper College Building M')
  })

  // Add map test
  // Add test that click into details page
})
