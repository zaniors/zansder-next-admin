import { DEMO_COUNTER_MINUS_ONE, DEMO_COUNTER_PLUS_ONE } from "./constant";

export const countPlusOneAction = () => {
  return {
    type: DEMO_COUNTER_PLUS_ONE,
  };
};

export const countMinusOneAction = () => {
  return {
    type: DEMO_COUNTER_MINUS_ONE,
  };
};

// 异步的action
export function countPlusOneAsyncAction() {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(countPlusOneAction());
    }, 2000);
  };
}
