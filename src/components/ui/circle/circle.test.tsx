import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

describe("Button", () => {
  it("Корректная отрисовка кнопки без буквы", () => {
    const button = renderer.create(<Circle />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки с буквами", () => {
    const button = renderer.create(<Circle letter="ABS" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки с head", () => {
    const button = renderer.create(<Circle head="head" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки с react-элементом в head", () => {
    const button = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки с tail", () => {
    const button = renderer.create(<Circle tail="tail" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки с react-элементом в tail", () => {
    const button = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки с index", () => {
    const button = renderer.create(<Circle index={0} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки с пропом isSmall ===  true", () => {
    const button = renderer.create(<Circle isSmall />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки в состоянии default", () => {
    const button = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки в состоянии changing", () => {
    const button = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Корректная отрисовка кнопки в состоянии modified", () => {
    const button = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
});
