import noResults from "../fixtures/noResults";

describe("No Results Found", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=30&offset=0&lat=42.146494&lng=%20-88.164651",
      },
      {
        statusCode: 200,
        body: noResults,
      }
    )
    cy.visit("http://localhost:3000");
    cy.get('input[class="zipcode-input"]').type("60010");
    cy.get('button[class="search-button"]').click();
  });

  it("Should let the user know if no bathrooms meet their search criteria", () => {
    cy.get("p[class='no-bathrooms']").should("be.visible");

    cy.get("p[class='no-bathrooms']").should(
      "contain","No bathrooms found. Please adjust your search criteria and try again.");
  });

});
