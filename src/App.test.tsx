import React from "react"

import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "App"

describe("Click tests", () => {
  test("click on first and expect to be 1 in cell", async () => {
    render(<App />)
    const cell = screen.getByTestId("cell-0-0")

    userEvent.click(cell)

    await waitFor(() => {
      expect(cell.innerHTML).toBe("1")
    })
  })
})
