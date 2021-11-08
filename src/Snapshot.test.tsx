import React from "react"
import { cleanup } from "@testing-library/react"
import Enzyme from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import toJson from "enzyme-to-json"
import App from "./App"

Enzyme.configure({ adapter: new Adapter() })
afterEach(cleanup)

describe("snapshot test", () => {
  test("snapshot test Home page", () => {
    const wrapper = Enzyme.shallow(<App />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test("test click on one cell and make it yellow", () => {
    const wrapper = Enzyme.shallow(<App />)

    wrapper.find("#cell-0-0").simulate("click")

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test("test click on 5 cell and make it green and expect to be empty", () => {
    const wrapper = Enzyme.shallow(<App />)

    wrapper.find("#cell-0-0").simulate("click")
    wrapper.find("#cell-1-2").simulate("click")
    wrapper.find("#cell-1-3").simulate("click")
    wrapper.find("#cell-1-3").simulate("click")
    wrapper.find("#cell-1-4").simulate("click")
    wrapper.find("#cell-1-4").simulate("click")
    wrapper.find("#cell-1-4").simulate("click")
    wrapper.find("#cell-1-4").simulate("click")

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test("test click on reset button and expect empty table ", () => {
    const wrapper = Enzyme.shallow(<App />)

    wrapper.find("#cell-0-0").simulate("click")

    wrapper.find("#reset").simulate("click")

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test("expect the game works after reset ", () => {
    const wrapper = Enzyme.shallow(<App />)

    wrapper.find("#cell-0-0").simulate("click")

    wrapper.find("#reset").simulate("click")

    wrapper.find("#cell-0-1").simulate("click")

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
