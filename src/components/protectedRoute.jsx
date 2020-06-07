import React from 'react';
import {getCurrentUser} from './../services/userServices';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({path, component:Component, render, ...rest}) => {
    return ( 
        <Route path={path}
            {...rest} 
            render={(props)=>
              {if(getCurrentUser() ) 
                return <Redirect to={{
                    pathname:'/',
                    state:{from: props.location}
                }}/>;
              return Component ? <Component {...props}/> : render(props);
              }}/>
     );
}
 
export default ProtectedRoute;