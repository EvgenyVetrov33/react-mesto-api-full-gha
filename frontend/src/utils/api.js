class Api {
	constructor(options, headers) {
		this._baseUrl = options.baseUrl;
		this._token = headers['authorization'];
		// this._headers = options.headers;
	}

	_parseResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	}

	// Получение карточек с сервера
	setInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: {
				authorization: this._token,
			},
			credentials: 'include',
		})
			.then(res => this._parseResponse(res));
	}

	// Добавление новой карточки через попап
	addCard(data) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				name: data.name,
				link: data.link
			})
		})
			.then(res => this._parseResponse(res));
	}

	// Удаление карточки
	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: this._token,
			},
			credentials: 'include',
		})
			.then(res => this._parseResponse(res));
	}

	// Ставим лайк карточке
	setLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: {
				authorization: this._token,
			},
			credentials: 'include',
		})
			.then(res => this._parseResponse(res));
	}

	// Удаляем лайк
	deleteLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: {
				authorization: this._token,
			},
			credentials: 'include',
		})
			.then(res => this._parseResponse(res));
	}

	// Получение информации о пользователе с сервера
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._token,
			},
			credentials: 'include',
		})
			.then(res => this._parseResponse(res));
	}

	// Редактирование информации о пользователе через попап
	editUserInfo(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		}).then(res => this._parseResponse(res));
	}

	// Редактирование аватара пользователя через попап
	editAvatar(data) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				avatar: data.avatar
			})
		})
			.then(res => this._parseResponse(res));
	}
}

const api = new Api({
	baseUrl: 'https://api.selltest.student.nomoredomains.rocks',
	headers: {
		'Content-Type': 'application/json'
		// 'authorization': `Bearer ${localStorage.getItem('jwt')}`,
	},
});

export default api;
