
const init ={
    loading:true,
    apiwait:false
}

export default function loadingReducer(preState = init, action) {
    const { type, data } = action;
    switch (type) {
      case "update_loading":
        console.log('有',data)
        preState.loading = data
        return {...preState};
      case "update_apiwait":
        preState.apiwait = data
        return {...preState};
      default:
        //初始化
        return preState;
    }
  }
  