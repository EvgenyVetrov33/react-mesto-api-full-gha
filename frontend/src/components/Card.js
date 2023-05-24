import React from "react"
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, name, link, likes, onCardClick, onCardLike, onConfirmCardDelete }) {
	const currentUser = React.useContext(CurrentUserContext);

	const isOwn = card.owner._id === currentUser._id;
	const cardDeleteButtonClassName = (
		`element__button-delete ${!isOwn && 'element__button-delete_hidden'}`
	);

	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (
		`element__button-like ${isLiked && 'element__button-like_focus'}`
	);

	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card);
	}

	function handleConfirmClick() {
		onConfirmCardDelete(card);
	}

	return (
		<div className="element elements__element">
			<button onClick={handleConfirmClick} className={cardDeleteButtonClassName} type="button"></button>
			<img
				className="element__image"
				src={link}
				alt={name}
				onClick={handleClick}
			/>
			<div className="element__caption">
				<h2 className="element__title">{name}</h2>
				<div className="element__likes">
					<button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
					<p className="element__likes-number">{likes}</p>
				</div>
			</div>
		</div>
	)
}

export default Card;