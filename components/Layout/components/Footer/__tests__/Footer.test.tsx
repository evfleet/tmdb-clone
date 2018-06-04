import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";

import Footer from "../Footer";

describe("Footer", () => {
  it("renders the proper TMDb attribution text", () => {
    const { queryByText } = render(<Footer />);
    const attribution = queryByText(
      "This product uses the TMDb API but is not endorsed or certified by TMDb."
    );

    expect(attribution).toBeInTheDOM();
  });
});
