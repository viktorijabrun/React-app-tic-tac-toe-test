describe("Tic Tac Toe app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  describe("Elements should be visible", () => {
    it("Renders default elements on the screen", () => {
      //Ensure that title is visible
      cy.contains("h1", "Tic Tac Toe").should("be.visible");
      //Game board should be visible
      cy.get("[data-testid='board']").should("be.visible");
      //Ensure that status message is visible and player X starts first
      cy.contains(
        "[data-testid='status-message']",
        "Next Turn: X (You)"
      ).should("be.visible");
      //Should be 9 cells and all of them should be empty
      cy.get(".cell").should("have.length", 9).should("be.empty");
      //Reset button is visible
      cy.get('[data-testid="reset-button"]').should("be.visible");
    });
  });

  describe("Player X turn", () => {
    it("Ensure a cell cannot be clicked twice", () => {
      // Make a move
      cy.get("[data-testid='cell-0']").click();
      //AI move
      cy.wait(500);
      // Click on the same cell, check if cell is not empty
      cy.get("[data-testid='cell-0']").click().should("contain", "X");
      //Status message
      cy.contains(
        "[data-testid='status-message']",
        "Next Turn: X (You)"
      ).should("be.visible");
    });
  });

  describe("Player O turn", () => {
    it("Verify the AI takes its turn after the player", () => {
      // Make a move
      cy.get("[data-testid='cell-0']").click();
      //Status message is correct:"Next Turn: O (AI)".
      cy.contains("[data-testid='status-message']", "Next Turn: O (AI)").should(
        "be.visible"
      );
    });
  });

  describe("Winning and Tie conditions", () => {
    it("The games ends in victory", () => {
      const playerMove = () => {
        cy.get('[data-testid^="cell"]').each(($cell, index) => {
          if ($cell.text() === "") {
            cy.wrap($cell).click();
            return false;
          }
        });
      };

      // Simulate the game: Player moves, then AI moves, repeat
      for (let i = 0; i < 5; i++) {
        playerMove(); // Player's turn
        cy.wait(500);
      }

      //Verify that status message contains "Winner: O"
      cy.contains("[data-testid='status-message']", "Winner: O").should(
        "be.visible"
      );
    });

    it("The game ends in a draw.", () => {
      cy.get("[data-testid='cell-4']").click(); //Player X makes a move
      //Player O (AI) makes a move
      cy.wait(500);
      //Player X makes a move
      cy.get("[data-testid='cell-2']").click();
      //Player O (AI) makes a move
      cy.wait(500);
      //Player X makes a move
      cy.get("[data-testid='cell-3']").click();
      //Player O (AI) makes a move
      cy.wait(500);
      //Player X makes a move
      cy.get("[data-testid='cell-7']").click();
      //Player O (AI) makes a move
      cy.wait(500);
      //Player X makes a move
      cy.get("[data-testid='cell-8']").click();

      //Verify that status message "It's a Tie!" is visible
      cy.contains("[data-testid='status-message']", "It's a Tie!").should(
        "be.visible"
      );
    });
  });

  describe("Reset functionality", () => {
    it("Should reset game and status message", () => {
      //Make a move
      cy.get("[data-testid='cell-2']").click();
      //AI makes a move
      cy.wait(500);
      // Press "Reset Game" button
      cy.get('[data-testid="reset-button"]').click();
      //Verify that board squares is empty
      cy.get(".cell").should("be.empty");
      //Ensure that status message is visible and player X starts first
      cy.contains(
        "[data-testid='status-message']",
        "Next Turn: X (You)"
      ).should("be.visible");
    });
  });
});
