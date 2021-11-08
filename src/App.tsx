import React, { useEffect, useState } from "react"
import {
  changeBgColor,
  checkFib,
  colorize,
  incrementArray,
  matrix,
  removeCellValues,
} from "utils/utils"
import { Button } from "components"

interface AppProps {
  defaultSize?: number
}

const App: React.FC<AppProps> = ({ defaultSize = 10 }) => {
  const [mainTable, setMainTable] = useState<number[][]>(
    matrix(defaultSize, defaultSize, 0)
  )

  const clickCell = (
    e: React.MouseEvent<HTMLTableCellElement>,
    row: number,
    col: number
  ) => {
    setMainTable((prev) => colorize(incrementArray(prev, row, col), row, col))
  }

  const resetGame = () => {
    setMainTable(matrix(defaultSize, defaultSize, 0))

    const cells = document.querySelectorAll("td") as NodeListOf<HTMLElement>

    cells.forEach((cell) => {
      cell.className = "p-5 border cursor-pointer cell"
    })
  }

  useEffect(() => {
    for (let i = 0; i < mainTable.length; i++) {
      for (let j = 0; j < mainTable.length; j++) {
        if (
          checkFib({ row: i, col_start: j, col_end: j - 4, table: mainTable })
        ) {
          for (let k = 4; k >= 0; k--) {
            changeBgColor(i, j - k, "green")
          }

          setTimeout(() => {
            removeCellValues({
              row: i,
              col_start: j,
              col_end: j - 4,
              setMainTable,
            })
          }, 2000)
        }
      }
    }
  }, [mainTable])

  return (
    <div className="w-full h-full min-h-screen text-white bg-black">
      <div className="container flex justify-center items-center mx-auto w-full">
        <Button
          id="reset"
          text="Reset the game"
          className="p-3 my-10 mx-5 border"
          onClick={resetGame}
          variant="white"
        />
      </div>

      <div className="flex justify-center items-center my-10 w-full h-full">
        <table className="text-white border">
          {mainTable.map((row, i: number) => (
            <tr key={i} className="p-3">
              {row.map((_cell, j: number) => {
                checkFib({
                  row: i,
                  col_start: j,
                  col_end: j - 4,
                  table: mainTable,
                })
                return (
                  <td
                    className="p-5 border cursor-pointer cell w-"
                    key={i * defaultSize + j}
                    id={`cell-${i}-${j}`}
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
