import { Graph } from "react-d3-graph";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import className from 'classnames';
import Error from '../elements/Error';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE, COMMON_FIELDS, ERROR_IN_REGISTRATION } from '../MessageBundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserCard from './UserCard';
import SHeader from './SHeader';

// graph payload (with minimalist structure)
let data = {
    nodes: [{ id: 1 }, { id: 2 }],
    links: [{ source: 1, target: 2 }],
};
 
// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: "lightgreen",
        size: 120,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
    },
};
 
// graph event callbacks
const onClickGraph = function() {
    //window.alert(`Clicked the graph background`);
};

const getUserInfo = async function() {
    // console.log("lidshf");
    return <Redirect push  to={{
                pathname : '/UserProfile',
                state : { bssid : 1 }
            }} />;
};
 
const onClickNode = function(nodeId) {
    // console.log("hi\n");
     // getUserInfo();
};
 
const onDoubleClickNode = function(nodeId) {
    //window.alert(`Double clicked node ${nodeId}`);
};
 
const onRightClickNode = function(event, nodeId) {
    //window.alert(`Right clicked node ${nodeId}`);
};
 
const onMouseOverNode = function(nodeId) {
    // //window.alert(`Mouse over node ${nodeId}`);
    // console.log("hi\n");
    // getUserInfo();
};
 
const onMouseOutNode = function(nodeId) {
    // //window.alert(`Mouse out node ${nodeId}`);
};
 
const onClickLink = function(source, target) {
    //window.alert(`Clicked link between ${source} and ${target}`);
};
 
const onRightClickLink = function(event, source, target) {
    //window.alert(`Right clicked link between ${source} and ${target}`);
};
 
const onMouseOverLink = function(source, target) {
    //window.alert(`Mouse over in link between ${source} and ${target}`);
};
 
const onMouseOutLink = function(source, target) {
    //window.alert(`Mouse out link between ${source} and ${target}`);
};
 
const onNodePositionChange = function(nodeId, x, y) {
    //window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
};
 
export default class Graphh extends Component {
    constructor(props) {
        super(props)
        this.state= {
            email : "",
            phone : "",
            area : "",
            status : "",
            applicationStatusComment : "",
            bssid : 1,
            name : "",
            address : "",
            phone : "",
            email : "",
            latitude : "",
            longitude : "",
            graphName : "", 
            peer : [],
            status : "not infected",
            datalist : []
        }

    }


    componentDidMount =  async() => {
        const data1 = {"bssid" : this.state.bssid};
            
        await axios.post('http://localhost:5000/getForestUsingBSSID', data1)
            .then(response => {
                  console.log(response.data);
                this.setState({
                    datalist : response.data
                });
                var datalis = this.state.datalist;
                console.log(this.state.datalist);
                var lis = this.state.datalist;
                console.log(lis);
                var linkslist = []
                // linkslist.push({"source" : "Sally", "target" : "Alice"});
                data.links = linkslist;
                console.log(data);
                var nodeslist = []
                for(var i = 0; i < datalis.length; i++){
                    nodeslist.push({"id" : datalis[i].bssid});
                }
                data.nodes = nodeslist;

                for(var i = 0; i < datalis.length; i++){
                    // console.log(datalis[i]);
                    for(var j = 0; j < datalis[i].peer.length; j++){
                        // console.log(datalis[i].peer[j]);
                        linkslist.push({"source" : datalis[i].bssid, "target" : datalis[i].peer[j]});
                    }
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
                this.forceUpdate();
            })
            .catch(error => {
                console.log(error.response);
            });

    }
      

    fun(){
        console.log("qqqqqlfkasnf\n");
        console.log(this.state.status);
    }
    render(){
        console.log("render");
        return(
            <div>
                <SHeader/>
                <h2>{this.state.graphName}</h2>


                <Graph

                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error

                
                    data={data}
                    config={myConfig}
                    onClickNode={ 
                        this.fun
                    }
                    onDoubleClickNode={onDoubleClickNode}
                    onRightClickNode={onRightClickNode}
                    onClickGraph={onClickGraph}
                    onClickLink={onClickLink}
                    onRightClickLink={onRightClickLink}
                    onMouseOverNode={onMouseOverNode}
                    onMouseOutNode={onMouseOutNode}
                    onMouseOverLink={onMouseOverLink}
                    onMouseOutLink={onMouseOutLink}
                    onNodePositionChange={onNodePositionChange}
                />
            </div>
);
    }
}