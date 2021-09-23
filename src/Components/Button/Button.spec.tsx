import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
describe("Test functionality Button component", () => {
  test("test callback passed to the function was called", () => {
    const handleClick = jest.fn();
    render(
      <Button type="button" onClick={handleClick} size="normal">
        Button
      </Button>
    );
    const button = screen.getByText("Button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("test render archon element in component, and assign style for element", () => {
    const fakeUrl = "fake";
    render(
      <Button size="small" type={{ element: "a", href: fakeUrl }}>
        Archon
      </Button>,
      { wrapper: MemoryRouter }
    );
    const button = screen.getByRole("link");
    userEvent.click(button);
    expect(button.className).toBe("button smallButton");
    expect(button.closest("a")?.href).toBe(window.location.href + fakeUrl);
  });
});
