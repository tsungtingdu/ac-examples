const BASE_URL = "https://lighthouse-user-api.herokuapp.com/api/v1/users/"
const modal = document.querySelector("#exampleModal")
const dataPanel = document.querySelector("#dataPanel")
const container = document.querySelector(".container")
const searchBar = document.querySelector("#searchBar")
const pagination = document.querySelector(".pagination")
const USERS_PER_PAGE = 20
let users = []
let newData = []
let filteredUsers = []

// Default Page
axios
  .get(BASE_URL)
  .then(function (response) {
    // handle success
    users = response.data.results;
    newData = filteredUsers.length ? filteredUsers : users
    render(getUsersByPage(1));
    let pages = Math.ceil(response.data.results.length / USERS_PER_PAGE);
    pagination.innerHTML = "";
    for (page = 1; page <= pages; page++) {
      pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#">${page}</a></li>`;
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// Show Modal
container.addEventListener("click", function (event) {
  let target = event.target;
  let id = target.dataset.id;
  // Make a request for a user with a given ID
  axios
    .get(`${BASE_URL}${id}`)
    .then(function (response) {
      // handle success
      modalRender(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

// Add to favorites
modal.addEventListener("click", function clickOnFavorites(event) {
  let target = event.target
  let targetId = Number(event.target.dataset.id)
  if (target.matches('#addToFavorites')) {
    axios
      .get(BASE_URL)
      .then(function (response) {
        // handle success
        const list = JSON.parse(localStorage.getItem('favoriteUsers')) || []
        let users = response.data.results
        let user = users.find((user) => user.id === targetId)
        if (list.some((user) => user.id === targetId)) {
          return alert('This movie has been already added')
        }
        list.push(user)
        localStorage.setItem('favoriteUsers', JSON.stringify(list))
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
})


// Search Bar
searchBar.addEventListener("submit", function onSearchFormSubmitted(event) {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();

  if (!keyword.length) {
    return alert("Please enter a valid string");
  }

  axios
    .get(BASE_URL)
    .then(function (response) {
      // handle success
      let users = response.data.results; // 這是陣列
      filteredUsers = users.filter((
        user // 篩選陣列users
      ) => user.name.toLowerCase().includes(keyword));
      if (filteredUsers.length === 0) {
        return alert(`No results found for your search "${keyword}"`);
      }
      render(filteredUsers); // 渲染篩選出來的filterUsers
      // new pagination after search
      let pages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
      pagination.innerHTML = "";
      for (page = 1; page <= pages; page++) {
        pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#">${page}</a></li>`;
      }
      // Default page(1) after search 
      newData = filteredUsers.length ? filteredUsers : users
      render(getUsersByPage(1))

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

// Pagination
pagination.addEventListener("click", function (event) {
  let target = event.target.innerHTML; // page number

  axios
    .get(BASE_URL)
    .then(function (response) {
      // handle success
      users = response.data.results;
      newData = filteredUsers.length ? filteredUsers : users
      render(getUsersByPage(target));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

// -----Functions-----
function render(data) {
  let userContent = "";
  for (i = 0; i < data.length; i++) {
    userContent += `<div class="card m-4" style="width: 9rem;">
  <img src="${data[i].avatar}" class="card-img-top" data-id=${data[i].id} alt="..." data-toggle="modal" data-target="#exampleModal">
  <div class="card-body py-2">
    <p class="card-text">${data[i].name}</p>
  </div>
</div>`;
    dataPanel.innerHTML = userContent;
  }
}

function modalRender(data) {
  modal.innerHTML = `
        <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h2 class="modal-title" id="exampleModalLabel">${data.name} ${data.surname}</h2>
        </div>
        <div class="modal-body">
          <div class="card border-0">
            <img src="${data.avatar}" class="card-img-top rounded-circle mb-3" alt="...">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Age: ${data.age}</li>
              <li class="list-group-item">Gender: ${data.gender}</li>
              <li class="list-group-item">Region: ${data.region}</li>
              <li class="list-group-item">Birthday: ${data.birthday}</li>
              <li class="list-group-item">Email: ${data.email}</li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" id="addToFavorites" data-id="${data.id}" data-dismiss="modal">Add to favorites</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
    `;
}

function getUsersByPage(page) {
  //計算起始 index
  const startIndex = (page - 1) * USERS_PER_PAGE;
  //回傳切割後的新陣列
  return newData.slice(startIndex, startIndex + USERS_PER_PAGE);
}
