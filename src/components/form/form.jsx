import React, {Component} from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class CustomForm extends Component {
    state = { 
        data: {},
        errors: {}
     }

     validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {abortEarly:false});
        if(!result.error) return null;

        const errors = {};
        for (let item of result.error.details) errors[item.path[0]] = item.message;
        return errors;      
    }

    
    validateProperty = ({name, value}) => {
        if(name === 'confirmPassword'){
            const obj = {[name]:value};
            const password = this.state.data.password ;
            if(password === obj['confirmPassword']) return null;
            return 'Your passwords must match';
        }
        else {
            const obj = {[name]:value};
            const schema = {[name]: this.schema[name]} 
            const {error} = Joi.validate(obj, schema)
            if (!error) return null;
            return error.details[0].message;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const errors =  this.validate();
        // console.log(errors);
        this.setState({errors:errors || {}})
        if (errors) return;

        this.doSubmit()
        
    }

    handleChange = ({currentTarget:input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data}
        data[input.name] = input.value;
        this.setState({data, errors});
    }
    

    renderButton = (label) =>{
        return <button type="submit"  className="btn btn-danger">{label}</button>
    }
    renderInput = (name, label, type="text", icon, placeholder) => {
        const {data, errors} = this.state;
        return (
            
        <Input label={label} 
        value={data[name]}
        type={type}
        icon={icon}
        placeholder={placeholder}
        onChange={this.handleChange}
        name={name}
        error={errors[name]}/>);
    }

    renderCheckBox = (id, name) => {
        return (
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id={id}/>
                <label className="form-check-label text-dark" htmlFor={id}>{name}</label>
            </div>
        );
    }
    renderSelect = (name, label, options) => {
        const {data, errors} = this.state
        return (
            <Select 
            name={name}
            label={label}
            value={data[name]}
            onChange={this.handleChange}
            error={errors[name]}
            options= {options}
            />
        );
    }
    renderFile = (id, name, content) => {
        return (
            <React.Fragment>
            <label className="form-check-label text-dark mt-4" htmlFor={id}>{name}</label>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id={id}>Upload </span>
                </div>
                <div className="custom-file">
                    <input type="file" onChange={this.onChangeHandler} name={id} className="custom-file-input" id={id}
                    aria-describedby={id}/>
                    <label className="custom-file-label" htmlFor={id}>{content}</label>
                </div>
            </div>
            </React.Fragment>
        );
    }

    renderTextArea = (name, label, error) => {
        const {data, errors} = this.state;
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <textarea className="form-control" onChange={this.handleChange} value={data[name]}  name={name} id={name} rows="3"></textarea>
                {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
            </div>
        );
    }
}
 
export default CustomForm;