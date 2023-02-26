describe("Server Error", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=30&offset=0&lat=42.146494&lng=%20-88.164651",
      },
      {
        statusCode: 500,
      }
    );
    cy.visit("http://localhost:3000");
    cy.get('input[class="zipcode-input"]').type("60010");
    cy.get('button[class="search-button"]').click();
  });

  it("Should let the user know if something went wrong during their request", () => {
    cy.get("p[class='server-error']").should("contain","Whoops! Something went wrong. Please try a new zipcode");
  });
  
});
