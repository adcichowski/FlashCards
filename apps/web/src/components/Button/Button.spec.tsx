import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";
import userEvent from "@testing-library/user-event";
describe("Test functionality Button component", () => {
  test("callback passed to the function was called", () => {
    const handleClick = jest.fn();
    render(
      <Button type="button" onClick={handleClick} size="normal">
        Button
      </Button>,
    );
    const button = screen.getByText("Button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("render archon element in component, and style assign for element", () => {
    const fakeUrl = "fake";
    render(<Button size="small">Archon</Button>);
    const button = screen.getByRole("link");
    userEvent.click(button);
    expect(button.className).toHaveClass("button smallButton");
    expect(button.closest("a")?.href).toBe(window.location.href + fakeUrl);
  });
});
