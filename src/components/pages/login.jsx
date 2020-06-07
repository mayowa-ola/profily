import React from 'react';
// import Select from 'react-select';
import Joi from 'joi-browser';
import CustomForm from './../form/form';
import { Container } from 'react-bootstrap';
import {withRouter, Link} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { userLogin, googleAuth } from './../../services/userServices';
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";
import NavBar from './navbar';
import Welcome from './welcome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends CustomForm {
    state = { 
        data: {email:'', password:''},
        errors: {},
        loading:''
    }

    
    schema = {
        email: Joi.string().required().min(3),  
        password: Joi.string().required().min(3)  
    }

    autheticateWithGoogle = async () => {
        try{
            this.setState({loading:true});
            const {data:jwt} = await googleAuth();
            const user = jwtDecode(jwt);
            localStorage.setItem('token', jwt);
            const that =this;
            setTimeout(function(){ 
                that.props.history.push({
                    pathname: '/dashboard',
                    user: user,
                });
            }, 3000); 
        }
        catch(ex){
            this.setState({loading:false})
            if(ex.response && ex.response.status === 401) {
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({errors});
                toast.error(errors);
            }   
        }
    }

    doSubmit = async () => {
        //call the server and redirect the user to another page
        try{
            this.setState({loading:true})
            const data = {...this.state.data};
            const {data:jwt} = await userLogin(data); 
            const user = jwtDecode(jwt);
            localStorage.setItem('token', jwt);
            const that =this;
            setTimeout(function(){ 
                that.props.history.push({
                    pathname: '/dashboard',
                    user: user,
                });
            }, 3000);
        }
        catch(ex){
            this.setState({loading:false})
            if(ex.response && ex.response.status === 401) {
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({errors});
                toast.error('Your email or Password is incorrect!')
            }   
        }
            
    }
    

    render() { 
        const {loading} = this.state;
        const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        `;
        return ( 
            <Container>
                <div className="form-group">
                    <ToastContainer />
                </div>
                <NavBar/>
                <Welcome/>
                {loading ?
                <div className="sweet-loading">
                    <DotLoader
                    css={override}
                    size={150}
                    color={"#569BC7"}
                    loading={this.state.loading}
                    />
                </div> :
                <div style={{margin: "0 auto", width:"50%"}}>
                    <form onSubmit={this.handleSubmit} >              
                        {this.renderInput('email', 'Email Address', 'email', 'fa fa-envelope')}
                        {this.renderInput('password', 'Password', 'password', 'fa fa-lock')}
                        {this.renderButton('LOGIN')}
                    </form>
                </div>
                }
                <div className="text-center">
                    <h3>OR</h3>
                    <div className="text-center">
                        {/* <Link to="" onClick={this.autheticateWithGoogle} className="btn btn-info mr-4">SIGN IN WITH GOOGLE</Link> */}
                        <Link to="/register"  className="btn btn-danger">REGISTER</Link>
                    </div>
                </div>
            </Container>
            
         );
    }
}
 
export default withRouter(Login);