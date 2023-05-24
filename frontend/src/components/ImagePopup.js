function ImagePopup({ card, onClose }) {
	return (
		<div className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}>
			<div className="popup__body-container">
				<figure className="popup__content-figure">
					<img className="popup__image-img" src={card.link} alt={card.name} />
					<figcaption className="popup__title-fig">{card.name}</figcaption>
					<button
						className="popup__close popup__close_image_popup"
						type="button"
						onClick={onClose}
					></button>
				</figure>
			</div>
		</div>
	)
}

export default ImagePopup;