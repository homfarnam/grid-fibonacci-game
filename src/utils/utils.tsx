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
      ? row2.map((col2) => +col2 + 1)
      : row2.map((col2, j: number) => (j === col ? +col2 + 1 : +col2))
  )
}

const changeBgColor = (
  arr: number[][],
  row: number,
  col: number,
  color?: string
): void => {
  const cell = document.getElementById(`cell-${row * 10 + col}`)

  if (cell && !color) {
    const prevClasses = cell.className
    if (!prevClasses.includes("fade-colors")) {
      cell.className = prevClasses + " fade-colors-yellow"
    }
  } else if (cell && color) {
    let prevClasses = cell.className
    prevClasses = prevClasses.replace("fade-colors-yellow", "")

    if (!prevClasses.includes("fade-colors-yellow")) {
      cell.className = prevClasses + " fade-colors-green"
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

  return arr
}

const checkFib = ({
  col_start,
  col_end,
  row,
  table,
}: {
  col_start: number
  col_end: number
  row: number
  table: number[][]
}) => {
  if (
    col_start < 0 ||
    col_end < 0 ||
    !(
      table[row][col_start] &&
      table[row][col_start - 1] &&
      table[row][col_start - 2] &&
      table[row][col_start - 3] &&
      table[row][col_start - 4]
    )
  ) {
    return false
  }

  return (
    table[row][col_start] - table[row][col_start - 1] ===
      table[row][col_start - 2] &&
    table[row][col_start - 2] - table[row][col_start - 3] ===
      table[row][col_start - 4]
  )
}

export { matrix, incrementArray, colorize, changeBgColor, checkFib }
