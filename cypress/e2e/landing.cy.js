describe("template spec", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=30&offset=0&lat=40.051112&lng=-105.027632",
      {
        fixture: "../fixtures/get80516request",
      }
    );
    cy.visit("http://localhost:3000/");
  });

  it("Should display the site title", () => {
    cy.get('h1[class="site-title"]').should("contain", "Lav Link");
  });

  it("Should display the site tagline", () => {
    cy.get("p:nth-of-type(1)").should("contain", "find safer relief near you");
  });

  it("Should display the site logo and filter icons", () => {
    cy.get('img[class="landing-toilet-icon"]').should("be.visible");
    cy.get('img[class="wheelchair-icon"]').should("be.visible");
    cy.get('img[class="unisex-icon"]').should("be.visible");
    cy.get('img[class="baby-icon"]').should("be.visible");
  });

  it("Should display all 5 inputs, their labels and search button", () => {
    cy.get('input[name="currentLocation"]').should("be.visible");
    cy.get('label[for="currentLocation"]').should("be.visible");
    cy.get('input[name="zipcodeInput"]').should("be.visible");
    cy.get('input[name="adaAccessible"]').should("be.visible");
    cy.get('label[for="adaAccessible"]').should("be.visible");
    cy.get('input[name="unisex"]').should("be.visible");
    cy.get('label[for="unisex"]').should("be.visible");
    cy.get('input[name="changingTable"]').should("be.visible");
    cy.get('label[for="changingTable"]').should("be.visible");
    cy.get('button[name="searchButton"]').should("be.visible");
  });

  it("Should direct you to the search results page submitting a valid zipcode", () => {
    cy.get('input[name="zipcodeInput"]').type("80516");
    cy.get('button[name="searchButton"]').click();
    cy.url().should("eq", "http://localhost:3000/results");
  });

  it("Should display appropriate results on results page after submitting zipcode 80516", () => {
    cy.get('input[name="zipcodeInput"]').type("80516");
    cy.get('button[name="searchButton"]').click();
    cy.get('article[class="result-card"]')
      .eq(0)
      .should("contain", "Erie Community Library");
    cy.get('article[class="result-card"]')
      .eq(1)
      .should("contain", "Erie Public Library");
    cy.get('article[class="result-card"]').eq(2).should("contain", "Mod Pizza");
  });

  it("Should show an error message to the user if they do not select current location or enter a zipcode", () => {
    cy.get('button[name="searchButton"]').click();
    cy.get('p[class="landing-error-message"]').should(
      "contain",
      "Please select current location or enter a valid zipcode before searching."
    );
  });

  it("Should show an error message to the user if they enter an invalid zipcode", () => {
    cy.get('input[name="zipcodeInput"]').type("999999");
    cy.get('button[name="searchButton"]').click();
    cy.get('p[class="landing-error-message"]').should(
      "contain",
      "Please select current location or enter a valid zipcode before searching."
    );
  });

  it("Should display appropriate results on results page after user clicks current location", () => {
    cy.get('input[name="currentLocation"]').click()
    cy.get('input[name="zipcodeInput"]').should('have.value', '')
    cy.get('button[name="searchButton"]').click();
    cy.get('input[class="zip-input"]').should('not.have.value', "") 
  })

  it('Should display appropriate results on results page after user clicks ADA preference', () => {
    cy.get('input[name="zipcodeInput"]').type("80516");
    cy.get('input[name="adaAccessible"]').click()
    cy.get('button[name="searchButton"]').click();
    cy.get('article[class="result-card"]')
      .eq(0)
      .should("contain", "Erie Community Library");
    cy.get('article[class="result-card"]')
      .eq(1)
      .should("contain", "Erie Public Library");
    cy.get('article[class="result-card"]').eq(2).should("contain", "Mod Pizza");
  })

  it('Should display appropriate results on results page after user clicks unisex preference', () => {
    cy.get('input[name="zipcodeInput"]').type("80516");
    cy.get('input[name="unisex"]').click()
    cy.get('button[name="searchButton"]').click();
    cy.get('article[class="result-card"]')
      .eq(0)
      .should("contain", "Erie Community Library");
    cy.get('article[class="result-card"]')
      .eq(1)
      .should("contain", "Erie Public Library");
    cy.get('article[class="result-card"]').eq(2).should("contain", "Mod Pizza");
  })

  it('Should display appropriate results on results page after user clicks changing table preference', () => {
    cy.get('input[name="zipcodeInput"]').type("80516");
    cy.get('input[name="changingTable"]').click()
    cy.get('button[name="searchButton"]').click();
    cy.get('article[class="result-card"]')
      .eq(0)
      .should("contain", "Erie Community Library");
  })
});