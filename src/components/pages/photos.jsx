import React  from 'react';
import Form from '../form/form';
import jwtDecode from 'jwt-decode';
import {Link} from 'react-router-dom';
import {updateProfile, uploadPhotos, getUser} from '../../services/userServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";

class Photos extends Form {
    state = { 
        data:{photos:''},
        user: '',
        picture : true,
        form : false,
        loading: false
    }

    
    async componentDidMount() {
        try{
            const jwt = localStorage.getItem('token');
            let token = jwtDecode(jwt);
            let{data:user} =  await getUser(token._id);
            this.setState({user});
        }
        catch(ex){
            console.log(ex);
        }
    }


    handleClick = (e) =>{
        e.preventDefault();
        this.setState({picture : false,form : true})
    }
    

    handleSubmit = async(e) => {
        e.preventDefault();
        try{
            this.setState({loading:true})
            const data = new FormData();
            for(let x = 0; x < this.state.data.photos.length; x++) {
                data.append('photos', this.state.data.photos[x])
            }
            const response = await uploadPhotos(data, this.state.user._id);
            
            if(response.status === 200) {
                toast.success('Photos uploaded successfully');
                this.setState({loading:false})
                setTimeout(function(){ 
                    window.location.reload(false);
                }, 1000);
            }
        }
        catch(ex) {
            this.setState({loading:false});
            console.log(ex);
        }
    }

    onChangeHandler=event=>{
        const data = {...this.state.data}
        data['photos'] = event.target.files
        this.setState({
            data,
            loaded: 0,
          })  
    }



    render() { 
        const {photos} = this.state.user;
        const {loading} = this.state;
        const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        `;
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
                     {loading?
                     <div className="sweet-loading">
                        <DotLoader
                        css={override}
                        size={150}
                        color={"#569BC7"}
                        loading={this.state.loading}
                        />
                    </div> :
                     <div class="form-group files">
                        <label>Upload Your File </label>
                        <input type="file" name="photos" onChange={this.onChangeHandler} class="form-control" multiple/>
                    </div>}
                    {this.renderButton( 'UPLOAD')}
                </form>}

            </div>
         );
    }
}
 
export default Photos;