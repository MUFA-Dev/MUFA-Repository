describe('Custom Post Endpoint Tests', () => {
    beforeEach(() => {
      cy.visit('https://mufa-repository-6ak2.onrender.com/docs/#/');
    });
  
    it("Ensure that the homepage loads", () => {
      cy.get(".swagger-ui").should("exist");
    });
  
    it("Test PUT /user/{user_id}/post", () => {
      // Expand the PUT /user/{user_id}/post endpoint
      cy.get('#operations-default-userUser_idPostPUT').click();
  
      // Click on 'Try it out' button
      cy.get('.try-out').click();
  
      // Input the user_id value
      cy.get('input[placeholder="user_id"]').type('1');
  
     
      cy.get('input[placeholder="song_lyrics"]').type("Test lyrics");
      cy.get('input[placeholder="song_album_cover"]').type("Test album cover");
      cy.get('input[placeholder="song_canvas"]').type("Test canvas");
  
      // Click on 'Execute'
      cy.get('.execute').click();
  
      // Verify the response
      cy.get('.response-col_status').should('be.visible');
      cy.get('.response-col_status').contains('200'); // Ensure success response
  
      
      cy.get('div.renderedMarkdown').eq(1).click();
      cy.get('p').eq(1).contains('p','Post updated successfully');

     // Verify the response
     cy.get('.response-col_status').should('be.visible');
     cy.get('.response-col_status').contains('400'); // Ensure success response

     cy.get('div.renderedMarkdown').eq(2).click();
     cy.get('p').eq(2).contains('p','Bad request');
    })
    });


describe('Custom Post Endpoint Tests', () => {
   beforeEach(() => {
    cy.visit('https://mufa-repository-6ak2.onrender.com/docs/#/');
      });
    
    it("Ensure that the homepage loads", () => {
      cy.get(".swagger-ui").should("exist");
    });

    it("Test Post /user/{user_id}/post", () => {
      // Expand the PUT /user/{user_id}/post endpoint
      cy.get('#operations-default-userUser_idPostPOST').click();
  
      // Click on 'Try it out' button
      cy.get('.try-out').click();
  
      // Input the user_id value
      cy.get('input[placeholder="user_id"]').type('18');
  
     
      cy.get('input[placeholder="song_lyrics"]').type("Test_lyrics");
      cy.get('input[placeholder="song_album_cover"]').type("Test_album_cover");
      cy.get('input[placeholder="song_canvas"]').type("Test_canvas");
  
      // Click on 'Execute'
      cy.get('.execute').click();
  
      // Verify the response 
      cy.get('.response-col_status').should('be.visible');
      cy.get('.response-col_status').contains('201'); // Ensure success response
  
      
      cy.get('div.renderedMarkdown').eq(1).click();
      cy.get('p').eq(1).contains('p','Post created successfully');

     // Verify the response
     cy.get('.response-col_status').should('be.visible');
     cy.get('.response-col_status').contains('400'); // Ensure success response

     cy.get('div.renderedMarkdown').eq(2).click();
     cy.get('p').eq(2).contains('p','Bad request');
    })
  }) 
  
  