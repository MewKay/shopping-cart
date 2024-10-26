import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  it("renders the brand name and the nav links", () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
