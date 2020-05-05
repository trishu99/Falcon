import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import className from 'classnames';
import Error from '../elements/Error';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE, COMMON_FIELDS, ERROR_IN_REGISTRATION } from '../MessageBundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleMap from './SimpleMap';
import ShowECs from './ShowECs';
import MarkTrouble from './MarkTrouble';
import UnMarkTrouble from './UnMarkTrouble';
import Logout from './Logout'; 
import UploadDoc from './UploadDoc';
import Footer from './Footer';

export default class LoggedIn extends Component {
	constructor(props) {
		super(props)
		this.state= {
			adharno : "",
			searchflag : false,
			bssid : ""
		}
		console.log(this.state.user_name)
	}

	handleOnChangeAdhar = async event=> {
		event.preventDefault();
		this.setState({
			adharno : event.target.value
		});
	}

	handleOnChangeBSSID = async event=> {
		event.preventDefault();
		this.setState({
			bssid : event.target.value
		});
	}


	componentDidMount(){
		try{
			this.setState({
				user_name : this.props.location.state.user_name
			});
		}
		catch(e){

		}
	}

	onSubmit = async e => {
		e.preventDefault();
		const data = {
			adharno : this.state.adharno,
		};
		let res;
		await axios.post('http://localhost:5000/getUserUsingAdhar', data)
		.then(response => {
			console.log(response.data);
			res = response.status;
			this.setState({
				searchflag : true,
				bssid : response.data.bssid
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
	onSubmit1 = async e => {
		e.preventDefault();
		console.log(this.state.bssid);
		const data = {
			bssid : this.state.bssid,
		};
		let res;
		await axios.post('http://localhost:5000/getUserUsingBSSID', data)
		.then(response => {
			console.log(response.data);
			res = response.status;
			this.setState({
				searchflag : true,
				bssid : response.data.bssid
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
	render() {
		// if(localStorage.getItem('session') != "start"){
		// 	return <Redirect push to = "/UserSignIn" />;
		// }
		if(this.state.searchflag == true){
			this.setState({searchflag : false});
			return <Redirect push  to={{
            	pathname : '/UserProfile',
            	state : { bssid : this.state.bssid }
        	}} />;
		}
		return (
			<div className="user-panel">
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<a className="navbar-brand" href="#">
            <img className="logo" src = {require('./Logo.png')} />
            
          	</a>
          	<h1 className="navbar-text"><b>FALCON PLATFORM</b></h1>      
			</nav>

			
			<nav className='navbar navbar-expand-lg navbar-light header'>
			
			<a className="navbar-brand" href="#">
            <h1><b>FALCON ADMIN DASHBOARD</b></h1>
          	</a>
			
			<div className="nav navbar-nav ml-auto">

			<Logout/>
          	
            </div>
              
			</nav>

			<div className="user">
			<div className="row">
				<div className="col-md-10">

				<br/>
				<center>
				<div className="container p-3 my-3 bg-dark text-white">
				<h2>LIST <span className="change-color">OF</span> INFECTED <span className="change-color">USERS</span></h2>
				<Link to={{
					  pathname: '/InfectedUsers',
					}} className="btn btn-primary"><h4><b>INFECTED USERS</b></h4></Link>
				</div>
				<br/>

				</center>

					
				<br/><br/>						<br/><br/>
		
				<div className = 'container  p-3 my-3 bg-dark text-white'>

					<center>
				<div className="user-jumbotron">
				
					<h2>SEARCH <span className="change-color">PERSON</span> </h2>
					<br/> <br/>
					<form onSubmit = {this.handleSubmit}>


					<div className="form-group">
						<div className="row">
							<div className="mx-auto">
								<label htmlFor="ec1"><h3>ADHAAR <span className="change-color">NO</span></h3></label>
							</div>
							<div className="col-md-7">
								<input type="text" name = "ec1" className="form-control form-control-lg" value={this.state.ec1} placeholder="ADHAAR" id="adharno" onChange={this.handleOnChangeAdhar} />
							</div>
						</div>
					</div>
				
					<h4><span className="errorMessage">{this.state.errorMessage}</span></h4>
		
						<br/><br/>
						<center> <button type="button" onClick={this.onSubmit} className="btn btn-primary"><h4><b>SEARCH</b></h4></button><br /><br />
						</center>
					
						<br/><br/>						<br/><br/>

						
					<div className="form-group">
						<div className="row">
							<div className="mx-auto">
								<label htmlFor="ec1"><h3>MAC <span className="change-color">ID</span></h3></label>
							</div>
							<div className="col-md-7">
								<input type="text" name = "ec1" className="form-control form-control-lg" value={this.state.ec1} placeholder="MAC ID" id="bssid" onChange={this.handleOnChangeBSSID} />
							</div>
						</div>
					</div>
				
					<h4><span className="errorMessage">{this.state.errorMessage}</span></h4>
		
						<br/><br/>
						<center> <button type="button" onClick={this.onSubmit1} className="btn btn-primary"><h4><b>SEARCH</b></h4></button><br /><br />
						</center>
								
					</form>
				
				</div>


				</center>

				</div>

				</div>
				
			</div>
			</div>
			<Footer />
			</div>
		)
	}
}