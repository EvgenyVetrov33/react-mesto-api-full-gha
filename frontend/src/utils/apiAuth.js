// const checkResponse = (res) => {
// 	if (res.ok) {
// 		return res.json();
// 	}
// 	return Promise.reject(res.status);
// }

// const BASE_URL = 'https://api.selltest.student.nomoredomains.rocks';

// const signUp = (email, password) => {
// 	const requestUrl = BASE_URL + '/signup';
// 	return fetch(requestUrl, {
// 		method: 'POST',
// 		credentials: 'include',
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ email, password }),
// 	}).then(checkResponse);
// }

// const signIn = (email, password) => {
// 	const requestUrl = BASE_URL + '/signin';
// 	return fetch(requestUrl, {
// 		method: 'POST',
// 		credentials: 'include',
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ email, password }),
// 	}).then(checkResponse);
// }

// const checkToken = (token) => {
// 	const requestUrl = BASE_URL + '/users/me';
// 	return fetch(requestUrl, {
// 		mode: 'no-cors',
// 		method: 'GET',
// 		credentials: 'include',
// 		headers: {
// 			"Content-Type": "application/json",
// 			'Authorization': `Bearer ${token}`,
// 		},
// 	}).then(checkResponse);
// }

// export { signUp, signIn, checkToken };
//========================================
const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
}

const BASE_URL = 'https://api.selltest.student.nomoredomains.rocks';

const signUp = (password, email) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			password,
			email,
		})
	})
		.then(checkResponse);
};

const signIn = (password, email) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			password,
			email,
		})
	})
		.then(checkResponse);
}

const checkToken = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	})
		.then(checkResponse);
}

export { signUp, signIn, checkToken };
