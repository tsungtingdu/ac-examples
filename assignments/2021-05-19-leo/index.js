const input = document.querySelector('container')
const output = document.querySelector('Hex')
const Hexadecimal = "0123456789ABCDEF"

function hexToDec (num) {
	let a = num % 16
	let b = ( Math.floor(num / 16) ) % 16
	return  Hexadecimal[b] + Hexadecimal[a]
}

input.addEventListener('change', function () {
	let target = event.target
	if (target.classList.contains('slider')) {
		target.nextElementSibling.innerText = event.target.value
		let red = document.querySelector('.R.output').value
		let green = document.querySelector('.G.output').value
		let blue = document.querySelector('.B.output').value
		output.innerText = "#"+hexToDec(red)+hexToDec(green)+hexToDec(blue)
		document.body.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')'
	}
})