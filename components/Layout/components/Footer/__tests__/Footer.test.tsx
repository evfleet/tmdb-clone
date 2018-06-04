import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";

import Footer from "../Footer";

describe("Footer component renders its content correctly", () => {
  it("renders without error", () => {
    const { getByText, getByTestId, container } = render(<Footer />);
  });
});
