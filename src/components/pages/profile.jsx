import React  from 'react';
import Form from '../form/form';
import Joi from 'joi-browser';
import jwtDecode from 'jwt-decode';
import {withRouter, Link} from 'react-router-dom';
import {updateProfile, getUser} from '../../services/userServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Profile extends Form {
    state = { 
        data: {name:'', email:'',},
        errors: {},
        user:''
    }

    
    schema = {
        name: Joi.string().required().min(3),
        email: Joi.string().required(), 
    }
    
    async componentDidMount() {
        try{
            const jwt = localStorage.getItem('token');
            const user = jwtDecode(jwt);
            this.setState({data: this.mapUserToModel(user),user});
        }
        catch(ex){
            console.log(ex);
        }
    }

    mapUserToModel(user){
        return {
            name:user.name,
            email: user.email,
        }
    }


    doSubmit = async () => {
        try{
            
            const response = await updateProfile(this.state.data, this.state.user._id);
            if(response.status === 200) {
                toast.success('Your profile was updated successfully');
            }
        }
        catch(ex){
            toast.error(ex.response.data);  
        }
            
    }

    render() { 
        return ( 
            <div>
                <div className="form-group">
                    <ToastContainer />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mt-4 mb-4 ">My Profile</h3>
                    <Link to="/logout"  className="btn btn-danger ">LOG OUT</Link>
                </div>
                <div className="clear-fix"></div>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">              
                    {this.renderInput('name', 'Name', '', 'fa fa-user')}
                    {this.renderInput('email', 'Email Address','email', 'fa fa-envelope')}
                    {this.renderButton('UPDATE')}
                </form>

            </div>
         );
    }
}
 
export default Profile;