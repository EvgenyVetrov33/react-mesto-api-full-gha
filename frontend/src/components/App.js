import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import '../index.css';
import api from '../utils/api';
import { signUp, signIn, checkToken } from '../utils/apiAuth';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Footer from './Footer';
import ConfirmationPopup from './ConfirmationPopup'
import ImagePopup from "./ImagePopup"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import checkmarkImg from '../images/checkmark.svg'
import crossImg from '../images/cross.svg'

export default function App() {
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
	const [selectedCard, setSelectedCard] = useState({})
	const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(null)
	const [isLoading, setLoading] = useState(false)
	const [currentUser, setCurrentUser] = useState({})
	const [cards, setCards] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [emailValue, setEmailValue] = useState(null);
	const [popupStatus, setPopupStatus] = useState({ image: '', message: '' });
	const [infoTooltip, setInfoTooltip] = useState(false);
	const navigate = useNavigate();

	function handleLogin(email, password) {
		signIn(email, password)
			.then((res) => {
				localStorage.setItem('jwt', res.token);
				setIsLoggedIn(true);
				setEmailValue(email);
				navigate("/");
			})
			.catch(() => {
				setPopupStatus({ image: crossImg, message: 'Что-то пошло не так! Попробуйте еще раз.' });
				setInfoTooltip(true);
			});
	};

	function handleRegister(email, password) {
		signUp(email, password)
			.then(() => {
				setPopupStatus({ image: checkmarkImg, message: 'Вы успешно зарегистрировались!' });
				navigate("/signin");
			})
			.catch(() => {
				setPopupStatus({ image: crossImg, message: 'Что-то пошло не так! Попробуйте еще раз.' });
			})
			.finally(handleInfoTooltip);
	};

	function handleLogOut() {
		setIsLoggedIn(false);
		localStorage.removeItem('jwt');
		setEmailValue(null);
		navigate("/signin");
	};

	function handleInfoTooltip() {
		setInfoTooltip(true);
	};

	useEffect(() => {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			checkToken(jwt)
				.then((res) => {
					if (res) {
						setIsLoggedIn(true);
						setEmailValue(res.email);
						navigate('/');
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [navigate]);

	useEffect(() => {
		if (isLoggedIn) {
			Promise.all([api.getUserInfo(), api.setInitialCards()]).then(([profileInfo, card]) => {
				setCurrentUser(profileInfo);
				setCards(card);
			}).catch((err) => {
				console.error(err)
			})
		}
	}, [isLoggedIn]);

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i === currentUser._id);

		if (!isLiked) {
			api.setLike(card._id, !isLiked).then((newCard) => {
				setCards((state) => state.map((c) => (c._id === card._id ? newCard.card : c)));
			}).catch((err) => {
				console.error(err);
			});
		} else {
			api.deleteLike(card._id, !isLiked).then((newCard) => {
				setCards((state) => state.map((c) => (c._id === card._id ? newCard.card : c)));
			}).catch((err) => {
				console.error(err);
			});
		}
	}

	function handleEditProfileClick() {
		setEditProfilePopupOpen(true);
	};

	function handleUpdateUser(data) {
		setLoading(true);
		api.editUserInfo(data).then((newUser) => {
			setCurrentUser(newUser);
			closeAllPopups();
		}).catch((err) => {
			console.error(err);
		})
			.finally(() => { setLoading(false) });
	}

	function handleEditAvatarClick() {
		setEditAvatarPopupOpen(true);
	};

	function handleUpdateAvatar(data) {
		setLoading(true);
		api.editAvatar(data).then((newAvatar) => {
			setCurrentUser(newAvatar);
			closeAllPopups();
		}).catch((err) => {
			console.error(err);
		}).finally(() => { setLoading(false) });
	}

	function handleAddPlaceClick() {
		setAddPlacePopupOpen(true);
	};

	function handleAddPlaceSubmit(data) {
		setLoading(true);
		api.addCard(data).then((newCard) => {
			setCards([newCard, ...cards]);
			closeAllPopups();
		}).catch((err) => {
			console.error(err);
		}).finally(() => { setLoading(false) });
	}

	function handleConfimationClick(card) {
		setConfirmationPopupOpen(card);
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id).then(() => {
			setCards((items) => items.filter((c) => c._id !== card._id && c));
		}).catch((err) => {
			console.error(err);
		});
	}

	function closeAllPopups() {
		setEditProfilePopupOpen(false)
		setAddPlacePopupOpen(false)
		setEditAvatarPopupOpen(false)
		setSelectedCard({})
		setConfirmationPopupOpen(null);
		setInfoTooltip(false);
	}

	function closePopupWithEsc(event) {
		if (event.key === 'Escape') {
			closeAllPopups();
		}
	}

	function closePopupWithClickOnOverlay(event) {
		if (event.target.classList.contains('popup_opened')) {
			closeAllPopups();
		}
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="root">
				<div className="page">
					<Routes>
						<Route exact path='/'
							element={
								<>
									<Header
										title='Выйти'
										route=''
										email={emailValue}
										onClick={handleLogOut}
									/>
									<ProtectedRoute
										component={Main}
										isLoggedIn={isLoggedIn}
										onEditProfile={handleEditProfileClick}
										onAddPlace={handleAddPlaceClick}
										onEditAvatar={handleEditAvatarClick}
										onCardClick={handleCardClick}
										onCardLike={handleCardLike}
										cards={cards}
										onConfirmCardDelete={handleConfimationClick}
									/>
								</>
							}
						/>

						<Route path='/signup'
							element={
								<>
									<Header
										title='Войти'
										route='/signin'
									/>
									<Register
										onRegister={handleRegister}
									/>
								</>
							}
						/>

						<Route path='/signin'
							element={
								<>
									<Header
										title='Регистрация'
										route='/signup'
									/>
									<Login
										onLogin={handleLogin}
									/>
								</>
							}
						/>

						<Route exact path="*"
							element={
								isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
							}
						/>
					</Routes>

					<Footer />

					<InfoTooltip
						popupStatus={popupStatus}
						isOpen={infoTooltip}
						onClose={closeAllPopups}
					/>

					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onCloseEsc={closePopupWithEsc}
						onCloseOverlay={closePopupWithClickOnOverlay}
						onUpdateUser={handleUpdateUser}
						isLoading={isLoading}
					/>

					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onCloseEsc={closePopupWithEsc}
						onCloseOverlay={closePopupWithClickOnOverlay}
						onUpdateAvatar={handleUpdateAvatar}
						isLoading={isLoading}
					/>

					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onCloseEsc={closePopupWithEsc}
						onCloseOverlay={closePopupWithClickOnOverlay}
						onAddPlace={handleAddPlaceSubmit}
						isLoading={isLoading}
					/>

					<ConfirmationPopup
						card={isConfirmationPopupOpen}
						onClose={closeAllPopups}
						name='confirm-deletion'
						title='Вы уверены?'
						onCardDelete={handleCardDelete}
					/>

					<ImagePopup
						card={selectedCard}
						onClose={closeAllPopups}
					/>
				</div>
			</div>
		</CurrentUserContext.Provider>
	);
}
