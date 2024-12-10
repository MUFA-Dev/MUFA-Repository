
describe('Custom PUT Endpoint Tests', () => {
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


describe('Custom POST Endpoint Tests', () => {
   beforeEach(() => {
    cy.visit('https://mufa-repository-6ak2.onrender.com/docs/#/');
      });
    
    it("Ensure that the homepage loads", () => {
      cy.get(".swagger-ui").should("exist");
    });

    it("Test Post /user/{user_id}/post", () => {
      // Expand the Post /user/{user_id}/post endpoint
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
  
  

describe('Homepage,testing GET Endpoint', () => {
	beforeEach(() => {
		cy.visit('https://mufa-repository-1.onrender.com/docs/#/')
	})

  it("Ensure that homepage loads and that the search bar works properly ", () => {
    cy.get(".swagger-ui").should("exist");
    // Remove the 'disabled' attribute from the input element
    cy.get("input.download-url-input").then((input) => {
        input.removeAttr("disabled");
    });

    // Click on the wrapper
    cy.get(".download-url-wrapper").click();

    // Type into the input field
    cy.get("input.download-url-input").type("this is a test");

    // Click the explore button
    cy.get(".download-url-button").click();
    //confirm that the info respawnse exist (which is an error in this case)
    cy.get(".info").should("exist");
  });


it("Click on '/user/{user_id}/songGET' endpoint and verify responses", () => {
  // Check that clicking the endpoint works
  cy.get('#operations-default-userUser_idSongGET').click();

  // Check that 'Try it out' button works
  cy.get('.try-out').click();

  // Type something in the user_id placeholder
  cy.get('input[placeholder="user_id"]').type('1');

  // Click the 'Execute' button
  cy.get('.opblock-control__btn').click();

  // Check that a response is given (non-zero length)
  cy.get('.content-type').should('have.length.greaterThan', 0);

  // Verify the request URL
  cy.get('.request-url').should(
    'contain.text',
    'https://mufa-repository-1.onrender.com/user/1/song'
  );

  // Check the response codes (wait for them to appear)
  cy.get('.response-col_status').should('be.visible');
  //Ensure that responses 500,400 and 200 are present
  cy.get('.response-col_status').contains('500');
  cy.get('.response-col_status').contains('400');
  cy.get('.response-col_status').contains('200');
  // Verify the download button works
  cy.get('.download-contents').should('be.visible');
  //verify that download button works
    //cy.get('.download-contents').click();
  //Verify that media type button works
  cy.get('.content-type-wrapper ').click();
  cy.get('.content-type').should('be.visible');
})

  describe('Testing DELETE Endpoint ', () => {
	beforeEach(() => {
		cy.visit('https://mufa-repository-1.onrender.com/docs/#/')
	})
  
it("/user/{user_id}/post/{post_id}", () =>{
  cy.get('#operations-default-userUser_idPostPost_idDELETE').click();

  cy.get('.try-out').click();
  cy.get('input[placeholder="user_id"]').type('1');
  cy.get('input[placeholder="post_id"]').type('10');

  cy.get('.opblock-control__btn').click();
  
  cy.get('.request-url').should(
    'contain.text',
    'https://mufa-repository-1.onrender.com/user/1/post/10'
  );

  cy.get('.response-col_status').contains('500');
  cy.get('.response-col_status').contains('400');
  cy.get('.response-col_status').contains('200');

  cy.get('.download-contents').should('be.visible');

  cy.get('.btn-clear.opblock-control__btn').click();

})

it("Ensure that schemas exist and work proeprely", () => {
  //ensure tha schemas are clickable
  cy.get("section.models").should("be.visible").click();
  //after expanding, try to click on one and expect the right response
  //Ensure that model box expands
  cy.get(".model-box").eq(0).should("be.visible").click();
  //Ensure that model box expands
  cy.get(".model").eq(0).should("be.visible");
});

})

})