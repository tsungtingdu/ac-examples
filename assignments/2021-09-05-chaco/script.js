//render list content
const tbody = document.querySelector(".table__body");
for (let i = 0; i <= 20; i++) {
  tbody.innerHTML += `
          <tr class="table__row">
                    <td class="table__cell table__cell--checkbox">
                        <input type="checkbox" />
                    </td>
                    <td class="table__cell table__cell--id">ID</td>
                    <td class="table__cell table__cell--name">Name</td>
                    <td class="table__cell table__cell--advertiser">
                        <span class="cell__advertiser__line">Advertiser</span>
                        <span class="cell__advertiser__line cell__advertiser__line--group">Group</span>
                    </td>
                    <td class="table__cell table__cell--description">Description</td>
                    <td class="table__cell table__cell--price">Price</td>
                    <td class="table__cell table__cell--starttime">Start Time</td>
                    <td class="table__cell table__cell--endtime">End Time</td>
                    <td class="table__cell table__cell--action">
                        <img class="cell__action__icon" src="https://raw.githubusercontent.com/ALPHACamp/WFE-data-table/0f97f3113bff18353154b8644eb0b31fff2a3bef/icons/menu.svg" id="action__input_1" alt="menu">
                        <div class="action__menu hidden" role="dialog" aria-modal="true" aria-labelledby="action__input_1" id="action__menu_1">
                            <menu class="menu__body">
                                <menuitem class="menu__item">
                                <img src="https://raw.githubusercontent.com/ALPHACamp/WFE-data-table/0f97f3113bff18353154b8644eb0b31fff2a3bef/icons/duplicate.svg" class="menu__item__icon" />
                                <span>Duplicate</span>
                                </menuitem>
                                <menuitem class="menu__item">
                                <img src="https://raw.githubusercontent.com/ALPHACamp/WFE-data-table/0f97f3113bff18353154b8644eb0b31fff2a3bef/icons/edit.svg" class="menu__item__icon" />
                                <span>Edit</span>
                                </menuitem>
                                <menuitem class="menu__item">
                                <img src="https://raw.githubusercontent.com/ALPHACamp/WFE-data-table/0f97f3113bff18353154b8644eb0b31fff2a3bef/icons/delete.svg" class="menu__item__icon" />
                                <span>Delete</span>
                                </menuitem>
                            </menu>
                        </div>
                    </td>
                </tr>
  `;
}
//toggle hidden menu
const input = document.querySelector("#action__input_1");
const menu = document.querySelector("#action__menu_1");
input.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

//darkmode switch
const darkModeToggle = document.querySelector("#dark__mode__toggle");

const darkModeToggleHandler = (event) => {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
};

darkModeToggle.addEventListener("change", darkModeToggleHandler);

//change background color of checked list
const mainTable = document.querySelector(".main__table")
//check status and change background color
function changeRowColor(input,row){
  input.checked
    ?row.classList.add("background_change")
    :row.classList.remove("background_change")
}

//monitor the change of table
mainTable.addEventListener("change", function checkRowColor(event){
  const target = event.target
  const parentRow = event.target.parentElement.parentElement;
  //if the target is title checkbox 
  if(parentRow.classList.contains("table__header")){
    //all checkbox
    const tbodyAllCheckbox = document.querySelectorAll(".table__cell--checkbox")
    for( let i = 1; i < tbodyAllCheckbox.length; i ++){
      tbodyAllCheckbox[i].children[0].checked = target.checked;
      changeRowColor(tbodyAllCheckbox[i].children[0],tbodyAllCheckbox[i].parentElement)
    }return
  }
  changeRowColor(target,parentRow)
});