import React  from 'react';
import Form from '../form/form';
import jwtDecode from 'jwt-decode';
import {Link} from 'react-router-dom';
import {updateProfile, uploadPhotos, getUser} from '../../services/userServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Photos extends Form {
    state = { 
        data:{photos:''},
        user: '',
        picture : true,
        form : false,
    }

    
    async componentDidMount() {
        try{
            const jwt = localStorage.getItem('token');
            let token = jwtDecode(jwt);
            // console.log(user)
            let{data:user} =  await getUser(token._id);
            this.setState({user});
            console.log('user',this.state.user)
        }
        catch(ex){
            console.log(ex);
        }
    }


    handleClick = (e) =>{
        e.preventDefault();
        this.setState({picture : false,form : true})
        console.log('yes');
    }
    

    handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const data = new FormData();
            data.append('photos', this.state.data['photos']);
            const response = await uploadPhotos(data, this.state.user._id);
            if(response.status === 200) {
                toast.success('Photos uploaded successfully');
                // const that =this;
                setTimeout(function(){ 
                    window.location.reload(false);
                }, 3000);
            }
        }
        catch(ex) {

        }
    }

    onChangeHandler=event=>{
        const data = {...this.state.data}
        data['photos'] = event.target.files[0]
        this.setState({
            data,
            loaded: 0,
          })  
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
        const {photos} = this.state.user;
        console.log('photos',this.state.user.photos);
        return ( 
            <div>
                <div className="form-group">
                    <ToastContainer />
                </div>
                <h3 className="mt-4 mb-4">My Photos</h3>
                <Link to="" onClick={this.handleClick}  className="btn btn-danger ">Upload new photos</Link>
                {this.state.picture && <div className="row">
                    {photos ? photos.map((photo,index)=> 
                        <div key={index} className="col-md-4 mb-4 p-2">
                            <div  className="background-light-grey p-4">
                                <img className="card-img-top"
                                    width="400px"
                                    height="400px"
                                    src={`${photo}`} alt="Card cap"/>  
                            </div>
                        </div>
                    )
                    :
                    <h3>You haven't uploaded any photos yet, please click the button above</h3>}
                </div>}
                {this.state.form && <form onSubmit={this.handleSubmit} encType="multipart/form-data">              
                    <div className="form-group" >
                        <p>Upload New Photos</p>
                        {/* <label className="custom-file-label" htmlFor="photos">Upload New Photos</label> */}
                        <br/>
                        <input type="file" name="photos" onChange={this.onChangeHandler}/>
                        <br/>
                    </div>
                    {this.renderButton( 'UPLOAD')}
                </form>}

            </div>
         );
    }
}
 
export default Photos;