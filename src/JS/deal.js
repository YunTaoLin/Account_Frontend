
import colorList from "./colorList.json";
let resFormat = {
  type: "doughnut",
  data: {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: colorList,
        borderWidth: 0,
        weight:2,
      },
    ],
  },
  options: {
    legend: {
      labels: {
        boxWidth: 0,
        fontSize: 0,
      },
    },
    cutoutPercentage:70,
    animation: {
      duration:300,
      // animateScale: true
    }
  },
};

export default function getChartObj(filtedArray) {
  let okData = []
  filtedArray.forEach((item) => {
    let target = okData.find((target)=>target.classify === item.classify)
    if(!target){
      //還沒有該元素
      okData.push({
        classify : item.classify,
        value:item.price,
      })
    }else{
      target.value += item.price
    }
  });
  let resObj = JSON.parse(JSON.stringify(resFormat))
  okData.forEach(item=>{
    resObj.data.labels.push(item.classify)
    resObj.data.datasets[0].data.push(item.value)
  })
  return resObj
  
}
