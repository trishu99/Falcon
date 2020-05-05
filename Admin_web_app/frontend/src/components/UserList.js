import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link} from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
 
import ViewUserList from './ViewUserList';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applications: this.props.userlist
        };
        console.log("qqqq ", this.props.userlist)
    }
    applicationList() { 
        
        return this.state.applications.map(function(currentApplication, i) {
            return <ViewUserList application={currentApplication} key={i} />;
        })
    }
    render() {
        return (
                <div className = 'container'>
                    <div>
                        <h3>Users</h3>
                        <table className = 'table table-striped' style={{marginTop: 20}}>
                            <thead>
                                <tr>
                                    <th><h3> Sr no </h3></th>
                                    <th><h3> Name</h3></th>
                                    <th><h3> BSSID </h3></th>
                                    <th><h3> Adhaar </h3></th>
                                    <th><h3> View </h3></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.applicationList()}
                            </tbody>
                        </table>
                    </div>
                </div>
        )
    }
}
