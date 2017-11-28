import React from 'react';

class Order extends React.Component{
	render(){

		const orderID = Object.keys(this.props.order);
		
		return(
			<div className="order-wrap">
				<h2>Order</h2>
				<p>{orderID}</p>
			</div>
		)
	}
}

export default Order;