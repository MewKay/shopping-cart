import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

vi.mock("./Header", () => ({ default: () => <>This is header</> }));

describe("Layout component", () => {
  it("renders Header", () => {
    render(<Layout />);

    const headerText = screen.getByText("This is header");

    expect(headerText).toBeInTheDocument();
  });
});
