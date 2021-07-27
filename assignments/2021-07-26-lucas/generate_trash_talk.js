function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateTrash (option) {
  const title = {
    engineer: '工程師',
    designer: '設計師',
    entrepreneur: '創業家',
  };

  const task = {
    engineer: ["加個按鈕", "加新功能", "切個版", "改一點 code"],
    designer: ["畫一張圖", "改個 logo", "順便幫忙設計一下", "隨便換個設計"],
    entrepreneur: ["週末加班", "要能賺錢", "想個 business model", "找 VC 募錢"],
  };

  const phrase = ["很簡單", "很容易", "很快", "很正常"];

  //target -使用者選擇幹話的對象，選擇有「工程師」、「設計師」與「創業家」。只能三選一。
  //task - 幹話對象一般的工作內容，這會針對 target 選項而有所不同
  //phrase - 幹話必須有的語句，可以配搭任何 target 與 task
  if (!option) return "您沒有選擇對象，請選擇一個目標講幹話";

  
  const randomTask = sample(task[option]);
  const randomPhrase = sample(phrase)

  return `身為一個${title[option]}，${randomTask}，${randomPhrase}`;
}

module.exports = generateTrash;

