

export default function accountReducer(preState = [], action) {
  const { type, data } = action;
  switch (type) {
    case "SET_ACCOUNT":
      return [...data];
    case "ADD_ACCOUNT":
      return[...preState,data];
    default:
      //初始化
      return preState;
  }
}
