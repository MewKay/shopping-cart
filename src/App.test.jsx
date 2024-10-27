import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./Home", () => ({ default: () => <>This is home</> }));

describe("App component", () => {
  it("should render Home by default", () => {
    render(<App />);

    const headerText = screen.getByText("This is home");

    expect(headerText).toBeInTheDocument();
  });
});
