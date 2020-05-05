import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link, withRouter} from "react-router-dom";
import Message from '../elements/Message';
import Error from '../elements/Error';
import { COMMON_FIELDS, REGISTRATION_FIELDS, LOGIN_FIELDS, LOGIN_MESSAGE, ERROR_IN_LOGIN } from '../MessageBundle';
import axios from 'axios';
import Button from '@material-ui/core/Button'

import ViewUser1 from './ViewUser1';

export default class ViewUserList1 extends Component {
	constructor(props) {
		super(props);
	}
	render(){
	        return( 
	             <tr>
	            	<td><h4>{this.props.application.name}</h4></td> 
	            	<td><h4>{this.props.application.bssid}</h4></td>
	                <td><h4>{this.props.application.adharno}</h4></td>
	                <td><h4><ViewUser1 bssid = {this.props.application.bssid} /></h4></td>
	            </tr>
	        );
	   
	}

}
			