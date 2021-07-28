const form = document.querySelector('#form')
const submitButton = document.querySelector('#submit-btn')

form.addEventListener('submit', function onFormSubmitted(event) {
  if (!form.checkValidity()) {
    event.stopPropagation()
    event.preventDefault()
    alert('請輸入正確網址')
  }
})

submitButton.addEventListener('click', function onSubmitButtonClicked(event) {
  form.classList.add('was-validated')
})