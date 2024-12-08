describe('login', () => {
	beforeEach(() => {
		cy.visit('https://mufa-repository-1.onrender.com/docs/#/')
	})

it("Ensure that homepage loads", () => {
    cy.get(".swagger-ui").should("exist")

})


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

})