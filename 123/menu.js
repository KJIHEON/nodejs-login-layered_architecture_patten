const { func } = require('joi');
const data = require('./datas');

let newData = data.map((v) => {
  return {
    name: v['REST_NM'],
    categoryId: v['TOB_INFO'],
    menuList: v['MENU_KOR_ADD_INFO'],
    price: v['MENU_AMT'],
  };
});
// console.log(newData,"sdafsdafdsafasdfsdafsdaf")
newData.forEach((v) => {
  switch (v.menuCategoryId) {
    case '기타':
      v.menuCategoryId = 1;
      break;
    case '찌개&탕':
      v.menuCategoryId = 2;
      break;
    case '덮밥&볶음밥':
      v.menuCategoryId = 3;
      break;
    case '면류':
      v.menuCategoryId = 4;
      break;
    case '밥류':
      v.menuCategoryId = 5;
      break;
    case '볶음류':
      v.menuCategoryId = 6;
      break;
    case '튀김류':
      v.menuCategoryId = 7;
      break;
    case '스시':
      v.menuCategoryId = 8;
      break;
    case '초밥':
      v.menuCategoryId = 9;
      break;
    case '돈까스':
      v.menuCategoryId = 10;
      break;
    case '카페':
      v.menuCategoryId = 11;
      break;
    // case '아시안':
    // v.categoryId = 11;
    // break;
    // case '야식':
    // v.categoryId = 12;
    // break;
  }
});
// console.log(newData,"dsfsd")
newData = newData.filter((v) => v.price !== '');
// console.log(newData)
newData.forEach((v, i) => {
  v.menuList = v.menuList.replaceAll("'", '');
  v.menuList = v.menuList.slice(1, v.menuList.length - 1).split(', ');
  v.price = v.price.slice(1, v.price.length - 1).split(', ');
  // if (v.openHrInfo.length > 0) v.openHrInfo = v.openHrInfo.split(' ');
});
// console.log(newData)
// console.log(newData.slice(0, 10));

let menuPrice = [];

newData.map((v) => {
  for (i = 0; i < v['price'].length; i++) {
    let menu = [];
    menu[0] = [v.name, v.menuList[i]];
    menu[1] = v.price[i];
    menuPrice.push(menu);
  }
});

// storeId menuCategoryId name price image
//즉시 실행 함수
(async () => {
  await Menu.bulkCreate();
})();

// console.log(menuPrice.slice(0, 15));
// console.log(allmenus)
const allmenus = menuPrice.map((v) => v[0][1]);
// console.log(allmenus)

console.log(allmenus.slice(0, 300));
