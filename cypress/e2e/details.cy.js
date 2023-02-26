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
    cy.get('input[class="zipcode-input"]').type("60010");
    cy.get('button[class="search-button"]').click();
    cy.get("article").eq(0).click();
  });

  it("Should display the name of the bathroom and how far it is", () => {
    cy.get("p[class='name']").invoke("text").should("eq", "Starbucks");
    cy.get("p[class='distance']").invoke("text").should("eq", "1.56 miles");
  });

  it("Should display a transgender flag icon if the bathroom is unisex, a baby icon if the bathroom has a changing table, and a person in a wheelchair icon if it is ADA accessible", () => {
    cy.get('img[alt="Unisex"]')
      .should("have.attr", "src")
      .should("equal", "/assets/transgender.png");
  });

  it("Should display the address and additional directions if there are any", () => {
    cy.get('div[class="address"]')
      .invoke("text")
      .should("eq", "101 W Main StBarrington, IL");
    cy.get('p[class="directions"]')
      .invoke("text")
      .should(
        "eq",
        "Directions: On far side from Lake Cook Rd; left bathroom has an infant changing table and right bathroom has a urinal."
      );
  });

  it("Should display additional comments if there are any, the date it was last updated, and the number of downvotes and upvotes", () => {
    cy.get('p[class="comment"]')
      .invoke("text")
      .should(
        "eq",
        "Comments: You can go in through the back (from the large parking lot) and end up right by the restrooms."
      );
    cy.get('p[class="update"]')
      .invoke("text")
      .should("eq", "Last Updated: 1/16/2017");
    cy.get('p[class="upvotes"]').invoke("text").should("eq", "Upvotes: 1");
    cy.get('p[class="downvotes"]').invoke("text").should("eq", "Downvotes: 0");
  });

  it("Should display a map showing the bathroom's location", () => {
    cy.get("iframe").should("be.visible");
    cy.get("[aria-label='Map']");
 
  });

  it("Should open google maps when a user clicks on the bathroom marker", () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');  
    }); 

    cy.get("area").click({ force: true });

    cy.get('@windowOpen').should('be.calledWith', 'https://www.google.com/maps/dir/?api=1&destination=Starbucks%2CBarrington%2CIL', '_blank', 'noreferrer');
  })

  it("Should open google maps when a user clicks on the directions button", () => {
    cy.intercept("GET", "https://www.google.com/maps/dir/*").as(
      "googleMaps"
    );

    cy.get("section[class='background details'] > a").click();

    cy.wait("@googleMaps").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
      expect(intercept.request.url).to.eq(
        "https://www.google.com/maps/dir/?api=1&destination=Starbucks%2CBarrington%2CIL"
      );
    });
  })


  it("Should have a go back button that takes the user back to the all results page", () => {
    cy.get('button[class="back-to-main-button"]')
      .invoke("text")
      .should("eq", "Back to All Results");
  });

})