import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import SampleFishes from '../sample-fishes.js';
import fish from './fish';
import base from '../base';
class App extends React.Component{


	state={
			fishes: {},
			order: {},
		};

	constructor(){
		super();
		// getting initial state.
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.updatefish = this.updatefish.bind(this);
		this.removefish = this.removefish.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
	}

	componentWillMount(){
		// this runs right before the app is rendered
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{
			context: this,
			state: 'fishes'
		});
		// check if there is any order in local storage
		const localstorageref = localStorage.getItem(`order-${this.props.params.storeId}`);
		// console.log({localstorageref});
		if(localstorageref){
			this.setState({
				order: JSON.parse(localstorageref)
			});
		}
	}

	componentWillUnmount(){
		base.removeBinding(this.ref); 
	}

	componentWillUpdate(nextProps, nextState){
		console.log('Something Changes');
		// console.log(nextProps);
		// console.log(nextState);
		localStorage.setItem(`order-${this.props.params.storeId}`,JSON.stringify(nextState.order));
	}

	addFish(Fish){
		//update our state.
		// set state.
		const fishes = {...this.state.fishes};
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`]=Fish;
		this.setState({fishes});
	}

	updatefish(key,updatedfish){
		// key is the key of the fish that we want to update.
		const fishes = {...this.state.fishes};
		fishes[key]=updatedfish;
		this.setState({fishes});
	}

	removefish(key){
		const fishes = {...this.state.fishes};
		fishes[key]=null;
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
		this.setState({order});
	}

	removeFromOrder(key){
		const order = {...this.state.order};
		delete order[key];
		this.setState({order});
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
								.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
						}
					</ul>
				</div>
				<Order  
					fishes={this.state.fishes} 
					order={this.state.order}
					params={this.props.params}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory 
					removefish={this.removefish} 
					updatefish={this.updatefish} 
					addFish={this.addFish} 
					loadSamples={this.loadSamples} 
					fishes={this.state.fishes}
					storeId = {this.props.params.storeId} 
				/>
			</div>
		)
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

 
export default App;

/*we cannot use this without super.*/