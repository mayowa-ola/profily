import React from 'react';
import {NavLink} from 'react-router-dom';

// class NavBar extends Component {
const NavBar = (props) => {    
        
        return ( 
              <div className="d-flex justify-content-center">
                    
                        <div className="justify-content-center" >
                            <NavLink className="navbar-brand" to="/"><img src={process.env.PUBLIC_URL + '/images/logo.jpg'} alt="profily logo"/></NavLink>
                        </div>
                      
                       
                    </div>
         );
    // }
}
 
export default NavBar;