import React from 'react';
import {formatPrice} from '../helpers';

class Fish extends React.Component{
	render(){
		const {details} = this.props;
		const isAvailable = details.status === 'available';
		const buttonText = isAvailable ? 'Add to Order' : 'sold out';
		return(
			<li className="menu-fish">
				<img src={details.image} />
				{details.name}
				<h3 className="fish-name">
					{details.name}
					<span className="price">{formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button onClick={this.props.addToOrder} disabled={!isAvailable}>{buttonText}</button>
			</li>
		)
	}
}

export default Fish;