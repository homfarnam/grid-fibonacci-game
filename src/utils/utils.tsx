const matrix = (
  rows: number,
  cols: number,
  defaultValue: number | null
): number[][] => {
  return Array.from({ length: rows }).fill(
    Array.from({ length: cols }).fill(defaultValue)
  ) as Array<Array<number>>
}

const incrementArray = (
  arr: number[][],
  row: number,
  col: number
): number[][] => {
  return arr.map((row2, i: number) =>
    i === row
      ? row2.map((col2) => col2 + 1)
      : row2.map((col2, j: number) => (j === col ? col2 + 1 : col2))
  )
}

const changeBgColor = (arr: number[][], row: number, col: number): void => {
  const cell = document.getElementById(`cell-${row * 10 + col}`)

  if (cell) {
    const prevClasses = cell.className
    if (!prevClasses.includes("fade-colors")) {
      cell.className = prevClasses + " fade-colors-yellow"
    }
  }

  // check all 5 previous cells values with current cell
  let valid = true
  for (let i = 0; i <= 4; i++) {
    if (
      arr[row][col - i] !==
      arr?.[row]?.[col - i + 1] + arr?.[row]?.[col - i + 2]
    ) {
      valid = false
      break
    }
  }

  // ||
  //     arr[row][col + i] !==
  //       arr?.[row]?.[col + i + 1] + arr?.[row]?.[col + i + 2] ||
  //     arr[row - i][col] !==
  //       arr?.[row - i + 1]?.[col] + arr?.[row - i + 2]?.[col] ||
  //     arr[row + i][col] !==
  //       arr?.[row + i + 1]?.[col] + arr?.[row + i + 2]?.[col]

  if (valid) {
    console.log("current cell: ", { row, col }, arr[row][col])
    // add css class to these 5 cells and remove values after 5 second
    setTimeout(() => {
      const cells = document.querySelectorAll(
        `.cell-${row * 10 + col}`
      ) as NodeListOf<HTMLElement>
      console.log("cells: ", cells)
      cells.forEach((cell) => {
        cell.className = cell.className.replace(
          "fade-colors",
          "fade-colors-green"
        )
      })
    }, 5000)
  }
}

const colorize = (arr: number[][], row: number, col: number): number[][] => {
  // create function for change bgcolor of current cell
  changeBgColor(arr, row, col)

  if (
    arr[row][col] === arr?.[row]?.[col - 1] + arr?.[row]?.[col - 2] ||
    arr[row][col] === arr?.[row]?.[col + 1] + arr?.[row]?.[col + 2] ||
    arr[row][col] === arr?.[row + 1]?.[col] + arr?.[row + 2]?.[col] ||
    arr[row][col] === arr?.[row - 1]?.[col] + arr?.[row - 2]?.[col]
  ) {
    // arr[row][col] = 1
    // colorize(arr, row, col - 1)
    // colorize(arr, row, col - 2)
    console.log({ row, col }, "bingo 1:‌ ", arr[row][col])
  }

  return arr
}

export { matrix, incrementArray, colorize, changeBgColor }
