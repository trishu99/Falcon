import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import className from 'classnames';
import Error from '../elements/Error';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE, COMMON_FIELDS, ERROR_IN_REGISTRATION } from '../MessageBundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './Logout';
import SHeader from './SHeader';
import GraphComp from './GraphComp';
import UserCard from './UserCard';
import SimpleMap from './SimpleMap';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';


export default class UserProfile extends Component {
	constructor(props) {
		super(props)
		this.state= {
			name : "",
			email : "",
			phone : "",
			bssid : "",
			address : "",
			lat : "",
			long : "",
			graphName : "", 
			peer : [],
			adharno : "",
			status : "not infected",
			viewGraph : false,
			viewMap : false,
			val : 0,
			googleMapLink : ''
		}
	}

	componentDidMount = async e => {
		try{
			const data = {"bssid" : this.props.location.state.bssid};
			let res;
			await axios.post('http://localhost:5000/getUserUsingBSSID', data)
			.then(response => {
				this.setState({
					name : response.data.name,
					graphName : response.data.graphName,
					val : response.data.val,
					peer : response.data.peer,
					bssid : response.data.bssid,
					phone : response.data.phone,
					email : response.data.email,
					address : response.data.address,
					adharno : response.data.adharno,
					lat : response.data.lat,
					long : response.data.long,
					val : response.data.val
				})
				if(this.state.val == 1){
					this.setState({
						status : "Infected"
					});
				}
				else if(this.state.val == 2){
					this.setState({
						status : "suspect"
					});
				}
				if(this.state.val == 1){
					this.setState({
						status : "infected"
					});
				}
				else if(this.state.val == 2){
					this.setState({
						status : "maybe infected"
					});
				}
				var link = 'http://www.google.com/maps/place/' + this.state.lat + ',' + this.state.long;
				this.setState({
					googleMapLink : link
				});

			})
			.catch(error => {
				console.log(error.response);
			});
		}
		catch(e){

		}
	}


	onSubmit = async e => {
		e.preventDefault();
		const data = {
			bssid : this.state.bssid
		};
		let res;
		await axios.post('http://localhost:5000/markUser', data)
		.then(response => {
			console.log(response.data);
			res = response.status;
			this.setState({
			})
		})
		.catch(error => {
			console.log(error.response);
		});
		if(res === 200) {
			this.setState({
			});
		} else
		{
			this.setState({
				errorMessage : "Entries are not valid"
			})
		}
	}

	viewGraphFun = async e => {
		e.preventDefault();
		this.setState({
			viewGraph : true,
			viewMap : false
		});
	}

	render() {
		return (
			<div>
			<SHeader />
			<center>
			{this.state.val == 0 &&        
						 	<div>
						  		<h2 className="alert alert-primary">User is not infected</h2>
							</div>
						}

						{this.state.val == 1 &&        
						 	<div>
						  		<h2 className="alert alert-danger">User is infected</h2>
							</div>
						}
					{this.state.val == 2 &&        
						 	<div>
						  		<h2 className="alert alert-warning">User is suspect of infection</h2>
							</div>
						}
				<div className='container-fluid bg-dark'>
				<div className="jumbotron">
					  
					<h2>USER<span className="change-color"> DETAILS</span> </h2>
					<hr />
					<h3>{this.state.name}</h3>
					<hr />

				<form onSubmit = {this.onSubmit}>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="user_name" >Name:</label>
								<div className="form-control"><h4>{this.state.name}</h4></div>
							</div>
							
							<div className="form-group col-md-6">
								<label htmlFor="phone" >Phone:</label>
									<div className="form-control"><h4>{this.state.phone}</h4></div>
							</div>
						</div>

						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="user_name" >Adhar Card No:</label>
								<div className="form-control"><h4>{this.state.adharno}</h4></div>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="user_name" >Address:</label>
								<div className="form-control"><h4>{this.state.address}</h4></div>
							</div>
						</div>

						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="user_name" >Email:</label>
								<div className="form-control"><h4>{this.state.email}</h4></div>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="user_name" >Status:</label>
								<div className="form-control"><h4>{this.state.status}</h4></div>
							</div>
						</div>

						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="user_name" >Latitude:</label>
								<div className="form-control"><h4>{this.state.lat}</h4></div>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="user_name" >Longitude:</label>
								<div className="form-control"><h4>{this.state.long}</h4></div>
							</div>
						</div>
						<div className="form-group auto-ml">
							<div className="row">
								<div className="col-md-2">
								<label htmlFor="email">BSSID:</label>
								</div>
								<div className="col-md-1">
								<h2>{this.state.bssid}</h2>
								</div>
							</div>
						</div>
					
						

						<br/><br/>
						<center><button type="button" onClick={this.onSubmit} className="btn btn-primary btn-lg">USER INFECTED</button></center>
						<br/><br/>
						<center><button type="button" onClick={this.viewGraphFun} className="btn btn-primary btn-lg">CONTACT GRAPH</button></center>
						<br/><br/>
						<center><a className="btn btn-primary btn-lg" href = {this.state.googleMapLink}>View Location</a></center>
				</form>
					
				</div>


					  {this.state.viewGraph == true &&        
						 	<div>
						  		<UserCard bssid = {this.state.bssid}/>
						  		<GraphComp bssid = {this.state.bssid}/>     
							</div> 
						}
						</div>
			</center>
			<Footer />
			</div>
		)
	}
}

/*
						<div className="form-group">
							<div className="row">
								<div className="col-md-2">
								<label htmlFor="email">Name:</label>
								</div>
								<div className="col-md-10">
								{this.state.name}
								</div>
							</div>
						</div>
						
						<div className="form-group">
							<div className="row">
								<div className="col-md-2">
								<label htmlFor="email">Email:</label>
								</div>
								<div className="col-md-10">
								{this.state.email}
								</div>
							</div>
						</div>


						<div className="form-group">
							<div className="row">
								<div className="col-md-2">
								<label htmlFor="email">phone:</label>
								</div>
								<div className="col-md-10">
								{this.state.phone}
								</div>
							</div>
						</div>
*/