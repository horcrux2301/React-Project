import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component{

	constructor(){
		super();
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderlogin = this.renderlogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.logout = this.logout.bind(this);
		this.state={
			uid: null,
			owner : null
		}
	}

	componentDidMount(){
		base.onAuth((user) => {
			if(user){
				this.authHandler(null,{user});
			}
		});
	}

	handleChange(e,key){
		const fish = this.props.fishes[key];
		// take a copy of the that single fish only and update
		//make a copy and overwrite
		const updatedFish = {
			...fish,
			[e.target.name]: e.target.value //Overwrite what changed.
		};
		console.log(updatedFish);
		this.props.updatefish(key,updatedFish);
	}

	renderInventory(key){

		const fish = this.props.fishes[key];

		return(
			<div className="fish-edit" key={key}>
			<input type="text" name="name"  value={fish.name} placeholder="Fish name" onChange={(e)=>this.handleChange(e,key)}/>
			<input type="text" name="price"  value={fish.price} placeholder="Fish price" onChange={(e)=>this.handleChange(e,key)}/>
			<select type="text" name="status"  value={fish.status} placeholder="Fish status" onChange={(e)=>this.handleChange(e,key)}>
				<option value="available">Fresh</option>
				<option value="unavailable">Sold Out.</option>
			</select>
			<textarea type="text" name="desc"  value={fish.desc} placeholder="Fish desc" onChange={(e)=>this.handleChange(e,key)}></textarea>
			<input type="text" name="image"  value={fish.image} placeholder="Fish image" onChange={(e)=>this.handleChange(e,key)}/>
			<button onClick={()=> this.props.removefish(key)}>Remove Fish</button>
			</div>
		)
	}

	authenticate(provider){
		console.log(`Trying to log in with ${provider}`);
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	logout(){
		base.unauth();
		this.setState({uid:null});
	}

	authHandler(err,authData){
		if(err){
			console.error(err);
			return;
		}

		const storeRef = base.database().ref(this.props.storeId);

		// query the firebase once

		storeRef.once('value',(snapshot) => {
			const data = snapshot.val() || {};
			if(!data.owner){
				storeRef.set({
					owner: authData.user.uid
				});
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			})

		});

	}

	renderlogin(){
		return(
			<div>
				<h2>Inventory</h2>
				<p>Sign in.!</p>
				<button className="facebook" onClick={() => (this.authenticate('facebook'))}>Log in with Facebook.</button>
			</div>
		)
	}

	render(){
		const logout = <button onClick={this.logout}>Log Out.!</button>
		// check if they are not logged in
		if(!this.state.uid){
			return(
				<div>{this.renderlogin()}</div>
			)
		}

		// check if they are the owner
		if(this.state.uid!==this.state.owner){
			return(
				<div>
					<p>Sorry You are not the owner of this store.</p>
					{logout}
				</div>
			)
		}


		return(
			<div>
				{logout}
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<h2>Inventory</h2>
				<AddFishForm addFish={this.props.addFish}/>
				<button onClick={this.props.loadSamples}>Load Sample Fishes.</button>
			</div>
			
		)
	}
}

Inventory.PropTypes = {
	addFish : React.PropTypes.func.isRequired,
	fishes : React.PropTypes.object.isRequired,
	loadSamples : React.PropTypes.func.isRequired,
	removefish : React.PropTypes.func.isRequired,
	updatedfish : React.PropTypes.func.isRequired,
	storeId : React.PropTypes.string.isRequired,
}



export default Inventory;