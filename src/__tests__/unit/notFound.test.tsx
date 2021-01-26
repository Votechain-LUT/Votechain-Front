import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "../../pages/notFound/notFound.component";

let body: RenderResult;

describe("Not found page", () => {
  beforeEach(() => {
    body = render(<Router><NotFoundPage/></Router>)
  });
  it("show not found message", () => {
    expect(body.getByText("404 :(")).toBeInTheDocument();
  });
  it("should have link to homepage", () => {
    expect(body.getByText("Wróć do strony głównej").closest('a')).toHaveAttribute('href', "/");
  })
});
