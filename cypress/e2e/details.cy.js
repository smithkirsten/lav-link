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

  it("Should redirect users if they click on the bathroom marker on the map", () => {
    const newUrl ="https://www.google.com/maps/dir/?api=1&destination=Starbucks%2CBarrington%2CIL"
      // "https://www.google.com/maps/dir/38.6789517,-90.2385387/Starbucks,+101+W+Main+St,+Barrington,+IL+60010/@40.3725428,-91.2054429,7z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x880fa0da431f1207:0xa882b0db6c890dba!2m2!1d-88.136336!2d42.154071"

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen')})
      cy.get("area").click({ force: true })
       cy.get('@windowOpen').should('be.calledWith', newUrl);
        cy.window().then(win => {
          win.location.href = newUrl;
        });

        
          
       
      
  })

  //"https://maps.gstatic.com/mapfiles/openhand_8_8.cur"

  it("Should have a go back button that takes the user back to the all results page", () => {
    cy.get('button[class="back-to-main-button"]')
      .invoke("text")
      .should("eq", "Back to All Results");
  });

  // Add tests for map!!!!!!!
})