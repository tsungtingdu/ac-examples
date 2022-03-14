const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/';
const INDEX_URL = BASE_URL + 'api/v1/users/';
const userPanel = document.querySelector('.user-panel');
const searchInput = document.querySelector('#search-input');
const sortDropdown = document.querySelector('#sortDropdown');
const pagination = document.querySelector('.pagination');
const settingSubmit = document.querySelector('#setting-submit');
const genderInput = document.querySelector('#gender-input');
const ageLowerInput = document.querySelector('#age-lower-input');
const ageUpperInput = document.querySelector('#age-upper-input');

const users = [];
let filteredUsers;
const favouriteUsers = JSON.parse(localStorage.getItem('favouriteUser')) || [];
// user's setting (by default show all users)
const setting = JSON.parse(localStorage.getItem('setting')) || {
	gender: 'all',
	ageLower: 22,
	ageUpper: 75,
};
const usersPerPage = 20;

// initialize toast element
const bsToast = document.querySelector('.toast');
const toastBody = bsToast.querySelector('.toast-body');
const toast = new bootstrap.Toast(bsToast);

// fill in the setting form value based on the latest setting
genderInput.value = setting.gender;
ageLowerInput.value = setting.ageLower;
ageUpperInput.value = setting.ageUpper;

axios
	.get(INDEX_URL)
	.then(response => {
		// filter out suitable users based on user's setting
		const data = response.data.results.filter(user => {
			const userAge = user.age;
			const userGender = user.gender;
			if (setting.gender !== 'all') {
				return (
					userGender === setting.gender &&
					userAge >= setting.ageLower &&
					userAge <= setting.ageUpper
				);
			} else {
				return userAge >= setting.ageLower && userAge <= setting.ageUpper;
			}
		});
		users.push(...data);
		renderUsers(getUsersByPage(1));
		renderPaginator(users.length);
	})
	.catch(error => {
		console.log(error);
	});

userPanel.addEventListener('click', onPanelClick);
searchInput.addEventListener('input', searchUser);
sortDropdown.addEventListener('click', onSort);
pagination.addEventListener('click', goToPage);
settingSubmit.addEventListener('click', updateSetting);

// functions
function onPanelClick(e) {
	const target = e.target;
	if (target.classList.contains('user-avatar')) {
		const id = target.dataset.id;
		getUserInfo(id);
	} else if (target.classList.contains('fa-heart')) {
		const id = Number(target.dataset.id);
		// if the user has already been added to favourite, remove from favourite, else add to favourite.
		target.classList.contains('fas') ? removeFromFavourite(id) : addToFavourite(id);
		// toggle like button state.
		toggleLike(target);
	}
}

function renderUsers(data) {
	let userHTML = ``;
	// if the user has been liked, render like button with active state.
	data.forEach(item => {
		if (favouriteUsers.some(user => user.id === item.id)) {
			userHTML += `
            <div class='col-12 col-md-3'>
                <div class='mb-2'>
                    <div class="card user">
                        <img src=${item.avatar} class="card-img-top user-avatar" alt='users-avatar' data-bs-toggle="modal" data-bs-target="#user-info-modal" data-id=${item.id}>
                        <div class="card-body d-flex justify-content-between align-items-center">
                        <h5 class="card-title">${item.name}</h5>
                        <span class='btn-like'><i class="fas fa-heart fa-lg" data-id=${item.id}></i></span> 
                        </div>
                    </div>
                </div>
            </div>
        `;
		} else {
			userHTML += `
            <div class='col-md-3'>
                <div class='mb-2'>
                    <div class="card user">
                        <img src=${item.avatar} class="card-img-top user-avatar" alt='users-avatar' data-bs-toggle="modal" data-bs-target="#user-info-modal" data-id=${item.id}>
                        <div class="card-body d-flex justify-content-between align-items-center">
                        <h5 class="card-title">${item.name}</h5>
                        <span class='btn-like'><i class="far fa-heart fa-lg" data-id=${item.id}></i></span> 
                        </div>
                    </div>
                </div>
            </div>    
        `;
		}
	});
	userPanel.innerHTML = userHTML;
}

function getUserInfo(targetID) {
	axios
		.get(`${INDEX_URL}${targetID}`)
		.then(response => {
			const user = response.data;
			renderUserInfo(user);
		})
		.catch(error => {
			console.log(error);
		});
}

