describe("Samtrygg Automation", () => {
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
          cy.contains("Tenant").click();
          cy.get('#LastName').type('Hussain')
          cy.get('#Phone').type('123456789')
          cy.get('#Email').type('kingKhan@gmail.com')
          cy.get('#Password').type("23210811")
          cy.get('#Password2').type("23210811")
          cy.get('[type="submit"]').should("contain", "Create your free account").click()
  
  
      })
      it("Verify if the User can Create Account while leaving the Surname field empty",() => {
  
          // Chaning the lagauage to English
          cy.get(".language-a").click();
  
          // Go to Create account page 
          cy.get("ul.right.headData li a").contains("Create an account").click();
          cy.contains("Tenant").click();
          cy.get('#FirstName').type('Saad')
          cy.get('#Phone').type('123456789')
          cy.get('#Email').type('kingKhan@gmail.com')
          cy.get('#Password').type("23210811")
          cy.get('#Password2').type("23210811")
          cy.get('[type="submit"]').should("contain", "Create your free account").click()
  
  
      })
  
      it("Verify if the User can Create Account while leaving the Phone number field empty",() => {
  
          // Chaning the lagauage to English
          cy.get(".language-a").click();
  
          // Go to Create account page 
          cy.get("ul.right.headData li a").contains("Create an account").click();
          cy.contains("Tenant").click();
          cy.get('#FirstName').type('Saad')
          cy.get('#LastName').type('Hussain')
          cy.get('#Email').type('kingKhan@gmail.com')
          cy.get('#Password').type("23210811")
          cy.get('#Password2').type("23210811")
          cy.get('[type="submit"]').should("contain", "Create your free account").click()
  
  
      })
      it("Verify if the User can Create Account while leaving the Email field empty",() => {
  
          // Chaning the lagauage to English
          cy.get(".language-a").click();
  
          // Go to Create account page 
          cy.get("ul.right.headData li a").contains("Create an account").click();
          cy.contains("Tenant").click();
          cy.get('#FirstName').type('Saad')
          cy.get('#LastName').type('Hussain')
          cy.get('#Phone').type('123456789')
          cy.get('#Password').type("23210811")
          cy.get('#Password2').type("23210811")
          cy.get('[type="submit"]').should("contain", "Create your free account").click()
  
  
      })
      
      it("Verify if the User can Create Account while leaving the Password field empty",() => {
  
          // Chaning the lagauage to English
          cy.get(".language-a").click();
  
          // Go to Create account page 
          cy.get("ul.right.headData li a").contains("Create an account").click();
          cy.contains("Tenant").click();
          cy.get('#FirstName').type('Saad')
          cy.get('#LastName').type('Hussain')
          cy.get('#Phone').type('123456789')
          cy.get('#Email').type('kingKhan@gmail.com')
          cy.get('#Password2').type("23210811")
          cy.get('[type="submit"]').should("contain", "Create your free account").click()
  
  
      })
      it.only("Verify if the User can Create Account while leaving the Confirm Passowrd field empty",() => {
  
          // Chaning the lagauage to English
          cy.get(".language-a").click();
  
          // Go to Create account page 
          cy.get("ul.right.headData li a").contains("Create an account").click();
          cy.contains("Tenant").click();
          cy.get('#FirstName').type('Saad')
          cy.get('#LastName').type('Hussain')
          cy.get('#Phone').type('123456789')
          cy.get('#Email').type('kingKhan@gmail.com')
          cy.get('#Password').type("23210811")
          cy.get('[type="submit"]').should("contain", "Create your free account").click()
  
      })
      
  });