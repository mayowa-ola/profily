import React from 'react';

const Input = ({name, label, options, value, onChange, error, type}) => {
    
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select autoFocus type={type}  
                value={value}
                name={name}
                onChange={onChange}
                className="form-control" id={name} aria-describedby="emailHelp" 
                placeholder={`Enter ${name}`}>
                <option value=''/>
                    {options.map(option=>(
                        <option key={option._id} value={option._id}>{option.name}</option>
                    ))}
                
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
     );
}
 
export default Input;