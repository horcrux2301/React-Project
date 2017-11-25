import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import SampleFishes from '../sample-fishes.js';

class App extends React.Component{

	constructor(){
		super();
		// getting initial state.
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
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
		fishes[`fish-${timestamp}`]=Fish;
		this.setState({fishes});
	}

	loadSamples(){
		this.setState({
			fishes: SampleFishes,
		});
	}


	render(){
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Sea Food"/>
				</div>
				<Order/>
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)
	}
}
 
export default App;

/*we cannot use this without super.*/