function renderUserInfo(data) {
	const avatar = document.querySelector('#user-info-avatar');
	const name = document.querySelector('#user-info-name');
	const gender = document.querySelector('#user-info-gender');
	const age = document.querySelector('#user-info-age');
	const region = document.querySelector('#user-info-region');
	const bday = document.querySelector('#user-info-bday');
	const email = document.querySelector('#user-info-email');
	avatar.src = data.avatar;
	name.innerText = `${data.name}  ${data.surname}`;
	gender.innerText = data.gender;
	age.innerText = data.age;
	region.innerText = `Region: ${data.region}`;
	bday.innerText = `Birthday: ${data.birthday}`;
	email.innerText = `Email: ${data.email}`;
}

function searchUser(e) {
	const userName = this.value.trim();
	const regExp = new RegExp(userName, 'gi');
	filteredUsers = users.filter(user => user.name.match(regExp));
	if (!filteredUsers.length) {
		userPanel.innerHTML = `<h2 class='mt-5 text-center'>Sorry, no matches!</h2>`;
		renderPaginator(filteredUsers.length);
		return;
	}
	renderUsers(getUsersByPage(1));
	renderPaginator(filteredUsers.length);
}

function addToFavourite(targetID) {
	const targetUser = users.find(user => user.id === targetID);
	const found = favouriteUsers.some(user => user.id === targetID);
	if (found) return alert('User already in your favourite!');
	favouriteUsers.push(targetUser);
	localStorage.setItem('favouriteUser', JSON.stringify(favouriteUsers));
	// show toast element
	toastBody.textContent = `'${targetUser.name}' has been added to your favourite!`;
	toast.show();
}

function removeFromFavourite(targetID) {
	const targetIndex = favouriteUsers.findIndex(user => user.id === targetID);
	const targetUserName = favouriteUsers[targetIndex].name;
	favouriteUsers.splice(targetIndex, 1);
	localStorage.setItem('favouriteUser', JSON.stringify(favouriteUsers));
	// show toast element
	toastBody.textContent = `'${targetUserName}' has been removed from your favourite!`;
	toast.show();
}

function renderPaginator(amount) {
	const pages = Math.ceil(amount / usersPerPage);
	let rawHTML = ``;
	for (let i = 1; i <= pages; i++) {
		rawHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
	}
	pagination.innerHTML = rawHTML;
}

function getUsersByPage(page) {
	const startIndex = (page - 1) * usersPerPage;
	const data = filteredUsers ? filteredUsers : users;
	const result = data.slice(startIndex, startIndex + usersPerPage);
	return result;
}

function goToPage(e) {
	const target = e.target;
	if (target.tagName === 'A') {
		const currentPage = Number(target.innerText);
		renderUsers(getUsersByPage(currentPage));
	}
}

function toggleLike(element) {
	element.classList.toggle('far');
	element.classList.toggle('fas');
}

function onSort(e) {
	const target = e.target;
	const data = filteredUsers ? filteredUsers : users;
	if (target.dataset.action === 'nameAsc') {
		sortNameAsc(data);
	} else if (target.dataset.action === 'nameDsc') {
		sortNameDsc(data);
	} else {
		sortAge(data);
	}
}

function sortNameAsc(data) {
	data.sort((a, b) => {
		const nameA = a.name;
		const nameB = b.name;
		// if return > 0, sort b before a, else if return < 0, sort a before b
		return nameA > nameB ? 1 : -1;
	});
	renderUsers(getUsersByPage(1));
	renderPaginator(data.length);
}

function sortNameDsc(data) {
	data.sort((a, b) => {
		const nameA = a.name;
		const nameB = b.name;
		// if return < 0, sort b before a, else if return < 0, sort a before b
		return nameA < nameB ? 1 : -1;
	});
	renderUsers(getUsersByPage(1));
	renderPaginator(data.length);
}

function sortAge(data) {
	data.sort((a, b) => {
		const ageA = new Date(a.birthday);
		const ageB = new Date(b.birthday);
		// if return > 0, sort b before a, else if return < 0, sort a before b
		return ageA < ageB ? 1 : -1;
	});
	renderUsers(getUsersByPage(1));
	renderPaginator(data.length);
}

function updateSetting() {
	const gender = genderInput.value;
	const ageLower = Number(ageLowerInput.value);
	const ageUpper = Number(ageUpperInput.value);
	setting.gender = gender;
	setting.ageUpper = ageUpper;
	setting.ageLower = ageLower;
	localStorage.setItem('setting', JSON.stringify(setting));
}
