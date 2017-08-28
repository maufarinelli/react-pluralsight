import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

const Stars = (props) => {
	return (
		<div className="col-sm-5">
			{_.range(props.numberOfStarts).map(i => <i key={i} className="fa fa-star"></i>)}
		</div>
	);
}

const Button = (props) => {
	return (
		<div className="col-sm-2">
			<button>=</button>
		</div>
	);
}

const Answer = (props) => {
	return (
		<div className="col-sm-5">
			{props.selectedNumbers.map((number, i) =>
				<span
					key={i}
					onClick={() => props.unselectNumber(number)}
				>{number}</span>
			)}
		</div>
	);
}

const Numbers = (props) => {
	const numberClassName = (number) => {
		if(props.selectedNumbers.indexOf(number) >= 0) {
			return 'selected';
		}
	};

	return (
		<div className="card text-center">
			<div>
				{Numbers.list.map((number, i) =>
					<span
						key={i}
						className={numberClassName(number)}
						onClick={() => props.selectNumber(number)}
					>{number}</span>
				)}
			</div>
		</div>
	);
}
Numbers.list = _.range(1, 10);

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedNumbers: [],
			ramdomNumberOfStars: 1 + Math.floor(Math.random() * 9)
		};
	};

	selectNumber = (clickedNumber) => {
		if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {return;}
		this.setState(prevState => ({
			selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
		}));
	};

	unselectNumber = (clickedNumber) => {
		this.setState(prevState => ({
			selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
		}));
	};

	render() {
		const {selectedNumbers, ramdomNumberOfStars} = this.state;
		return (
			<div className="container">
				<h3>Play Nine</h3>
				<hr />
				<div className="row">
					<Stars numberOfStarts={this.state.ramdomNumberOfStars} />
					<Button />
					<Answer
						selectedNumbers={this.state.selectedNumbers}
						unselectNumber={this.unselectNumber} />
				</div>
				<br />
				<Numbers
					selectedNumbers={this.state.selectedNumbers}
					selectNumber={this.selectNumber} />
			</div>
		);
	}
}

class App extends Component {
	render() {
		return (
			<div>
				<Game />
			</div>
		);
	}
}

export default App;