# Wordle Clone

This project is a simple clone of the popular word game Wordle, built with React. The goal is to guess the correct word within six attempts, with feedback provided for each guess in the form of colored tiles indicating when letters match or occupy the correct position.

## Features

- **Color Feedback**: Tiles change colors to indicate correct letters and positions.
- **Responsive Design**: Play on any device, from desktops to mobile phones.

## Technologies Used

- React.js
- Vite as the build tool

## Live demo - underconstruction

https://ethan-ramos11.github.io/wordle-clone/

## Project Setup

To get the project up and running on your local machine, follow these steps:

```
   git clone https://github.com/Ethan-Ramos11/wordle-clone.git
   cd wordle-clone
   npm install
   npm run dev
```

## How to Play

- Start the game, and you'll see a 5x6 grid.
- Type your guess using the keyboard and press enter to submit.
- After each guess, the color of the tiles will change to show how close your guess was to the word:
- **Green**: Letter is in the correct spot.
- **Yellow**: Letter is in the word but in the wrong spot.
- **Red**: Letter is not in the word in any spot.
- You have six tries to guess the correct word.
- At the end, it will tell you to try again or congratulate you depending on whether you got it correct or not.
- Hit reset to play again.

## Ideas for Enhancements

- Attach the project to an API to randomly generate words instead of just the 7 words I have added.
- Have that same API do input validation to ensure the user cannot enter random -words.
- Have a daily word feature where a random word gets chosen that all users can play.

Don't forget to give the project a star! Thanks again!

## License

Distributed under the MIT License. See `LICENSE` for more information.

Project Link: [https://github.com/Ethan-Ramos11/wordle-clone](https://github.com/Ethan-Ramos11/wordle-clone)
