export const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
}

export const BASE_URL = 'https://api.selltest.student.nomoredomains.rocks';

export const signUp = (email, password) => {
	const requestUrl = BASE_URL + '/signup';
	return fetch(requestUrl, {
		method: 'POST',
		// credentials: 'include',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	}).then(checkResponse);
}

export const signIn = (email, password) => {
	const requestUrl = BASE_URL + '/signin';
	return fetch(requestUrl, {
		method: 'POST',
		// credentials: 'include',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	}).then(checkResponse);
}

export const checkToken = (token) => {
	const requestUrl = BASE_URL + '/users/me';
	return fetch(requestUrl, {
		mode: 'no-cors',
		method: 'GET',
		// credentials: 'include',
		headers: {
			"Content-Type": "application/json",
			'Authorization': `Bearer ${token}`,
		},
	}).then(checkResponse);
}

// export { signUp, signIn, checkToken };