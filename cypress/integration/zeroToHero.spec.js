
describe("Cypress zero to hero", () => {

  beforeEach("visit website", () => {
      cy.visit('https://stage02.dev.samtrygg.se')

    //verfiying that the user is on landing page
    cy.get("h1.top-section-panel__h1").should("contain","Upptäck ditt nya hem");

    //Changing the language to english
    cy.get(".language-a").click();

    //Creating Account
    cy.get("ul.right.headData li a").contains("Create an account").click();
  });

  it("verify if all the inputs fields have valid placeholders", () => {
    

    cy.fixture('credentials.json').then((user)=>{
        cy.get('#FirstName').type(user.firstName)
    })

});
});