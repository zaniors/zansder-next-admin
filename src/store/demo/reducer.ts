import { DemoState } from "../../models/demo";
import { DEMO_COUNTER_MINUS_ONE, DEMO_COUNTER_PLUS_ONE } from "./constant";

export default function demoReducer(state = {} as DemoState, action) {
  switch (action.type) {
    case DEMO_COUNTER_PLUS_ONE:
      return {
        ...state,
        num: state.num + 1,
      };
    case DEMO_COUNTER_MINUS_ONE:
      return {
        ...state,
        num: state.num - 1,
      };
    default:
      return state;
  }
}
