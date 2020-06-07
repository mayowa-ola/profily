import React from 'react';
import {Link} from 'react-router-dom';

// class NavBar extends Component {
const NavBar = (props) => {    
        
        return ( 
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
              <div className="container">
                    {/* <NavLink className="navbar-brand" to="/"><img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="profily logo"/></NavLink> */}
                    <Link className="navbar-brand text-white" to="/">PROFILY :)</Link>
                    <button className="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                    <span  className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse mt-3" id="navbarsExample07">
                        <ul className="navbar-nav mr-4">
                            <li className="nav-item">
                            </li>
                        </ul>
                        <div className="input-group " style={{width:"50%"}}>
                            {/* <input type="text" className="form-control" placeholder="Search" aria-label="search" aria-describedby="basic-addon2"/>
                            <div className="input-group-append" >
                                <span className="input-group-text" id="basic-addon2 " role="button"><i className="fa fa-search"></i></span>
                            </div> */}
                        </div>
                      
                        <ul className="navbar-nav float-right">
                            <li className="nav-item">
                                <Link className="nav-link text-white" style={{color:'#62B0E3'}} to="/register">REGISTER</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" style={{color:'#62B0E3'}} to="/log in">LOG IN</Link>
                            </li>
                            
                           
                        </ul>
                        
                        </div>
                    </div>
                </nav>
         );
    // }
}
 
export default NavBar;