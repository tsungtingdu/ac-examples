function copyURL() {
  // 參考 jQuery 邏輯改用 js 來寫
  // var $temp = $("<input>");
  // $("body").append($temp);
  // $temp.val($(element).text()).select();
  // document.execCommand("copy");
  // $temp.remove();

  /* Get the text field */
  const copyText = document.querySelector("#shortedURL");
  let $temp = document.createElement("input")
  copyText.append($temp)
  /* Select the text field */
  $temp.value = copyText.textContent
  $temp.select();
  $temp.setSelectionRange(0, 99999); /* For mobile devices */
  /* Copy the text inside the text field */
  document.execCommand("copy");
  $temp.remove()
}