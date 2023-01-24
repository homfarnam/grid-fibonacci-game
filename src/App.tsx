import React, { useEffect, useState } from "react"
import {
  changeBgColor,
  checkFib,
  colorize,
  incrementCells,
  matrix,
  memoizedCheckFib,
  removeCellValues,
} from "utils/utils"
import { Button, Title } from "components"

interface AppProps {
  defaultSize?: number
}

const App = ({ defaultSize = 10 }: AppProps): JSX.Element => {
  const [mainTable, setMainTable] = useState<number[][]>(
    matrix(defaultSize, defaultSize, 0)
  )

  const clickCell = (row: number, col: number) => {
    setMainTable((prev) => colorize(incrementCells(prev, row, col), row, col))
  }

  const resetGame = () => {
    setMainTable(matrix(defaultSize, defaultSize, 0))

    const cells = document.querySelectorAll("td") as NodeListOf<HTMLElement>

    cells.forEach((cell) => {
      cell.className = "p-10 border cursor-pointer"
    })
  }

  // useEffect(() => {
  //   const cells: {
  //     row: number
  //     col_start: number
  //     col_end: number
  //     setMainTable: React.Dispatch<React.SetStateAction<number[][]>>
  //   }[] = []

  //   for (let i = 0; i < mainTable.length; i++) {
  //     for (let j = 0; j < mainTable.length; j++) {
  //       if (
  //         checkFib({
  //           row: i,
  //           col_start: j,
  //           col_end: j - 4,
  //           table: mainTable,
  //         })
  //       ) {
  //         console.log("here : ", true)
  //         for (let k = 4; k >= 0; k--) {
  //           changeBgColor(i, j - k, "green")
  //         }
  //         cells.push({
  //           row: i,
  //           col_start: j,
  //           col_end: j - 4,
  //           setMainTable,
  //         })
  //       }
  //     }
  //   }
  //   setTimeout(() => cells.forEach(removeCellValues), 2000)
  // }, [mainTable])

  useEffect(() => {
    const cells: {
      row: number
      col_start: number
      col_end: number
      setMainTable: React.Dispatch<React.SetStateAction<number[][]>>
    }[] = []

    // Use .map() method to iterate over mainTable and memoizedCheckFib for each element
    const fibCells = mainTable.map((row, i) =>
      row.map((col, j) =>
        // checkFib({ row: i, col_start: j, col_end: j - 4, table: mainTable })
        memoizedCheckFib(mainTable)({ row: i, col_start: j })
      )
    )

    // Use .filter() method to find all fibonacci cells
    fibCells.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col) {
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
        }
      })
    })
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
        <table
          className="text-white border"
          onClick={(e) => {
            const target = e.target as HTMLElement
            if (target.id.includes("cell")) {
              const [row, col] = target.id.split("-").slice(1)

              clickCell(+row, +col)
            }
          }}
        >
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
