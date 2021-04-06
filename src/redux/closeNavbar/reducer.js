export default function navbarReducer(preState = true, action) {
    const { type,data} = action;
    switch (type) {
      case "UPDATE_NAVBAR":
        return data;
      default:
        //初始化
        return preState;
    }
  }
  