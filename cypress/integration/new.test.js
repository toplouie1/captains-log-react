describe("New Page", () => {
  before(() => {
    cy.visit("http://localhost:3000/logs/new");
  });

  it("shows the header text", () => {
    cy.contains("Captain's Log");
    cy.contains("New");
  });

  describe("The form", () => {
    // pay attention the capitalization!
    // cypress needs accuracy to find elements on the DOM\

    it("has a form with correct labels and fields", () => {
      // for this label/input use htmlFor/id: 'name'
      cy.get("label").contains("Captain's Name");
      cy.get("#captainName").should("have.attr", "type", "text");

      // for this label/input use htmlFor/id: 'title'
      cy.get("label").contains("Title");
      cy.get("#title").should("have.attr", "type", "text");

      // for this label/input use htmlFor/id: 'post'
      cy.get("label").contains("Post");
      cy.get("form > textarea").should("have.attr", "id", "post");

      // for this label/input use htmlFor/id: 'daysSinceLastCrisis'
      cy.get("label").contains("Days Since Last Crisis");
      cy.get("#daysSinceLastCrisis").should("have.attr", "type", "number");

      // for this label/input use htmlFor/id: 'mistakesWereMadeToday'
      cy.get("label").contains("Mistakes were made today");
      cy.get("#mistakesWereMadeToday").should("have.attr", "type", "checkbox");
    });

    it("can create a log", () => {
      cy.get("#captainName").type("Mashu");
      cy.get("#title").type("Testing Voyages");
      cy.get("form > textarea").type(
        "T'was a hard day of writing tests, but remain calm lets!"
      );
      it("can change the checkbox to checked'", () => {
        cy.get("#mistakesWereMadeToday").check();
      });
      it("can change the checkbox to unchecked'", () => {
        cy.get("#mistakesWereMadeToday").uncheck();
      });
      cy.get("form").submit();
      cy.url().should("eq", "http://localhost:3000/logs");
      cy.contains("Testing Voyages");
    });
  });
});
