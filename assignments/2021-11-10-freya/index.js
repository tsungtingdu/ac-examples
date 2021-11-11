// target the input element
const input = document.getElementById("action__input_1");

// click handler
const toggleMenu = (event) => {
  // target the menu element
  const menu = document.getElementById("action__menu_1");
  menu.classList.toggle("hidden");
};

// bind the event
input.addEventListener("click", toggleMenu);

// dark mode
// target the switch element
const darkModeToggle = document.getElementById("dark__mode__toggle");

// toggle handler
const darkModeToggleHandler = (event) => {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
};

// bind the event
darkModeToggle.addEventListener("change", darkModeToggleHandler);

// add checked class to table-row
const checkedBox = document.querySelector(".main__table");

const checkedBoxColorControl = (checkbox) => {
  const inputParent = checkbox.parentElement.parentElement;
  if (checkbox.checked) {
    inputParent.classList.add("box-checked");
  } else {
    inputParent.classList.remove("box-checked");
  }
};

const addChecked = function (event) {
  const theadCheckbox = document.querySelector(".thead-checkbox");
  const allInputs = document.querySelectorAll(
    ".table__body tr .table__cell--checkbox input"
  );

  if (event.target.tagName !== "INPUT") return;

  if (event.target !== theadCheckbox) {
    checkedBoxColorControl(event.target);
  } else if (event.target === theadCheckbox) {
    allInputs.forEach((box) => {
      if (theadCheckbox.checked) {
        box.checked = true;
      } else {
        box.checked = false;
      }
      checkedBoxColorControl(box);
    });
  }
};

checkedBox.addEventListener("change", addChecked);
