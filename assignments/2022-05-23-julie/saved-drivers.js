const BASE_URL = "https://lighthouse-user-api.herokuapp.com/"
const INDEX_URL = BASE_URL + "api/v1/users/"
const model = {
  filteredDrivers: [],
  savedDriverList: JSON.parse(localStorage.getItem('Saved_Driver_List')) || [],
  bannedDrivers: JSON.parse(localStorage.getItem('Banned_Driver_List')) || [],
  DRIVERS_PER_PAGE: 24,
  currentPage: 1,
  currentDisplayMode: 'CARD',
}
const node = {
  pageTitleText: document.querySelector('#page-title-text'),
  driverPanel: document.querySelector('#driver-panel'),
  infoModal: document.querySelector('#driverInfoModal'),
  infoModalBody: document.querySelector('#info-modal-body'),
  infoModalFooter: document.querySelector('#info-modal-footer'),
  saveBtn: document.querySelector('#save-btn'),
  paginator: document.querySelector('#paginator'),
  displayModePanel: document.querySelector('#display-mode-panel'),
  displayByCardBtn: document.querySelector('#display-by-card-btn'),
  displayByListBtn: document.querySelector('#display-by-list-btn'),
  driverNavbar: document.querySelector('#driver-navbar'),
  searchForm: document.querySelector('#driver-search-form'),
  searchInput: document.querySelector('#driver-search-input'),
}
const view = {
  displayDriversByCard(data) {
    let card_rawHTML = ''
    data.forEach((driver) => {
      card_rawHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="card border-3 mb-3 driver-card-item">
                <div class="card-body row p-2" style="max-width: 540px;">
                  <div type="button" class="col-5 align-self-center render-info-btn" data-id="${driver.id}" data-bs-toggle="modal" data-bs-target="#driverInfoModal">
                    <img src="${driver.avatar}" class="img-fluid rounded-circle driver-avatar" data-id="${driver.id}"
                      alt="driver avatar">
                  </div>
                  <div class="card-text col-7">
                      <div class="card-title d-flex flex-column">
                      <p class="text-secondary text-end fs-5 mb-0">
                        <i type="button" class="fa-regular fa-bookmark fa-lg switch-save-btn fas text-danger"  data-id="${driver.id}"></i>
                      </p>
                      <p class="fs-5">
                        ${driver.name}
                      </p>
                      <p class="lh-sm"><small class="text-muted ">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
                <div class="footer row m-2 mt-0">
                  <button type="button" class="btn btn-warning badge fs-5" data-bs-toggle="modal"
                    data-bs-target="#offerModal1">Make An Offer</button>
                </div>
              </div>
            </div>
      `
    });
    node.driverPanel.innerHTML = ''
    node.driverPanel.innerHTML = card_rawHTML
  },
  displayDriversByList(data) {
    let driverList_rawHTML = '';
    driverList_rawHTML = `
    <div class="list">
      <ul class="list-group list-group-flush">
    `;
    data.forEach((driver) => {
      const savedIcon_rawHTML = `<i type="button" class="fa-regular fa-bookmark fa-lg switch-save-btn me-3 fas text-danger" data-id="${driver.id}"></i>`


      driverList_rawHTML += `
        <li class="list-group-item  d-flex justify-content-between align-items-end driver-list-item">   
          <div class="fs-4 text-secondary align-self-center">
            ${savedIcon_rawHTML}
            <span class="render-info-btn " type="button" data-bs-toggle="modal" data-bs-target="#driverInfoModal" data-id="${driver.id}">
            ${driver.name} | ${driver.region} 
            </span> 
          </div>
          <div>
            <button type="button" class="btn btn-warning fs-6 " data-bs-toggle="modal"
                    data-bs-target="#offerModal1">Make An Offer</button>
            <p class="card-text lh-sm "><small class="text-muted ">Last updated 3 mins ago</small></p>
    
          </div>
        </li>
      `
    });

    driverList_rawHTML += `</ul></div>`
    node.driverPanel.innerHTML = ''
    node.driverPanel.innerHTML = driverList_rawHTML
  },
  displayInfoModal(id) {
    const driver_URL = INDEX_URL + `${id} `
    //loading spinner
    node.infoModalBody.innerHTML = `
    <div class="text-center">
      <div class="spinner-border text-secondary" role="status">
      <span class="sr-only">Loading...</span>
      </div>
    </div >
    `
    axios.get(driver_URL)
      .then((response) => {
        const driver = response.data
        let modalBody_rawHTML = ''
        modalBody_rawHTML = `
          <div class="my-3" style="width: 10rem;">
            <img src="${driver.avatar}" class="card-img-top rounded-circle" alt="...">
          </div>
          <div id="driver-modal-icon-panel" class="fs-5 d-flex justify-content-between  mb-3 ">
            <a href="mailto:${driver.email}" class="text-secondary opacity-50"><i class="fa-regular fa-envelope fa-lg"></i></a>
            <span class="text-secondary mx-2" data-id="${driver.id}">
              <i type="button" class="fa-regular fa-bookmark fa-lg switch-save-btn fas text-danger"  data-bs-dismiss="modal"  data-id="${driver.id}"></i>
            </span>
            <span class="text-secondary " data-id=${driver.id} >
              <i type="button" class="fa-solid fa-ban fa-lg switch-ban-btn opacity-50" data-bs-dismiss="modal" data-id="${driver.id}"></i>
            </span>
          </div>
          <h3 class="mb-0">${driver.name}</h3>
          <span>${driver.gender}</span>
          <span>${driver.age}</span>
          <span>${driver.region}</span>
        `
        node.infoModalBody.innerHTML = modalBody_rawHTML
        node.infoModalFooter.innerHTML = `
        <button type="button" class="btn btn-warning badge fs-6" data-bs-toggle="modal"
        data-bs-target="#offerModal1" data-id="${driver.id}">
          Make An Offer
        </button >
        `

      })
      .catch((err) => console.log(err))
  },
  dataOfPage(page) {
    const data = model.filteredDrivers.length ? model.filteredDrivers : model.savedDriverList
    const startIndex = (page - 1) * model.DRIVERS_PER_PAGE
    return data.slice(startIndex, startIndex + model.DRIVERS_PER_PAGE)
  },
  renderPaginator(dataAmount) {
    const totalOfPage = Math.ceil(dataAmount / model.DRIVERS_PER_PAGE)
    let paginator_rawHTML = ''
    //render icon(previous)
    if (model.currentPage === 1) {
      paginator_rawHTML = `
    <li class="page-item disabled">
      <a class="page-link previous" href="#">
        <i class="fa-solid fa-angle-left"></i>
      </a>
    </li>
  `
    } else {
      const previousPage = model.currentPage - 1
      paginator_rawHTML = `
    <li class="page-item">
      <a class="page-link previous" data-page="${previousPage}" href="#" >
        <i class="fa-solid fa-angle-left"></i>
      </a>
    </li >
  `
    }
    //render all pages & update active page
    for (let page = 1; page <= totalOfPage; page++) {
      if (page === model.currentPage) {
        paginator_rawHTML += `
        <li class="page-item page-number  active" aria - current="page" >
          <a class="page-link" href="#" data-page="${page}">${page}</a>
        </li>`
      } else {
        paginator_rawHTML += `
        <li class="page-item page-number"><a class="page-link" href="#" data-page="${page}">${page}</a></li> `
      }
    }
    //render icon(next)
    if (model.currentPage === totalOfPage) {
      paginator_rawHTML += `
      <li class="page-item disabled" >
        <a class="page-link next" href="#">
          <i class="fa-solid fa-angle-right"></i>
        </a>
      </li> `
    } else {
      const nextPage = model.currentPage + 1
      paginator_rawHTML += `
      <li class="page-item" >
        <a class="page-link next" data-page="${nextPage}" href="#">
          <i class="fa-solid fa-angle-right"></i>
        </a>
      </li >
  `
    }
    node.paginator.innerHTML = ''
    node.paginator.innerHTML = paginator_rawHTML
  },
}

const controller = {
  DefaultDriverPanel() {
    model.filteredDrivers = []
    model.currentPage = Number(1)
    model.currentDisplayMode = 'CARD'
    //loading spinner
    node.driverPanel.innerHTML = `
    <div class="text-center">
      <div class="spinner-border text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div> `
    view.renderPaginator(model.savedDriverList.length)
    view.displayDriversByCard(view.dataOfPage(Number(model.currentPage)))
  },
  renderDriverPanel() {
    if (model.currentDisplayMode === 'CARD') { view.displayDriversByCard(view.dataOfPage(Number(model.currentPage))) }
    if (model.currentDisplayMode === 'LIST') { view.displayDriversByList(view.dataOfPage(Number(model.currentPage))) }
  },
  UnSaveAndBanDriver(banId) {
    const banDriver = model.savedDriverList.find(driver => driver.id === banId)
    const driverListIndex = model.savedDriverList.findIndex(driver => driver.id === banId)
    if (driverListIndex === -1) return
    model.savedDriverList.splice(driverListIndex, 1)
    model.bannedDrivers.push(banDriver)
    localStorage.setItem('Banned_Driver_List', JSON.stringify(model.bannedDrivers))
    localStorage.setItem('Saved_Driver_List', JSON.stringify(model.savedDriverList))
  },
  unSaveDriver(toggleId) {
    const savedListIndex = model.savedDriverList.findIndex(savedItem => savedItem.id === toggleId)
    model.savedDriverList.splice(savedListIndex, 1)
    localStorage.setItem('Saved_Driver_List', JSON.stringify(model.savedDriverList))
  },
  changingDisplayMode() {
    node.displayModePanel.addEventListener('click', function onDisplayPanelClicked(event) {
      if (!event.target.dataset.displayMode) return
      if (event.target.tagName === 'I' && event.target.parentElement.matches('.active')) return
      if (event.target.matches('.active')) return
      node.displayByCardBtn.classList.toggle('active')
      node.displayByListBtn.classList.toggle('active')
      model.currentDisplayMode = event.target.dataset.displayMode
      controller.renderDriverPanel()
    })
  },
  changingPage() {
    node.paginator.addEventListener('click', function onPageClicked(event) {
      const data = model.filteredDrivers.length ? model.filteredDrivers : model.savedDriverList
      if (event.target.tagName !== 'A') return
      model.currentPage = Number(event.target.dataset.page)
      view.renderPaginator(data.length)
      controller.renderDriverPanel()
    })
  },
  searchingByKeyword() {
    node.searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
      event.preventDefault()
      const keyword = node.searchInput.value.trim().toLowerCase()
      model.filteredDrivers = model.savedDriverList.filter(driver =>
        driver.name.toLowerCase().includes(keyword)
      )
      if (model.filteredDrivers.length === 0) {
        return alert('Cannot find driver with keyword:' + keyword)
      }
      node.searchInput.value = ''
      view.renderPaginator(model.filteredDrivers.length)
      model.currentPage = 1
      controller.renderDriverPanel()


    })
  },
  clickOnDriverPanel() {
    node.driverPanel.addEventListener('click', function onPanelClicked(event) {
      const id = Number(event.target.dataset.id)
      if (event.target.matches('.switch-save-btn')) {
        event.target.classList.toggle('fas')
        event.target.classList.toggle('text-danger')
        controller.unSaveDriver(id)
      }

      view.displayInfoModal(id)
      view.renderPaginator(model.savedDriverList.length)
      controller.renderDriverPanel()
    })
  },
  clickOnInfoModal() {
    node.infoModal.addEventListener('click', function onModalClicked(event) {
      if (event.target.tagName !== 'I') return
      const id = Number(event.target.dataset.id)
      //User press unSave 
      if (event.target.matches('.switch-save-btn')) {
        event.target.classList.toggle('fas')
        event.target.classList.toggle('text-danger')
        event.target.classList.toggle('opacity-50')
        controller.unSaveDriver(id)
      }
      //User press Ban 
      if (event.target.matches('.switch-ban-btn')) {
        event.target.classList.toggle('text-danger')
        event.target.classList.toggle('opacity-50')
        controller.UnSaveAndBanDriver(id)
      }
      view.renderPaginator(model.savedDriverList.length)
      controller.renderDriverPanel()
    })
  },
  clickOnPageTitle() {
    node.pageTitleText.addEventListener('click', event => controller.DefaultDriverPanel())
  },
}

// global
controller.DefaultDriverPanel()
controller.changingPage()
controller.searchingByKeyword()
controller.clickOnDriverPanel()
controller.clickOnInfoModal()
controller.changingDisplayMode()
controller.clickOnPageTitle()

