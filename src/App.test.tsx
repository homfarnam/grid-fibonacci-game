import React from "react"

import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "App"

describe("Click tests", () => {
  test("click on first cell and expect to be 1 in cell", async () => {
    render(<App />)
    const cell = screen.getByTestId("cell-0-0")

    userEvent.click(cell)

    await waitFor(() => {
      expect(cell.innerHTML).toBe("1")
    })
  })

  test("click on some cells and expect to get a Fibonacci pattern in first row", async () => {
    render(<App />)
    const cell = screen.getByTestId("cell-0-0")
    const cell2 = screen.getByTestId("cell-1-2")
    const cell3 = screen.getByTestId("cell-1-3")
    const cell4 = screen.getByTestId("cell-1-3")
    const cell5 = screen.getByTestId("cell-1-4")
    const cell6 = screen.getByTestId("cell-1-4")
    const cell7 = screen.getByTestId("cell-1-4")
    const cell8 = screen.getByTestId("cell-1-4")

    userEvent.click(cell)
    userEvent.click(cell2)
    userEvent.click(cell3)
    userEvent.click(cell4)
    userEvent.click(cell5)
    userEvent.click(cell6)
    userEvent.click(cell7)
    userEvent.click(cell8)

    await waitFor(() => {
      expect(screen.getByTestId("cell-0-0").innerHTML).toBe("1")
      expect(screen.getByTestId("cell-0-1").innerHTML).toBe("1")
      expect(screen.getByTestId("cell-0-2").innerHTML).toBe("2")
      expect(screen.getByTestId("cell-0-3").innerHTML).toBe("3")
      expect(screen.getByTestId("cell-0-4").innerHTML).toBe("5")
    })

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByTestId("cell-0-0").innerHTML).toBe("0")
        expect(screen.getByTestId("cell-0-1").innerHTML).toBe("0")
        expect(screen.getByTestId("cell-0-2").innerHTML).toBe("0")
        expect(screen.getByTestId("cell-0-3").innerHTML).toBe("0")
        expect(screen.getByTestId("cell-0-4").innerHTML).toBe("0")
      }, 2000)
    })
  })
})
