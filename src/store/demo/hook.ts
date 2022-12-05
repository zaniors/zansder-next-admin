import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../reducers";
import {
  countMinusOneAction,
  countPlusOneAction,
  countPlusOneAsyncAction,
} from "./action";

export default function useDemo() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootStore) => state.demo);

  const countPlusOne = useCallback(() => {
    dispatch(countPlusOneAction());
  }, [dispatch]);
  const countMinusOne = useCallback(() => {
    dispatch(countMinusOneAction());
  }, [dispatch]);
  const countPlusOneAsync = useCallback(() => {
    dispatch(countPlusOneAsyncAction());
  }, [dispatch]);

  return {
    ...data,
    countPlusOne,
    countMinusOne,
    countPlusOneAsync,
  };
}
