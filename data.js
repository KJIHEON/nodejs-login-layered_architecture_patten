//특정 url 을 넣으면 그 url에 html 파일을 가져옴
const axios = require("axios");
//html에 있는 정보를 파싱할때 사용함 jquery처럼 사용가능
const cheerio = require("cheerio");

//HTML 을 가져오는 함수
const getHTML = async(keyword) => {
  try{ 
    //                   url을 넣어서 원하는 정보를 가져올수 있다  s=검색 키워드 encodeURI() 인코드를 해줘야 오류가 없음
    return await axios.get("https://www.inflearn.com/courses?s=" + encodeURI(keyword))
  }catch(err){
    console.log(err)
  }
}
//HTML 을 파싱 하는 함수
const parsing = async (keyword) =>{
  //                 getHTML을 검색키워드로 실행시킨다
  const html = await getHTML(keyword)
  //제이쿼리 처럼 쓰기위해 $을 사용 하여 html 의 정보를 가져올 예정
  const $ = cheerio.load(html.data)
  //html안에 내가 원하는 컬럼의 class이름
  const $courseList = $(".course_card_item")

  //배열선언
  let courses = []
  //$.each() 메서드는 object 와 배열 모두에서 사용할 수 있는 일반적인 반복 함수입니다.
  //each는 for문이랑 동일 반복문 .each(인덱스,값)
  $courseList.each((inx,node)=>{
    //  변수 선언후   
    const title = $(node).find(".course_title").text()
    courses.push({
      title : $(node).find(".course_title").text(),
      instructor : $(node).find(".instructor").text(),
      price : $(node).find(".price").text(),
      rating : $(node).find(".star_solid").css("width"),
      //                  클래스 안에 > 테그 > 테그   중첩으로 있을시 가져옴 .attr("src") url 정보를 가져옴
      img : $(node).find(".card-image > figure > img").attr("src")
    })
  })
  console.log(courses)
}
//함수를 불러 키워드 쓰기
parsing("자바스크립트")