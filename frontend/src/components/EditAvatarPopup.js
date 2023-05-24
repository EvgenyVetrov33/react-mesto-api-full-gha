import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onCloseEsc, onCloseOverlay, onUpdateAvatar, isLoading }) {
	const ref = React.useRef();

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateAvatar({
			avatar: ref.current.value
		});
	}

	React.useEffect(() => {
		ref.current.value = '';
	}, [isOpen]);

	return (
		<PopupWithForm
			isOpen={isOpen}
			onClose={onClose}
			onCloseEsc={onCloseEsc}
			onCloseOverlay={onCloseOverlay}
			onSubmit={handleSubmit}
			isLoading={isLoading}
			name='popupEditAvatar'
			title='Обновить аватар'
			submitButton='Обновить'
			submitBtnLoading='Обновление...'
			children={
				<label className="popup__label">
					<input id="avatar-input" ref={ref} name="avatar" className="popup__input" type="url" placeholder="Ссылка на аватар" required />
					<span id="avatar-error" className="error"></span>
				</label>
			}
		/>
	)
}

export default EditAvatarPopup;