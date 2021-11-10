#  Grid Fibonacci Game


 
This app is a Fibonacci game on a table. You should on each that you want and you can create a Fibonacci pattern.
When you click on each cell you should expect to see the cell increase the number by 1 and change the background color to Yellow.
If you find 5 successful Fibonacci patterns, the cells' backgrounds will change to Green, then after 2 seconds they will be empty and will change to 0.

## Demo

You can see the demo here:

https://grid-fibonacci-game.vercel.app/

## Installation

I started to work on this project with this package that I made before.

https://www.npmjs.com/package/@farnam/create-react-ts-tailwind-starter

You can use it like:
```bash
npx @farnam/create-react-ts-tailwind-starter name
```
It will clone the repo and package files and install them.

npm:

```bash
npm install
```

yarn:

```bash
yarn
```

## Deployment

To Start this project run

npm:

```bash
npm run start
```

yarn:

```bash
yarn start
```

To build the project run:

npm:

```bash
npm run build
```

yarn:

```bash
yarn build
```

## Testing

npm:

```bash
npm run test
```

yarn:

```bash
yarn test
```
 
## Tech Stack

**Client:** React, Typescript, TailwindCSS

**Tests:** React testing library, Enzyme



## Tasks list
- [x] Create function for create a matrix
- [x] Enable reset the game
- [x] Change cell backgroud color to Yellow when click
- [x] Change 5 cells backgroudcolors to Green when a Fibonacci pattern found
- [x] Clean the cells after finding the pattern
- [x] Create function to check if a pattern found from left side

Some more options could make this app better but I had no time for that, I can make them in the future.

- [ ] Check the pattern from right, top and bottom side
- [ ] Change right, top and bottom side cells background colors to Yellow, Green
- [ ] Create a score board and add score when a pattern found
- [ ] Change styles with state
- [ ] Find a better solution and algorithm for checking the pattern in the table
 
