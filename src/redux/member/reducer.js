

export default function accountReducer(preState = {}, action) {
    const { type, data } = action;
    switch (type) {
      case "SET_Member":
        return {...data};
      case "UPDATE_Budget":
        preState.budget = data
        return {...preState};
      default:
        //初始化
        return preState;
    }
  }
  