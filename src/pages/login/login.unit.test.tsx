import React from "react";
import { shallow } from "enzyme";
import LoginPage from "./login.component";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("Login page tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper.find(".headerTitle").text()).toBe("System Votechain:");
  });
});
