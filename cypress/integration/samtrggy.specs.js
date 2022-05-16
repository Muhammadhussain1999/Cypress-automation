import credentials from '../fixtures/credentials.json'
function loginform(){
  cy.get('.is-desktop-menu-stuff ul li').contains('Sign in').click()
  cy.get()
}
  

function formfilling(applicant,firstName,surName,phoneNumber,email,password,confirmPasword){
  
  cy.contains(applicant).click();
  cy.get('#FirstName').type(firstName)
  cy.get('#LastName').type(surName)
  cy.get('#Phone').type(phoneNumber)
  cy.get('#Email').type(email)

  if(password.length >0){
    cy.get('#Password').type(password).should('have.value',password)
  }
  if(confirmPasword.length >0){
    cy.get('#Password2').type(confirmPasword).should('have.value',confirmPasword)
  }
  

}

describe("Samtrygg Automation", () => {
  Cypress.on('uncaught:exception' ,(err, runnable) => {
    return false
  }) 
  beforeEach(() => {
    cy.visit("https://stage02.dev.samtrygg.se/");
  });

  it("verify if all the inputs fields have valid placeholders", () => {

    //verfiying that the user is on landing page 
    cy.get("h1.top-section-panel__h1").should("contain","Upptäck ditt nya hem");
    
    //Changing the language to english
    cy.get(".language-a").click();
    
    //Verifying all placeholders are on the right place
    cy.get("ul.right.headData li a").contains("Create an account").click();
    cy.contains("Tenant").click();
    cy.get('[for="FirstName"]').should("contain", "First name");
    cy.get('[for="LastName"]').should("contain", "Surname");
    cy.get('[for="Email"]').should("contain", "E-mail");
    cy.get('[for="Password"]').should("contain","Password (at least 8 characters)");
    cy.get('[for="Password2"]').should("contain", "Confirm new password");

  });

  it("Verify if system is giving validtion messages if fields are left empty ", () => {

    // Chaning the lagauage to English
    cy.get(".language-a").click();

    // Go to Create account page 
    cy.get("ul.right.headData li a").contains("Create an account").click();

    // Submiting the form without filling the mendatory fields 
    cy.get('[type="submit"]').should("contain", "Create your free account").click()

    // Checking validation Messages 
    cy.get('div.alert-box.info span.data').should('contain','Please fill in all fields correctly')
    cy.get('div.row.form-group div.radioError.errorMsgDiv').should('contain','Please select Tenant or Landlord to complete the process')
    cy.get('.errorMsgDiv.required').should('contain',' First name is required')
    cy.get('#Phone').parents('div').find('.errorMsgDiv.required').should( 'contain','Phone number is required')
    cy.get('#Email').parents('div').find('.errorMsgDiv.required').should( 'contain',' E-mail is required')
    cy.get('#Password').parents('div').find('.errorMsgDiv.required').should( 'contain',' Password is required')
    cy.get('#Password2').parents('div').find('.errorMsgDiv.required').should( 'contain',' Confirm password is required')
    
  });

    it("Verify if the User can Create Account while leaving the First name field empty",() => {

        // Chaning the lagauage to English
        cy.get(".language-a").click();

        // Go to Create account page 
        cy.get("ul.right.headData li a").contains("Create an account").click();

        // Filling signup form
        formfilling(credentials.applicant,' ',credentials.surName,credentials.phone,credentials.email,credentials.password,credentials.confirmPassword)

        // Submiting the form 
        cy.get('[type="submit"]').should("contain", "Create your free account").click()


    })
    
    it("Verify if the User can Create Account while leaving the Surname field empty",() => {

        
        // Chaning the lagauage to English
        cy.get(".language-a").click();

        // Go to Create account page 
        cy.get("ul.right.headData li a").contains("Create an account").click();

        // Filling signup form
        formfilling(credentials.applicant,credentials.firstName,' ',credentials.phone,credentials.email,credentials.password,credentials.confirmPassword)

        // Submiting the form 
        cy.get('[type="submit"]').should("contain", "Create your free account").click()

    })

    it("Verify if the User can Create Account while leaving the Phone number field empty",() => {

        // Chaning the lagauage to English
        cy.get(".language-a").click();

        // Go to Create account page 
        cy.get("ul.right.headData li a").contains("Create an account").click();

        // Filling signup form
        formfilling(credentials.applicant,credentials.firstName,credentials.surName,' ',credentials.email,credentials.password,credentials.confirmPassword)

        // Submiting the form 
        cy.get('[type="submit"]').should("contain", "Create your free account").click()

    })
    it("Verify if the User can Create Account while leaving the Email field empty",() => {

          // Chaning the lagauage to English
          cy.get(".language-a").click();

          // Go to Create account page 
          cy.get("ul.right.headData li a").contains("Create an account").click();
  
          // Filling signup form
          formfilling(credentials.applicant,credentials.firstName,credentials.surName,credentials.phone,' ',credentials.password,credentials.confirmPassword)
  
          // Submiting the form 
          cy.get('[type="submit"]').should("contain", "Create your free account").click()

    })
    
    it("Verify if the User can Create Account while leaving the Password field empty",() => {

       // Chaning the lagauage to English
       cy.get(".language-a").click()
      
        // Go to Create account page 
        cy.get("ul.right.headData li a").contains("Create an account").click();

        // Filling signup form
        formfilling(credentials.applicant,credentials.firstName,credentials.surName,credentials.phone,credentials.email,' ',credentials.confirmPassword)
        // Submiting the form 
        cy.get('[type="submit"]').should("contain", "Create your free account").click()


    })
    it("Verify if the User can Create Account while leaving the Confirm Passowrd field empty",() => {

        // Chaning the lagauage to English
        cy.get(".language-a").click();

        // Go to Create account page 
        cy.get("ul.right.headData li a").contains("Create an account").click();
        formfilling(credentials.applicant,credentials.firstName,credentials.surName,credentials.phone,credentials.email,credentials.password)       
        cy.get('[type="submit"]').should("contain", "Create your free account").click()

    })

      it("Verify that email filed should only accept valid email",()=>{
         // Chaning the lagauage to English
        cy.get(".language-a").click();

         // Go to Create account page 
        cy.get("ul.right.headData li a").contains("Create an account").click();
        formfilling(credentials.applicant,credentials.firstName,credentials.surName,credentials.phone,credentials.invalidEmail,credentials.password,credentials.confirmPassword)

        cy.get('#Email').parents('div').find('.errorMsgDiv.minlength').should( 'contain','Enter a valid E-mail address')
        cy.get('#Phone').parents('div').find('.errorMsgDiv.required').should( 'contain','Phone number is required')
        cy.get('div.alert-box.info span.data').should('contain','Please fill in all fields correctly')
      })
      it("Verify password match ",()=>{
        // Chaning the lagauage to English
        cy.get(".language-a").click();

        // Go to Create account page 
        cy.get("ul.right.headData li a").contains("Create an account").click();
        formfilling(credentials.applicant,credentials.firstName,credentials.surName,credentials.phone,credentials.email,credentials.password,credentials.worngPassword)
        cy.get('[type="submit"]').should("contain", "Create your free account").click()
        cy.get('div.alert-box.info span.data').should('contain','Please fill in all fields correctly')
        cy.get('#Password').parents('div').find('.errorMsgDiv.donotMatch').should('contain','Passwords do not match')
        cy.get('#Password2').parents('div').find('.errorMsgDiv.donotMatch').should('contain','Passwords do not match')


      })
      it.only('Verify that phone number field only accept numeric values',()=>{
        // Chaning the lagauage to English
        cy.get(".language-a").click();

        // Go to Create account page 
        cy.get("ul.right.headData li a").contains("Create an account").click();
        formfilling(credentials.applicant,credentials.firstName,credentials.surName,' ',credentials.email,credentials.password,credentials.confirmPassword)
        cy.get('[type="submit"]').should("contain", "Create your free account").click()
        cy.get('div.alert-box.info span.data').should('contain','Please fill in all fields correctly')
        cy.get('#Phone').parents('div').find('.errorMsgDiv.required').should( 'contain','Phone number is required')
      })
      it('Verify if the user can Create acc with valid credentials',()=>{
      

        // Chaning the lagauage to English
        cy.get(".language-a").click();

        // Go to Create account page 
        cy.get("ul.right.headData li a").contains("Create an account").click();
        
        formfilling(credentials.applicant,credentials.firstName,credentials.surName,credentials.phone,credentials.email,credentials.password,credentials.confirmPassword)
        cy.get('[type="submit"]').should("contain", "Create your free account").click()
        cy.get('h2').should('contain','Verify your e-mail')

      })
      it('Login with correct credentials',(){
        // Chaning the lagauage to English
        cy.get(".language-a").click();



      })

    
});
