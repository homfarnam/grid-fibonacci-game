import React, { useEffect, useState } from "react"
import {
  changeBgColor,
  checkFib,
  colorize,
  incrementArray,
  matrix,
  removeCellValues,
} from "utils/utils"
import { Button, Title } from "components"

interface AppProps {
  defaultSize?: number
}

const App: React.FC<AppProps> = ({ defaultSize = 50 }) => {
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
      cell.className = "p-10 border cursor-pointer"
    })
  }

  useEffect(() => {
    const cells: {
      row: number
      col_start: number
      col_end: number
      setMainTable: React.Dispatch<React.SetStateAction<number[][]>>
    }[] = []

    for (let i = 0; i < mainTable.length; i++) {
      for (let j = 0; j < mainTable.length; j++) {
        if (
          checkFib({
            row: i,
            col_start: j,
            col_end: j - 4,
            table: mainTable,
          })
        ) {
          console.log("here : ", true)
          for (let k = 4; k >= 0; k--) {
            changeBgColor(i, j - k, "green")
          }
          cells.push({
            row: i,
            col_start: j,
            col_end: j - 4,
            setMainTable,
          })

          // setTimeout(() => {
          //   removeCellValues({
          //     row: i,
          //     col_start: j,
          //     col_end: j - 4,
          //     setMainTable,
          //   })
          // }, 2000)
        }
      }
    }
    setTimeout(() => cells.forEach(removeCellValues), 2000)
  }, [mainTable])

  return (
    <div className="py-10 main">
      <div className="container flex flex-col justify-center items-center mx-auto w-full">
        <Title
          text="Grid Fibonacci Game"
          className="my-10 font-mono text-5xl"
        />
        <Button
          id="reset"
          text="Reset the game"
          className="my-10 mx-5 text-3xl border"
          onClick={resetGame}
          variant="white"
        />
      </div>

      <div className="flex justify-center items-center my-14 w-full h-full">
        <table className="text-white border">
          <tbody>
            {mainTable.map((row, i: number) => (
              <tr key={i} className="p-3">
                {row.map((_cell, j: number) => {
                  return (
                    <td
                      className="p-10 border cursor-pointer"
                      key={i * defaultSize + j}
                      id={`cell-${i}-${j}`}
                      data-testid={`cell-${i}-${j}`}
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
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
