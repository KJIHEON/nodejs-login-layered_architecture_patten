const data = require("./datas")

const s = data.map((x)=>{return{
  name : x['TOB_INFO']

}
})



newData.forEach((v) => {
  switch (v.categoryId) {
  case '중식':
  v.categoryId = 1;
  break;
  case '한식':
  v.categoryId = 2;
  break;
  case '양식':
  v.categoryId = 3;
  break;
  case '분식':
  v.categoryId = 4;
  break;
  case '카페·디저트':
  v.categoryId = 5;
  break;
  case '일식':
  v.categoryId = 6;
  break;
  case '치킨':
  v.categoryId = 7;
  break;
  case '패스트푸드':
  v.categoryId = 8;
  break;
  case '브런치':
  v.categoryId = 9;
  break;
  case '기타':
  v.categoryId = 10;
  break;
  case '아시안':
  v.categoryId = 11;
  break;
  case '야식':
  v.categoryId = 12;
  break;
  }
  })
  
console.log(s)