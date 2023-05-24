import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onCloseEsc, onCloseOverlay, onUpdateUser, isLoading }) {
	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');
	const currentUser = React.useContext(CurrentUserContext);

	React.useEffect(() => {
		if (isOpen) {
			setName(currentUser.name);
			setDescription(currentUser.about);
		}
	}, [currentUser, isOpen]);

	function handleNameChange(event) {
		setName(event.target.value);
	}

	function handleDescriptionChange(event) {
		setDescription(event.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateUser({
			name,
			about: description
		});
	}

	return (
		<PopupWithForm
			isOpen={isOpen}
			onClose={onClose}
			onCloseEsc={onCloseEsc}
			onCloseOverlay={onCloseOverlay}
			onSubmit={handleSubmit}
			isLoading={isLoading}
			name='popupEditProfile'
			title='Редактировать профиль'
			submitButton='Сохранить'
			submitBtnLoading='Сохранение...'
			children={
				<>
					<label className="popup__label">
						<input id="text-name" name="inputName" className="popup__input popup__input_input_name" value={name} onChange={handleNameChange} type="text" placeholder="Имя" minLength="2" maxLength="40" required />
						<span id="text-name-error" className="error"></span>
					</label>
					<label className="popup__label">
						<input id="text-profile" name="inputJob" className="popup__input popup__input_input_job" value={description} onChange={handleDescriptionChange} type="text" placeholder="О себе" minLength="2" maxLength="200" required />
						<span id="text-profile-error" className="error"></span>
					</label>
				</>
			}
		/>
	)
}

export default EditProfilePopup;