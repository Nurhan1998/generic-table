type TActionReturnType<T> = {
  type: string;
  payload?: T;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type TUtilType<T = undefined> = (payload?: T) => TActionReturnType<T>;
export default <T = undefined>(actionType: string): TUtilType<T> => payload => ({
  type: actionType,
  payload,
});
