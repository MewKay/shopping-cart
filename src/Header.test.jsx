import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

describe("Header component", () => {
  it("renders the brand name and the nav links", () => {
    const { container } = render(<Header />, { wrapper: BrowserRouter });

    expect(container).toMatchSnapshot();
  });
});
