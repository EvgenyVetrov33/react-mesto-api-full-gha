import { useEffect } from 'react';

function PopupWithForm({ isOpen, onClose, onCloseEsc, onCloseOverlay, onSubmit, isLoading, name, title, submitButton, submitBtnLoading, children }) {

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', onCloseEsc);
			document.addEventListener('mousedown', onCloseOverlay);
		} else {
			document.removeEventListener('keydown', onCloseEsc);
			document.removeEventListener('mousedown', onCloseOverlay);
		}
	}, [isOpen])

	return (
		<section className={`popup popup_type_${name} ${isOpen && `popup_opened`}`}>
			<div className="popup__container">
				<button onClick={onClose} className="popup__close" type="button"></button>
				<form name={`popup-${name}-form`} className="popup__form" onSubmit={onSubmit}>
					<h3 className="popup__title">{title}</h3>
					{children}
					<button className={`popup__button `} type="submit">{isLoading ? submitBtnLoading : submitButton}</button>
				</form>
			</div>
		</section>
	);
};

export default PopupWithForm;