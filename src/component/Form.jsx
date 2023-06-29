import React, { useState } from 'react';
import "./form.css";

const Form = () => {
    const initialState = {
        name: "",
        email: "",
        password: ""
    }
    const [formValues, setFormValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validateFields(formValues));
        setIsSubmit(true);
    }

    const validateFields = (values) => {
        const errros = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.name) {
            errros.name = "Name is required!";
        }

        if (!values.email) {
            errros.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errros.email = "Email is not valid!";
        }

        if (!values.password) {
            errros.password = "Password is required";
        } else if (values.password.length < 4) {
            errros.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errros.password = "Password cannot exceed more than 10 characters";
        }

        return errros;
    }

    return (
        <div className='container'>
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className='signin-message'>Signed in successfully</div>
            ) : ""}
            <h4 style={{ paddingTop: "1rem" }}>Login Form</h4>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    <input type="text" name="name" id="name" placeholder='Enter your name' value={formValues.name} onChange={handleChange} />
                    <p className='error'>{formErrors.name}</p>
                </div>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type="text" name="email" id="email" placeholder='Enter your email' value={formValues.email} onChange={handleChange} />
                    <p className='error'>{formErrors.email}</p>
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type="text" name="password" id="password" placeholder='Enter your password' value={formValues.password} onChange={handleChange} />
                    <p className='error'>{formErrors.password}</p>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form;