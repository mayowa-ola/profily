import React  from 'react';
import Form from '../form/form';
import Joi from 'joi-browser';
import {withRouter, Link} from 'react-router-dom';
import {updateProfile, getUser} from '../../services/userServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Photos extends Form {
    state = { 
        photos: []
    }

    
    async componentDidMount() {
        try{
            const {data} =  await getUser(this.props.user._id);
            console.log(data);
        }
        catch(ex){
            console.log(ex);
        }
    }

    mapUserToModel(user){
        return {
            name:user.surname,
            email: user.email,
        }
    }

    uploadPhotos() {
        // await this.uploadPhotos()
    }


    doSubmit = async () => {
        //call the server and redirect the user to another page.
        try{
            
            const response = await updateProfile(this.state.data, this.props.user._id);
            if(response.status === 200) {
                toast.success('Your profile was updated successfully');
            }
        }
        catch(ex){
            toast.error(ex.response.data);  
        }
            
    }

    render() { 
        const {photos} = this.state;
        return ( 
            <div>
                <div className="form-group">
                    <ToastContainer />
                </div>
                <h3 className="mt-4 mb-4">My Photos</h3>
                <Link to="" onClick={this.uploadPhotos}  className="btn btn-danger ">Upload new photos</Link>
                <div className="row">
                    {photos ? photos.map((photo,index)=> 
                        <div key={index} className="col-md-4 mb-4 p-2">
                            <div  className="background-light-grey p-4">
                                <img className="card-img-top"
                                    width="400px"
                                    height="400px"
                                    src={photo.url} alt="Card cap"/>  
                            </div>
                        </div>
                    )
                    :
                    <h3>You haven't uploaded any photos yet, please click the button above</h3>}
                </div>
                {/* <form onSubmit={this.handleSubmit} encType="multipart/form-data">              
                   
                    {this.renderButton('UPDATE')}
                </form> */}

            </div>
         );
    }
}
 
export default Photos;