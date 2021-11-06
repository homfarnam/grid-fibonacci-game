import React, { useEffect, useState } from "react"
import {
  changeBgColor,
  checkFib,
  colorize,
  incrementArray,
  matrix,
} from "utils/utils"

const App: React.FC = () => {
  const [mainTable, setMainTable] = useState<number[][]>(matrix(10, 10, 0))

  const clickCell = (
    e: React.MouseEvent<HTMLTableCellElement>,
    row: number,
    col: number
  ) => {
    setMainTable((prev) => colorize(incrementArray(prev, row, col), row, col))
  }

  const resetGame = () => {
    setMainTable(matrix(10, 10, 0))

    const cells = document.querySelectorAll("td") as NodeListOf<HTMLElement>

    cells.forEach((cell) => {
      cell.className = "p-5 border cursor-pointer cell"
    })
  }

  const removeCellValues = ({
    col_start,
    col_end,
    row,
  }: {
    col_start: number
    col_end: number
    row: number
  }) => {
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

  useEffect(() => {
    for (let i = 0; i < mainTable.length; i++) {
      for (let j = 0; j < mainTable.length; j++) {
        if (
          checkFib({ row: i, col_start: j, col_end: j - 4, table: mainTable })
        ) {
          for (let k = 4; k >= 0; k--) {
            changeBgColor(mainTable, i, j - k, "green")
          }

          setTimeout(() => {
            removeCellValues({ row: i, col_start: j, col_end: j - 4 })
          }, 2000)
        }
      }
    }
  }, [mainTable])

  return (
    <div className="w-full min-h-screen text-white bg-black">
      <div className="container flex justify-center items-center mx-auto w-full">
        <button className="p-3 my-10 mx-5 border" onClick={resetGame}>
          Reset the game
        </button>
      </div>

      <div className="flex justify-center items-center my-10 w-full h-auto">
        <table className="text-white border">
          {mainTable.map((row, i: number) => (
            <tr key={i} className="p-3">
              {row.map((cell, j: number) => {
                checkFib({
                  row: i,
                  col_start: j,
                  col_end: j - 4,
                  table: mainTable,
                })
                return (
                  <td
                    className="p-5 border cursor-pointer cell"
                    key={i * 10 + j}
                    id={`cell-${i * 10 + j}`}
                    onClick={(e) => {
                      clickCell(e, i, j)
                    }}
                  >
                    {mainTable[i][j]}
                  </td>
                )
              })}
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default App
