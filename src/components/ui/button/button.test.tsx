import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("Корректная отрисовка кнопки с текстом", () => {
    const button = renderer.create(<Button text="Добавить" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки без текста", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка заблокированной кнопки", () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки с индикацией загрузки", () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректность вызова колбека при клике на кнопку", () => {
    window.alert = jest.fn();
    render(<Button text="Добавить" onClick={() => alert("Тест!")} />);
    const button = screen.getByText("Добавить");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("Тест!");
  });
});
