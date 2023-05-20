import renderer from "react-test-renderer";

import { Button } from "./button";

it("Кнопка c текстом рендерится без ошибок", () => {
  const tree = renderer.create(<Button text="Кнопка с текстом" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кнопка без текста рендерится без ошибок", () => {
  const tree = renderer.create(<Button text="" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Заблокированная кнопка рендерится без ошибок", () => {
  const tree = renderer.create(<Button disabled={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Кнопка c индикацией загрузки рендерится без ошибок", () => {
  const tree = renderer.create(<Button isLoader={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});
