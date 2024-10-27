import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Home from "./Home";

describe("Home component", () => {
  it("renders welcome title, store description and going to store button", () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });
});
