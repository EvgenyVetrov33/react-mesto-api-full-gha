import React from "react";
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onConfirmCardDelete }) {
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className="content page__content">
			<section className="profile content__profile">
				<img src={currentUser.avatar} className="profile__avatar" alt="Аватар" />
				<button onClick={onEditAvatar} className="profile__edit-avatar" type="button">
				</button>
				<div className="profile__info">
					<div className="profile__name">
						<h1 className="profile__title">{currentUser.name}</h1>
						<button onClick={onEditProfile} type="button" className="profile__edit-button"></button>
					</div>
					<p className="profile__paragraph">{currentUser.about}</p>
				</div>
				<button onClick={onAddPlace} type="button" className="profile__add-button"></button>
			</section>
			<section className="elements content__elements">
				{cards.map((card) => (
					<Card
						card={card}
						key={card._id}
						likes={card.likes.length}
						name={card.name}
						link={card.link}
						onCardClick={onCardClick}
						onCardLike={onCardLike}
						onConfirmCardDelete={onConfirmCardDelete}
					/>
				))}
			</section>
		</main>
	)
};

export default Main;