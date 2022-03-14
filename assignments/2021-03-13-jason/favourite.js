const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/';
const INDEX_URL = BASE_URL + 'api/v1/users/';
const userPanel = document.querySelector('.user-panel');
const favouriteUsers = JSON.parse(localStorage.getItem('favouriteUser')) || [];

// initialize toast element
const bsToast = document.querySelector('.toast');
const toastBody = bsToast.querySelector('.toast-body');
const toast = new bootstrap.Toast(bsToast);

renderUsers(favouriteUsers);

userPanel.addEventListener('click', onPanelClick);

function onPanelClick(e) {
	const target = e.target;
	if (target.classList.contains('user-avatar')) {
		const id = target.dataset.id;
		getUserInfo(id);
	} else if (target.classList.contains('fa-heart-broken')) {
		const id = Number(target.dataset.id);
		removeFromFavourite(id);
	}
}

function renderUsers(data) {
	let userHTML = ``;
	data.forEach(item => {
		userHTML += `
        <div class='col-12 col-md-3'>
            <div class='mb-2'>
                <div class="card user">
                    <img src=${item.avatar} class="card-img-top user-avatar" alt='users-avatar' data-bs-toggle="modal" data-bs-target="#user-info-modal" data-id=${item.id}'>
                    <div class="card-body d-flex justify-content-between align-items-center">
                    <h5 class="card-title">${item.name}</h5>
                    <span class='btn-like'><i class="fas fa-heart-broken fa-lg" data-id=${item.id}></i></span> 
                    </div>
                </div>
            </div>
        </div>
    `;
	});
	favouriteUsers.length
		? (userPanel.innerHTML = userHTML)
		: (userPanel.innerHTML = `<h2 class=' text-center mt-5'>Your favourite is empty...</h2>`);
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

function removeFromFavourite(targetID) {
	const targetIndex = favouriteUsers.findIndex(user => user.id === targetID);
	const targetUserName = favouriteUsers[targetIndex].name;
	favouriteUsers.splice(targetIndex, 1);
	localStorage.setItem('favouriteUser', JSON.stringify(favouriteUsers));
	renderUsers(favouriteUsers);
	// show toast element
	toastBody.textContent = `'${targetUserName}' has been removed from your favourite!`;
	toast.show();
}
