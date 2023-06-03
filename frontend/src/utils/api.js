class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
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
		const token = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/cards`, {
			// headers: this._headers
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		})
			.then(res => this._parseResponse(res));
	}

	// Добавление новой карточки через попап
	addCard(data) {
		const token = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			// headers: this._headers,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: data.name,
				link: data.link
			})
		})
			.then(res => this._parseResponse(res));
	}

	// Удаление карточки
	deleteCard(cardId) {
		const token = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			// headers: this._headers
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		})
			.then(res => this._parseResponse(res));
	}

	// Ставим лайк карточке
	setLike(cardId) {
		const token = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'PUT',
			// headers: this._headers
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		})
			.then(res => this._parseResponse(res));
	}

	// Удаляем лайк
	deleteLike(cardId) {
		const token = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'DELETE',
			// headers: this._headers
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		})
			.then(res => this._parseResponse(res));
	}

	// Получение информации о пользователе с сервера
	getUserInfo() {
		const token = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/users/me`, {
			// headers: this._headers
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		})
			.then(res => this._parseResponse(res));
	}

	// Редактирование информации о пользователе через попап
	editUserInfo(data) {
		const token = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			// headers: this._headers,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		}).then(res => this._parseResponse(res));
	}

	// Редактирование аватара пользователя через попап
	editAvatar(data) {
		const token = localStorage.getItem("jwt");
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			// headers: this._headers,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
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
		'Content-Type': 'application/json',
		'authorization': `Bearer ${localStorage.getItem('jwt')}`,
	},
});

export default api;
