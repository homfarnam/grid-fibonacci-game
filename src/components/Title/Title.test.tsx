import React from "react"
import { cleanup } from "@testing-library/react"
import Enzyme, { shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import { Title } from "components"
import App from "App"

Enzyme.configure({ adapter: new Adapter() })
afterEach(cleanup)

describe("Title component tests", () => {
  test("return div with h1 with text ", () => {
    const wrapper = shallow(<App />).find(Title)

    expect(wrapper.find(Title).prop("text")).toBe("Grid Fibonacci Game")
  })
})
