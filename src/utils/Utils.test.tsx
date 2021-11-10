import React from "react"
import { render, screen } from "@testing-library/react"
import App from "App"
import { changeBgColor, checkFib, incrementArray, matrix } from "./utils"

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

  test("Pass cell row and col with no color to function and expect to change background color to Yellow", () => {
    render(<App />)
    const cell = screen.getByTestId("cell-0-0")

    changeBgColor(0, 0)

    expect(cell).toHaveClass("fade-colors-yellow")
  })

  test("Pass cell row and col with color to function and expect to change background color to Yellow", () => {
    render(<App />)
    const cell = screen.getByTestId("cell-0-0")

    changeBgColor(0, 0, "green")

    expect(cell).toHaveClass("fade-colors-green")
  })

  test("Pass col start and col end and row to function and expect to return is it a Fibonacci pattern or not  ", async () => {
    const tableArray = [
      [1, 1, 2, 3, 5, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    const CheckFibonacci = checkFib({
      row: 0,
      col_start: 4,
      col_end: 0,
      table: tableArray,
    })

    expect(CheckFibonacci).toBeTruthy()
  })

  test("Pass wrong col start and col end and row to function and expect to return false", async () => {
    const tableArray = [
      [1, 1, 2, 3, 5, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    const CheckFibonacci = checkFib({
      row: 2,
      col_start: 4,
      col_end: 8,
      table: tableArray,
    })

    expect(CheckFibonacci).toBeFalsy()
  })
})
