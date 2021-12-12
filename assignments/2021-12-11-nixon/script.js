const tableBody = document.querySelector(".table__body");
//製造dummy table row
createTableRow(30);
const darkModeToggle = document.querySelector("#dark__mode__toggle");
const menuToggles = document.querySelectorAll(".cell__action__icon");
const tableRow = document.querySelectorAll(".table__body .table__row");
const headerCheckbox = document.querySelector(".table__row input");
const checkboxes = document.querySelectorAll(".table__body .table__row input");

//全選功能
headerCheckbox.addEventListener("click", toggleAllActive);
function toggleAllActive(e) {
  headerCheckbox.checked;
  checkboxes.forEach((checkbox) => {
    if (headerCheckbox.checked === true) {
      checkbox.checked = true;
      const id = checkbox.dataset.check;

      const row = document.querySelector(`[data-row="${id}"]`);
      row.classList.contains("active") ? null : row.classList.add("active");
    } else {
      checkbox.checked = false;
      const id = checkbox.dataset.check;

      const row = document.querySelector(`[data-row="${id}"]`);
      row.classList.contains("active") ? row.classList.remove("active") : null;
    }
  });
}

//單筆選取功能
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", turnActive);
  checkbox.addEventListener('click', selectMutipleCheckbox)
});
let lastCheck;
function turnActive(e) {
  
  const num = e.target.dataset.check;
  const row=document.querySelector(`[data-row="${num}"]`);
  
  if(e.target.checked){
    row.classList.toggle("active");
  }else{
    row.classList.remove("active")
  }
  
}
//部分選取功能
function selectMutipleCheckbox(e){
  let isBetween=false;
  if(e.shiftKey && this.checked){
    
    checkboxes.forEach(checkbox=>{
      
     if( checkbox===this || checkbox===lastCheck){
       isBetween=!isBetween;
     }
      
     
      
      if(isBetween && lastCheck){
        const num=checkbox.dataset.check;
        const row=document.querySelector(` [data-row="${num}"]`);
        checkbox.checked=true;
        row.classList.add('active');
      }
      
    })
    //在完成一次部分選曲後，重置。
    if(lastCheck){
      lastCheck=null;
    }else{
      lastCheck=this;
    }
    
    
  }
  
}


menuToggles.forEach((menuToggle) => {
  menuToggle.addEventListener("click", toggleMenu);
});


function toggleMenu(e) {
  const id = e.target.id;
  const menu = document.querySelector(`div[aria-labelledby="${id}"] `);
  //顯示
  menu.classList.toggle("hidden");
}
function createTableRow(index) {
  for (let i = 0; i < index; i++) {
    tableBody.innerHTML += `
    <tr data-row=" ${i} " class="table__row ">
            <td class="table__cell table__cell--checkbox">
              <input type="checkbox" data-check=" ${i} "/>
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
              <img class="cell__action__icon" src="https://raw.githubusercontent.com/ALPHACamp/WFE-data-table/0f97f3113bff18353154b8644eb0b31fff2a3bef/icons/menu.svg" id="action__input_${i} " alt="menu" />
              <div class="action__menu hidden" role="dialog" aria-modal="true" aria-labelledby="action__input_${i} " id="action__menu_${i} ">
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
}

const darkModeToggleHandleler = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
};

darkModeToggle.addEventListener("click", darkModeToggleHandleler);
