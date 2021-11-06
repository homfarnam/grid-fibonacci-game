import React, { useEffect, useState } from "react"
import { colorize, incrementArray, matrix } from "utils/utils"

const App: React.FC = () => {
  const [mainTable, setMainTable] = useState<number[][]>(matrix(10, 10, null))
  const [clickedCell, setClickedCell] = useState<{
    row: number
    col: number
  }>({
    row: 0,
    col: 0,
  })

  const clickCell = (
    e: React.MouseEvent<HTMLTableCellElement>,
    row: number,
    col: number
  ) => {
    setMainTable((prev) => colorize(incrementArray(prev, row, col), row, col))
    setClickedCell({ row, col })
  }

  const resetGame = () => {
    setMainTable(matrix(10, 10, null))

    const cells = document.querySelectorAll("td") as NodeListOf<HTMLElement>

    cells.forEach((cell) => {
      cell.className = "p-5 border cursor-pointer cell"
    })
  }

  useEffect(() => {
    if (mainTable) {
      const cells = document.querySelectorAll("td") as NodeListOf<HTMLElement>

      let valid = true
      for (let i = 0; i < mainTable.length; i++) {
        for (let j = 0; j < mainTable.length; j++) {
          for (let s = 0; s <= 4; s++) {
            if (
              mainTable[i][j] !==
              mainTable?.[i]?.[j - s + 1] + mainTable?.[i]?.[j - s + 2]
            ) {
              console.log(
                "mainTable[i][j]: ",
                { row: i, col: j },
                mainTable[i][j]
              )
              valid = false
              break
            }
          }

          if (valid) {
            console.log("valid: ", valid)
            // add css class to these 5 cells and remove values after 5 second
            // setTimeout(() => {
            //   const cells = document.querySelectorAll(
            //     `.cell-${clickedCell.row * 10 + clickedCell.col}`
            //   ) as NodeListOf<HTMLElement>

            //   console.log("cells 3434: ", cells)

            //   // cells.forEach((cell) => {
            //   //   cell.className = cell.className.replace(
            //   //     "fade-colors",
            //   //     "fade-colors-green"
            //   //   )
            //   // })
            // }, 5000)
          }
        }
      }
    }
  }, [mainTable, clickedCell])

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
              {row.map((cell, j: number) => (
                <td
                  className="p-5 border cursor-pointer cell"
                  key={j}
                  id={`cell-${i * 10 + j}`}
                  onClick={(e) => {
                    clickCell(e, i, j)
                  }}
                >
                  {mainTable[i][j]}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default App
