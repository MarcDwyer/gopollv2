import { Action } from "../../reducers/reducers";

const getOptions = (count: number) =>
  Array(count)
    .join(".")
    .split(".");
type PollOptions = {
  question: string;
  filterIps: boolean;
  options: string[];
};
export const initState: PollOptions = {
  question: "",
  filterIps: false,
  options: getOptions(2)
};
export const QUESTION = Symbol(),
  FILTERIPS = Symbol(),
  OPTIONS = Symbol(),
  ADD_OPTION = Symbol();

const CreateReducer = (
  state: PollOptions = initState,
  { type, payload }: Action
) => {
  const copy = { ...state };
  switch (type) {
    case QUESTION:
      copy.question = payload;
      return copy;
    case FILTERIPS:
      copy.filterIps = !copy.filterIps;
      return copy;
    case OPTIONS:
      const { index, value } = payload;
      copy.options[index] = value;
      return copy;
    case ADD_OPTION:
      copy.options.push("");
      return copy;
    default:
      return state;
  }
};

export default CreateReducer;
