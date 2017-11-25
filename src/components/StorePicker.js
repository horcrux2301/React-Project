import React from 'react';
import { getFunName } from '../helpers';


class StorePicker extends React.Component{

	gotoStore (event){
		console.log(this.storeInput);
		event.preventDefault();
		//first grab the text
		console.log(this.storeInput.value);
		//transition from / to /store:storeId
	}



	render() {
		return (
			<form  className="store-selector" onSubmit={this.gotoStore.bind(this)}>
				<h2>Enter a Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input)=> {this.storeInput=input}} />
				<button type="submit">Visit Store</button>
			</form>
		)
	}
}

export default StorePicker;


