import React from "react"
import { cleanup } from "@testing-library/react"
import Enzyme, { shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import { Button } from "components"
import App from "App"

Enzyme.configure({ adapter: new Adapter() })
afterEach(cleanup)

describe("Button component tests", () => {
  test("return a button with a text ", () => {
    const wrapper = shallow(<App />).find(Button)

    expect(wrapper.find(Button).prop("text")).toBe("Reset the game")
  })
})
