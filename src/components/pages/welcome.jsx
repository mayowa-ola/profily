import React from 'react';

const Welcome = () => {
    return ( 
        <div className="text-center mt-4">
            <img  height="300px" src={process.env.PUBLIC_URL + '/images/welcome.jpg'}alt="profily logo"/>
            {/* <h1 className="text-info">WELCOME TO PROFILY</h1> */}
        </div>
     );
}
 
export default Welcome;