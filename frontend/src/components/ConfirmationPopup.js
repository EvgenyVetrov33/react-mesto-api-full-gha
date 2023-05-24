function ConfirmationPopup({ card, onClose, name, title, onCardDelete }) {

	function handleDeleteClick() {
		onCardDelete(card);
		onClose();
	}

	return (
		<section className={`popup popup_type_${name} ${card && 'popup_opened'}`}>
			<div className="popup__container">
				<button onClick={onClose} className="popup__close" type="button"></button>
				<h3 className="popup__title-delete">{title}</h3>
				<div name="delete-form" className="popup__form popup__form-delete" noValidate>
					<button onClick={handleDeleteClick} className="popup__button" type="submit">Да</button>
				</div>
			</div>
		</section>
	);
};

export default ConfirmationPopup;