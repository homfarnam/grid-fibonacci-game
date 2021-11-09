import React from "react"

import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "App"
import { incrementArray, matrix } from "./utils"

describe("Utils tests", () => {
  const table = matrix(10, 10, 0)

  test("Pass number to matrix function and expect to create a matrix with rows and cols", () => {
    table.forEach((row) => {
      expect(row.length).toBe(10)
    })
    expect(table).toHaveLength(10)
  })

  test("Pass cell row and col to function and expect to increase the row and col values", () => {
    render(<App />)

    const increment = incrementArray(table, 0, 0)

    expect(increment).toEqual([
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ])
  })
})
