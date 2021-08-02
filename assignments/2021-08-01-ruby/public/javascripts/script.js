const copyButton = document.querySelector("#copy-button")

function copyText() {
  var copyText = document.querySelector("#short-url");
  copyText.select();
  document.execCommand("copy");
  alert("Copied!");
}

copyButton.addEventListener("click", copyText)