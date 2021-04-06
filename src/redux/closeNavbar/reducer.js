export default function navbarReducer(preState = true, action) {
    const { type,data} = action;
    switch (type) {
      case "UPDATE_NAVBAR":
        console.log('navbar呼叫',data)
        return data;
      default:
        //初始化
        return preState;
    }
  }
  