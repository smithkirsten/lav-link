describe("Router Error", () => {
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
     cy.visit("http://localhost:3000/random");
  });

  it("Should let the user know if they navigate to a page not found", () => {
   cy.get("p[class='not-found']").should("contain", "Page Not Found")
  });

  it("Should display a button a user can click to return to the landing page", () => {
    cy.get("button[class='return-to-main-button']").should("be.visible");

    cy.get("button[class='return-to-main-button']").should("contain", "Back To Main");

    cy.get("button[class='return-to-main-button']").click();

     cy.get('input[name="currentLocation"]').should("be.visible");
     cy.get('input[name="zipcodeInput"]').should("be.visible");
     cy.get('input[name="adaAccessible"]').should("be.visible");
     cy.get('input[name="unisex"]').should("be.visible");
     cy.get('input[name="changingTable"]').should("be.visible");
  });

});
