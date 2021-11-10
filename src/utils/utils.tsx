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

const changeBgColor = (row: number, col: number, color?: string): void => {
  const cell = document.getElementById(`cell-${row}-${col}`)

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
}

const colorize = (arr: number[][], row: number, col: number): number[][] => {
  changeBgColor(row, col)

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
}): boolean => {
  const fibSeq = table[row].slice(col_start - 4, 1 + col_start)

  if (
    col_start < 0 ||
    col_end < 0 ||
    !(fibSeq[0] && fibSeq[1] && fibSeq[2] && fibSeq[3] && fibSeq[4])
  ) {
    return false
  }

  if (fibSeq[0] === fibSeq[1] && fibSeq[0] !== 1) {
    return false
  }

  return (
    fibSeq[4] - fibSeq[3] === fibSeq[2] &&
    fibSeq[3] - fibSeq[2] === fibSeq[1] &&
    fibSeq[2] - fibSeq[1] === fibSeq[0]
  )
}

const removeCellValues = ({
  col_start,
  col_end,
  row,
  setMainTable,
}: {
  col_start: number
  col_end: number
  row: number
  setMainTable: React.Dispatch<React.SetStateAction<number[][]>>
}): void => {
  for (let i = col_start; i >= col_end; i--) {
    setMainTable((prev) => {
      const newTable = [...prev]
      newTable[row][i] = 0
      return newTable
    })
  }

  const cells = document.querySelectorAll("td") as NodeListOf<HTMLElement>

  cells.forEach((cell) => {
    let prevClasses = cell.className
    prevClasses = prevClasses.replace("fade-colors-green", "")

    cell.className = prevClasses
  })
}

export {
  matrix,
  incrementArray,
  colorize,
  changeBgColor,
  checkFib,
  removeCellValues,
}
