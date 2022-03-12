const R = "R";
const G = "G";
const B = "B";
const defaultRGBValue = 121;
const RANGE = "range";
const Type_Number = "number";

// blueprint
function sliderData(labelValue) {
	this.labelValue = labelValue;
	this.inputRangeID =
		labelValue === R
			? "red-input-range"
			: labelValue === G
			? "green-input-range"
			: "blue-input-range";
	this.inputNumberID =
		labelValue === R
			? "red-input-number"
			: labelValue === G
			? "green-input-number"
			: "blue-input-number";
	this.color =
		labelValue === R ? "darkred" : labelValue === G ? "green" : "blue";
}

// Initialize Slider Data based on blueprint
const sliderDataArray = [];
sliderDataArray.push(new sliderData(R));
sliderDataArray.push(new sliderData(G));
sliderDataArray.push(new sliderData(B));

// utility function
function returnHEXCode(r, g, b) {
	const rHex = Number.isNaN(r)
		? defaultRGBValue.toString(16).padStart(2, "0").toUpperCase()
		: r > 255
		? Number(255).toString(16).padStart(2, "0").toUpperCase()
		: r < 0
		? Number(0).toString(16).padStart(2, "0").toUpperCase()
		: r.toString(16).padStart(2, "0").toUpperCase();
	const gHex = Number.isNaN(g)
		? defaultRGBValue.toString(16).padStart(2, "0").toUpperCase()
		: g > 255
		? Number(255).toString(16).padStart(2, "0").toUpperCase()
		: g < 0
		? Number(0).toString(16).padStart(2, "0").toUpperCase()
		: g.toString(16).padStart(2, "0").toUpperCase();
	const bHex = Number.isNaN(b)
		? defaultRGBValue.toString(16).padStart(2, "0").toUpperCase()
		: b > 255
		? Number(255).toString(16).padStart(2, "0").toUpperCase()
		: b < 0
		? Number(0).toString(16).padStart(2, "0").toUpperCase()
		: b.toString(16).padStart(2, "0").toUpperCase();
	const result = ["#", rHex, gHex, bHex].join("");
	return result;
}

// event Handler
function handleInput(e) {
	const targetInput =
		e.target.type === RANGE
			? e.target.nextElementSibling
			: e.target.previousElementSibling;
	const hexCodeText = document.querySelector("#hexcode-text");
	const hexResult = document.querySelector("#HEX-result");
	const r =
		e.target.type === RANGE
			? document.querySelector("#red-input-range").valueAsNumber
			: document.querySelector("#red-input-number").valueAsNumber;
	const g =
		e.target.type === RANGE
			? document.querySelector("#green-input-range").valueAsNumber
			: document.querySelector("#green-input-number").valueAsNumber;
	const b =
		e.target.type === RANGE
			? document.querySelector("#blue-input-range").valueAsNumber
			: document.querySelector("#blue-input-number").valueAsNumber;
	const resultHEX = returnHEXCode(r, g, b);
	const alertMsg = "valid number is within 0 ~ 255";
	// if user input is outside valid range
	if (r > 255 || g > 255 || b > 255) {
		targetInput.value = 255;
		e.target.value = 255;
		alert(alertMsg);
	} else if (r < 0 || g < 0 || b < 0) {
		targetInput.value = 0;
		e.target.value = 0;
		alert(alertMsg);
	} else if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
		targetInput.value = defaultRGBValue;
		e.target.value = defaultRGBValue;
		alert(alertMsg);
	} else {
		targetInput.value = e.target.valueAsNumber;
	}
	// update Hex text
	hexCodeText.textContent = resultHEX;
	// update Hex Color
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
	const label = document.createElement("label");
	label.setAttribute("for", sliderData.inputRangeID);
	label.textContent = sliderData.labelValue;
	label.style.color = sliderData.color;
	label.style.fontWeight = "bold";

	const inputRange = document.createElement("input");
	inputRange.type = "range";
	inputRange.id = sliderData.inputRangeID;
	inputRange.value = defaultRGBValue;
	inputRange.max = 255;

	const inputNumber = document.createElement("input");
	inputNumber.type = "number";
	inputNumber.id = sliderData.inputNumberID;
	inputNumber.style.color = sliderData.color;
	inputNumber.value = defaultRGBValue;
	inputNumber.min = 0;
	inputNumber.max = 255;

	const result = document.createElement("div");
	result.className = "control";
	result.appendChild(label);
	result.appendChild(inputRange);
	result.appendChild(inputNumber);
	result.addEventListener("input", handleInput);

	return result;
}
function createHEXResult() {
	const hexCodeText = document.createElement("p");
	const hexCode = returnHEXCode(
		defaultRGBValue,
		defaultRGBValue,
		defaultRGBValue
	);
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