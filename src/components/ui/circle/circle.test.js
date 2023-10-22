import renderer from "react-test-renderer";
import { ElementStates } from "src/types/element-states";
import { Circle } from "./circle";

it("Circle без буквы рендерится без ошибок", () => {
  const tree = renderer.create(<Circle letter={""} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle с буквой рендерится без ошибок", () => {
  const tree = renderer.create(<Circle letter={"A"} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle с head рендерится без ошибок", () => {
  const tree = renderer.create(<Circle head={"head"} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle с с react-элементом в head рендерится без ошибок", () => {
  const tree = renderer
    .create(<Circle head={<Circle isSmall={true} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle с tail рендерится без ошибок", () => {
  const tree = renderer.create(<Circle tail={"tail"} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle с с react-элементом в tail рендерится без ошибок", () => {
  const tree = renderer
    .create(<Circle tail={<Circle isSmall={true} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle с index рендерится без ошибок", () => {
  const tree = renderer.create(<Circle index={0} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle с пропом isSmall рендерится без ошибок", () => {
  const tree = renderer.create(<Circle isSmall={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle в состоянии default рендерится без ошибок", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Default} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle в состоянии changing рендерится без ошибок", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Changing} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Circle в состоянии modified рендерится без ошибок", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Modified} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
