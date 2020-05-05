import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link} from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
 
import ViewUserList from './ViewUserList';

export default class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            datalist : [],
      		bssid : this.props.bssid
        };
    }
    componentDidMount  =  async() => {
         const data1 = {"bssid" : this.state.bssid};
        this.setState({
            bssid : this.props.bssid
        })
        console.log("^^^^ ", data1, " ^^^^^");  
        await axios.post('http://localhost:5000/getForestUsingBSSID', data1)
            .then(response => {
                  console.log(response.data);
                this.setState({
                    datalist : response.data
                });
           })
            .catch(error => {
                console.log(error.response);
            });


    }
    applicationList() { 
        return this.state.datalist.map(function(currentApplication, i) {
            return <ViewUserList application={currentApplication} key={i} />;
        })
    }
    render() {
        return (
                <div className = 'jumbotron'>
                    <div>
                        <h3>Users</h3>
                        <table className = 'table table-striped jumbotron' style={{marginTop: 20}}>
                            <thead>
                                <tr>
                                 <th><h3> Name </h3></th>
                                	<th><h3> BSSID </h3></th>
                                    <th><h3> Adhaar </h3></th>
                                    <th><h3> Profile </h3></th>
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
