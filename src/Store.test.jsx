import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Store from "./Store";

describe("Store component", () => {
  it("renders correctly", () => {
    const { container } = render(<Store />, { wrapper: BrowserRouter });

    expect(container).toMatchSnapshot();
  });
});
