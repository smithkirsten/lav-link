import results from "../fixtures/stubbedResults";

describe("All Results Page", () => {
  it('Should show a loading image while waiting for results', () => {
    // cy.get('.loading-spinner').should('be.visible')
    // If this test fails, change the throttle speed in the Network tab to Slow 3G and run the test again
  })

    
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

  it("Should display the Lav Link logo", () => {
    cy.get('.heading').should('be.visible')
    cy.get('.showing').should('be.visible')
    cy.get('h1').should("contain", "LavLink")
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

  it("Should display all of the bathroom results", () => {
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

  it("Should display a map showing the bathroom locations", () => {
    cy.get("iframe").should("be.visible");

    cy.get("[aria-label='Map']").should("be.visible");

    cy.get("a").eq(3)
      .should("have.attr", "href")
      .should("eq", "https://maps.google.com/maps?ll=42.146494,-88.164651&z=13&t=m&hl=en-US&gl=US&mapclient=apiv3");

    cy.get("a").eq(5)
    .should("have.attr", "href")
    .should("eq", "https://www.google.com/maps/@42.146494,-88.164651,13z/data=!10m1!1e1!12b1?source=apiv3&rapsrc=apiv3");
  });

  

  // it("Should display the bathroom's details page when you click a bathroom's marker on the map", () => {
  //   cy.get("area").eq(0).click({ force: true });

  //   cy.get("p[class='name']").should("contain", "Starbucks")
  // });

  // it("Should display the bathroom's details page when you click a bathroom result card", () => {
  //   cy.get(".result-card").first().click()

  //   cy.get("p[class='name']").should("contain", "Starbucks");
  // });
  
})
