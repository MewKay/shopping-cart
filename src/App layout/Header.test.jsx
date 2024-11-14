import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

//Component props
const handleShowCartModal = vi.fn();

describe("Header component", () => {
  it("renders the brand name and the nav links", () => {
    const { container } = render(
      <Header handleShowCartModal={handleShowCartModal} />,
      { wrapper: MemoryRouter }
    );

    expect(container).toMatchSnapshot();
  });
});
