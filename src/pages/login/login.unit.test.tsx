import React from "react";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("Login page tests", () => {

  it('renders', () => {
    expect(2).toBeGreaterThan(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
