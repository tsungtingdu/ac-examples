const R = "R";
const G = "G";
const B = "B";
const defaultRGBValue = 121;
const RANGE = "range";
const Type_Number = "number";

const META_DATA = {
	R: {
		labelId: "red-input-range",
		numberId: "red-input-number",
		color: "darkred"
	},
	G: {
		labelId: "green-input-range",
		numberId: "green-input-number",
		color: "green"
	},
	B: {
		labelId: "blue-input-range",
		numberId: "blue-input-number",
		color: "blue"
	}
}

// blueprint
function sliderData(labelValue) {
	this.labelValue = labelValue;
	const { labelId, numberId, color } = META_DATA[labelValue]
	this.inputRangeID = labelId;
	this.inputNumberID = numberId;
	this.color = color;
}

// Initialize Slider Data based on blueprint
const sliderDataArray = [R, G ,B].map(key => new sliderData(key));

function getHex(v) {
	let targetValue;

	if (Number.isNaN(v)) {
		targetValue = defaultRGBValue;
	} else if (v > 255) {
		targetValue = 255
	} else if (v < 0) {
		targetValue = 0
	} else {
		targetValue = v
	}

	return targetValue.toString(16).padStart(2, "0").toUpperCase();
}

// utility function
function returnHEXCode(r = defaultRGBValue, g = defaultRGBValue, b = defaultRGBValue) {
	return ["#", getHex(r), getHex(g), getHex(b)].join("");
}

function getDomValue(type) {
	const key = type === RANGE ? 'labelId' : 'numberId';
	return {
		r: document.getElementById(META_DATA[R][key])?.valueAsNumber,
		g: document.getElementById(META_DATA[G][key])?.valueAsNumber,
		b: document.getElementById(META_DATA[B][key])?.valueAsNumber
	}
}

// event Handler
function handleInput(e) {
	console.log('input')
	const { target } = e
	const targetInput = target.type === RANGE ? target.nextElementSibling : target.previousElementSibling;
	const hexCodeText = document.querySelector("#hexcode-text");
	const hexResult = document.querySelector("#HEX-result");

	const { r, g, b } = getDomValue(target.type)
	const resultHEX = returnHEXCode(r, g, b);

	targetInput.value = target.valueAsNumber;

	hexCodeText.textContent = resultHEX;
	hexCodeText.style.color = resultHEX;
	hexResult.style.backgroundColor = resultHEX;
}
async function handleClick(e) {
	const alertMsg = "HEX Code is copied";

	await navigator.clipboard.writeText(e.target.textContent).then(
		function (success) {
			alert(alertMsg);
		},
		(error) => console.error("fail to copy HEX code", error)
	);
}

// main function
function createRoot() {
	const result = document.createElement("div");
	result.id = "root";
	result.appendChild(createRGBForm());
	result.appendChild(createHEXResult());
	return result;
}

function createRGBForm() {
	const result = document.createElement("form");
	result.id = "RGB-form";

	// create Form
	sliderDataArray.forEach((item) => {
		result.appendChild(createRGBSlider(item));
	});

	return result;
}

function createRGBSlider(sliderData) {
	const result = document.createElement("div");
	result.className = "control";
	const { labelValue, color, inputRangeID, inputNumberID } = sliderData;

	result.innerHTML = `
		<label for="${labelValue}" style="font-weight: bold; color: ${color}">${labelValue}</label>
		<input type="range" max="255" id="${inputRangeID}" value="${defaultRGBValue}"></input>
		<input type="number" max="255" min="0" id="${inputNumberID}" color:"${color}" value="${defaultRGBValue}"></input>
	`

	result.addEventListener("input", handleInput);
	return result;
}

function createHEXResult() {
	const hexCodeText = document.createElement("p");
	const hexCode = returnHEXCode();

	hexCodeText.id = "hexcode-text";
	hexCodeText.textContent = hexCode;
	hexCodeText.style.color = hexCode;
	hexCodeText.addEventListener("click", handleClick);

	const result = document.createElement("div");
	result.id = "HEX-result";
	result.style.backgroundColor = hexCode;
	result.appendChild(hexCodeText);

	return result;
}

function createFooter() {
	const result = document.createElement("footer");
	const signature = `
		<span>Designed by
			<a href='https://yumingchang1991.github.io/personal-portfolio/' target='_blank'>
				Yu-Ming, Chang (he/him)
			</a>
			@ 2022
		</span>
	`;
	result.innerHTML += signature;
	return result;
}

// driver
[createRoot(), createFooter()].forEach((node) => {
	document.querySelector("body").appendChild(node);
});