import React, {Component} from 'react';
// import Select from 'react-select';
import Joi from 'joi-browser';
import CustomForm from './../form/form';
import { Container,Tabs,Tab } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import NavBar from './navbar';
import Profile from './profile';
import Photos from './photos';

class Dashboard extends Component {
    state = {}
    

    render() {
        const {user} = this.props.location ? this.props.location : this.props; 
        return ( 
            <Container>
                <NavBar/>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" >
                    <Tab eventKey="profile" title="Profile">
                        <Profile user={user}/>
                    </Tab>
                    <Tab eventKey="photos" title="Your Photos">
                        <Photos user={user}/>
                    </Tab>
                </Tabs>
            </Container>
            
         );
    }
}
 
export default withRouter(Dashboard);