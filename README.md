This is a simple Tic Tac Toe game built with React, where a player competes against an AI opponent.

Features:

- Play against AI: The AI plays optimally, making the game challenging.
- Winning and Tie Detection: Displays the winner or a tie at the end of the game.
- Reset Functionality: Restart the game at any time.
- Testability: Elements are tagged with `data-testid` attributes for seamless Cypress testing.

Installation and Setup

1. Clone the repository:
   https://github.com/viktorijabrun/QA-Portfolio.git
2. Navigate to correct folder through terminal:
   cd .\react-app-test\
3. Install dependencies:
   npm install
4. Run the React app:
   npm run dev
5. Ensure the app is running on http://localhost:5173.
6. Open second terminal, navigate to correct folder, open cypress:
   cd .\react-app-test\
   npm run cypress-ui
