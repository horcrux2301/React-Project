import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import SampleFishes from '../sample-fishes.js';
import Fish from './Fish';

class App extends React.Component{

	constructor(){
		super();
		// getting initial state.
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.state={
			fishes: {},
			order: {},
		};
	}

	addFish(Fish){
		//update our state.
		// set state.
		const fishes = {...this.state.fishes};
		const timestamp = Date.now();
		fishes[`${timestamp}`]=Fish;
		this.setState({fishes});
	}

	loadSamples(){
		this.setState({
			fishes: SampleFishes,
		});
	}


	addToOrder(key){
		const order = {...this.state.order}; //spread
		// update the new fish added
		order[key] = order[key]+1 || 1;
		// update our state
		this.setState=({order});
	}

	render(){
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Sea Food"/>
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish key={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
						}
					</ul>
				</div>
				<Order/>
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)
	}
}
 
export default App;

/*we cannot use this without super.*/