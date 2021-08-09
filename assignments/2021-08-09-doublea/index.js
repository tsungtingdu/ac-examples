////// start code, please don't change ///////

let comments = [
  { id: 1, user: "小美", text: "感謝你分享你的心情！" },
  { id: 2, user: "阿明", text: "讀了你的文章我很有共鳴！" },
  { id: 3, user: "路人", text: "共鳴+1" },
  {
    id: 4,
    user: "V 怪客",
    text: "你想跟我一樣開跑車嗎 這是我們上禮拜買的小牛"
  },
  { id: 5, user: "粉絲", text: "期待下一篇！" }
];



function renderComments(comments) {
  let rawHtml = `
    <table class="table table-sm table-striped table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>留言者</th>
          <th>留言內容</th>
          <th>習維尼審查</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let i = 0; i < comments.length; i++) {
    rawHtml += `
      <tr>
        <td>${comments[i].id}</td>
        <td>${comments[i].user}</td>
        <td>${comments[i].text}</td>
        <td><button class = 'btn-comment-restrict small' data-id="${comments[i].id}">未通過</button></td>
      </tr>
    `;
  }

  rawHtml += `
      </tbody>
    </table>
  `;

  container.innerHTML = rawHtml;
}

////// 請在以下區域進行修改 ///////

//宣告變數
const container = document.querySelector(".container");
let restrictCommentIdList = []
let filteredComments =[]

function addBadComment(id){
  if (restrictCommentIdList.includes(id)) {
      console.log("badComment already exist");
    } else {
      restrictCommentIdList.push(id);
      // filteredComments = comments.splice(id-1,1) //Button生效且可以刪除多個留言，但沒有使用filter
      
      filteredComments = comments.filter( (comment) => !restrictCommentIdList.includes(comment.id))
      /*第一次嘗試
        filteredComments = comments.filter( (comment) => comment.id !== id )
        會出現只能刪除一個id的BUG雖然有製作按鈕，但是按一次只能刪除一則留言，且之前刪除的會重複出現
        這代表filteredComments並沒有儲存為新陣列並傳出來，原因有二：
          1. 我將 return filteredComments 放在else{}外面
          2. 點擊一次只會產生一個id，雖然我有restrictCommentIdList.push(id)，但無法透過for迴圈將id取出原因如下：
        一直嘗試後面接for迴圈，像是 comment.id !== forEach(id) || for(id)
        雖然forEach() & for() 最後console出來的型別為Number
        但是在一開始執行時，程式就會發現 !== 右邊的型別為『Object』
      */
      /* 第二次嘗試：Google大神
      這次使用的是不常使用的 ! logic not 邏輯判斷式
      ! arr.includes() 所代表的結果有兩個：
        1. !(false) + 欲排除的陣列中『包含』指定id(True)  = False --> comments.filter(False)，排除指定id
        2. !(false) + 欲排除的陣列中『不包含』指定id(True)  = True --> comments.filter(True)，將沒有包含指定id的值回傳並儲存為新的陣列 filteredComments
      */
      /* Learning
      1. !邏輯判斷式，很難理解且不直覺但有時候意外的好用，需要多練習幾次
      1. 2. filter()的本質是邏輯判斷式，只回傳True 通過檢驗的值並儲存為新的陣列
      */
      return filteredComments
    }
}

//監聽器一：冒犯維尼審核按鈕
//監聽器綁在父元素上，使用if函數限定點擊button時才執行指定功能
container.addEventListener("click", function onCommentReview(event) {

    const badComment = Number(event.target.dataset.id);
    addBadComment(badComment)
  //檢查是否有回傳出來且有儲存多筆資料
  console.log(filteredComments)
  //重新刷新頁面
  renderComments(filteredComments)
})
  
renderComments(comments)

