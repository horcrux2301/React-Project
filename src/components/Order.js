import React from 'react';
import {formatPrice} from '../helpers'
class Order extends React.Component{

	constructor(){
		super();
		this.renderOrder = this.renderOrder.bind(this);
	}


	renderOrder(key) {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const removButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>; 
		// console.log(this.props.fishes[key].status);
		if(!fish || fish.status==='unavailable'){
			// console.log(fish.name);
			return <li key={key}> Sorry, {fish? fish.name : 'fish'} is unavailable {removButton}</li>
			
		}

		return(
			<li key={key}>
			<span>{count}lbs{fish.name}</span>
			<span className="price">{formatPrice(count * fish.price)} {removButton}</span>
			</li>
		)
	}



	render(){

		const orderID = Object.keys(this.props.order);
		const total = orderID.reduce((prevTotal,key)=> {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status === 'available';
			if(isAvailable){
				console.log(count);
				console.log(fish.price);
				return prevTotal+(count*fish.price||0);
			}
			return prevTotal;
		},0);

		return(
			<div className="order-wrap">
				<h2>Order</h2>
				<ul className="order">
					{orderID.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				</ul>
			</div>
		)
	}
}

export default Order;