class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
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
			headers: this._headers
		})
			.then(res => this._parseResponse(res));
	}

	// Добавление новой карточки через попап
	addCard(data) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
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
			headers: this._headers
		})
			.then(res => this._parseResponse(res));
	}

	// Ставим лайк карточке
	setLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: this._headers
		})
			.then(res => this._parseResponse(res));
	}

	// Удаляем лайк
	deleteLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: this._headers
		})
			.then(res => this._parseResponse(res));
	}

	// Получение информации о пользователе с сервера
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers
		})
			.then(res => this._parseResponse(res));
	}

	// Редактирование информации о пользователе через попап
	editUserInfo(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(data),
		}).then(res => this._parseResponse(res));
	}

	// Редактирование аватара пользователя через попап
	editAvatar(data) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: data.avatar
			})
		})
			.then(res => this._parseResponse(res));
	}
}

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
	headers: {
		authorization: '56c23e37-2d26-4f99-806c-d72ff6532f25',
		'Content-Type': 'application/json'
	}
});

export default api;