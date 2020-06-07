import React from 'react';

const Input = ({name, label, value, onChange, error, type,icon, placeholder}) => {
    
    return (
        <React.Fragment>
            <label className="text-dark" htmlFor={name}>{label}:</label>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><i className={icon}></i></span>
                </div>
                <input autoFocus type={type}  
                    value={value}
                    name={name}
                    onChange={onChange}
                    className="form-control" id={name} aria-describedby="basic-addon1" 
                    placeholder={placeholder}/>
            </div>
                {error && <div className="alert alert-danger">{error}</div>}
        </React.Fragment> 
     );
}
 
export default Input;