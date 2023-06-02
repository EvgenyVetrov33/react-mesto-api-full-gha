// class Api {
// 	constructor(options) {
// 		this._baseUrl = options.baseUrl;
// 		this._headers = options.headers;
// 	}

// 	_parseResponse(res) {
// 		if (res.ok) {
// 			return res.json();
// 		}
// 		return Promise.reject(`Ошибка: ${res.status}`)
// 	}

// 	// Получение карточек с сервера
// 	setInitialCards() {
// 		return fetch(`${this._baseUrl}/cards`, {
// 			headers: this._headers
// 		})
// 			.then(res => this._parseResponse(res));
// 	}

// 	// Добавление новой карточки через попап
// 	addCard(data) {
// 		return fetch(`${this._baseUrl}/cards`, {
// 			method: 'POST',
// 			headers: this._headers,
// 			body: JSON.stringify({
// 				name: data.name,
// 				link: data.link
// 			})
// 		})
// 			.then(res => this._parseResponse(res));
// 	}

// 	// Удаление карточки
// 	deleteCard(cardId) {
// 		return fetch(`${this._baseUrl}/cards/${cardId}`, {
// 			method: 'DELETE',
// 			headers: this._headers
// 		})
// 			.then(res => this._parseResponse(res));
// 	}

// 	// Ставим лайк карточке
// 	setLike(cardId) {
// 		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
// 			method: 'PUT',
// 			headers: this._headers
// 		})
// 			.then(res => this._parseResponse(res));
// 	}

// 	// Удаляем лайк
// 	deleteLike(cardId) {
// 		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
// 			method: 'DELETE',
// 			headers: this._headers
// 		})
// 			.then(res => this._parseResponse(res));
// 	}

// 	// Получение информации о пользователе с сервера
// 	getUserInfo() {
// 		return fetch(`${this._baseUrl}/users/me`, {
// 			headers: this._headers
// 		})
// 			.then(res => this._parseResponse(res));
// 	}

// 	// Редактирование информации о пользователе через попап
// 	editUserInfo(data) {
// 		return fetch(`${this._baseUrl}/users/me`, {
// 			method: 'PATCH',
// 			headers: this._headers,
// 			body: JSON.stringify(data),
// 		}).then(res => this._parseResponse(res));
// 	}

// 	// Редактирование аватара пользователя через попап
// 	editAvatar(data) {
// 		return fetch(`${this._baseUrl}/users/me/avatar`, {
// 			method: 'PATCH',
// 			headers: this._headers,
// 			body: JSON.stringify({
// 				avatar: data.avatar
// 			})
// 		})
// 			.then(res => this._parseResponse(res));
// 	}
// }

// const api = new Api({
// 	baseUrl: 'https://api.selltest.student.nomoredomains.rocks',
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'authorization': `Bearer ${localStorage.getItem('token')}`,
// 	},
// });

// export default api;
//==============================================================
class Api {
	constructor({
		baseUrl,
		headers
	}) {
		this._baseUrl = baseUrl;
		this._userUrl = `${this._baseUrl}/users/me`;
		this._cardsUrl = `${this._baseUrl}/cards`;
		this._token = headers['authorization'];
	}


	//метод получения информации о пользователе с сервера
	getUserInfo() {
		return fetch(this._userUrl, {
			headers: {
				authorization: this._token,
			},
			credentials: 'include',
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	//метод сохранения отредактированных данных пользователя на сервере
	saveUserChanges({
		name,
		about
	}) {
		return fetch(this._userUrl, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				name: name,
				about: about,
			})
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	//метод обновления аватара пользователя
	editAvatar(src) {
		return fetch(`${this._userUrl}/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				avatar: src,
			})
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	//метод получения карточек с сервера
	setInitialCards() {
		return fetch(this._cardsUrl, {
			headers: {
				authorization: this._token,
			},
			credentials: 'include',
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	//метод добавления новой карточки на сервер
	addCard({
		name,
		link
	}) {
		return fetch(this._cardsUrl, {
			method: 'POST',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				name: name,
				link: link,
			})
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	//метод удаления карточки пользователя с сервера
	deleteCard(cardId) {
		return fetch(`${this._cardsUrl}/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: this._token,
			},
			credentials: 'include',
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
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

	//метод постановки/удаления лайка на карточке
	// changeLikeCardStatus(cardId, isNotLiked) {
	// 	return fetch(`${this._cardsUrl}/${cardId}/likes`, {
	// 		method: isNotLiked ? "PUT" : "DELETE",
	// 		headers: {
	// 			authorization: this._token,
	// 		},
	// 		credentials: 'include',
	// 	})
	// 		.then(res => {
	// 			if (res.ok) {
	// 				return res.json();
	// 			}
	// 			return Promise.reject(`Ошибка: ${res.status}`);
	// 		})
	// }
}


//создаем экземпляр класса Api
const api = new Api({
	baseUrl: 'https://api.selltest.student.nomoredomains.rocks',
	headers: {
		'Content-Type': 'application/json'
	},
});

export default api;
