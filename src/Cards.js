import React, { Component } from 'react';
import axios from 'axios';

const Card = (props) => {
	return (
		<div>
			<img width="75" src={props.avatar_url} />
			<div style={{display: 'inline-block', marginLeft: 10}}>
				<p style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</p>
				<p>{props.company}</p>
			</div>
		</div>
	);
};

const CardList = (props) => {
	return (
		<div>
			{props.cards.map(card => <Card key={card.id} {...card} />)}
			<Card />
		</div>
	);
};

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: ''
		};
	};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log('Submitted : ', this.state.unserName);
		axios.get(`https://api.github.com/users/${this.state.userName}`)
			.then(res => {
				this.props.onSubmit(res.data);
				this.setState({userName: ''});
			});
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					//ref={(input) => this.userNameInput = input}
					value={this.state.userName}
					onChange={(event) => this.setState({userName: event.target.value})}
					type="text"
					placeholder="Github username"
					required />
				<button type="submit">Add card</button>
			</form>
		);
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [
				{
					name: 'Mauricio Farinelli',
					avatar_url: 'https://avatars2.githubusercontent.com/u/1319702?v=4',
					company: 'Facebook'
				},
				{
					name: 'Marc Lemieux',
					avatar_url: 'https://avatars1.githubusercontent.com/u/781844?v=4',
					company: 'Facebook'
				}
			]
		};
	};

	addNewCard = (cardInfo) => {
		this.setState(prevState => ({
			cards: prevState.cards.concat(cardInfo)
		}));
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.addNewCard} />
				<CardList cards={this.state.cards} />
			</div>
		);
	}
}

export default App;