import React, { useState } from "react";
import { Navigate } from "react-router-dom"
import Layout from "../core-components/Layout";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { isAuth } from "./helpers";

const Signup = () => {
    const [values, setValues] = useState({
        regId: "",
        pharmaName:"",
        email: "",
        password: "",
        buttonText: "Submit"
    })

    const { regId,pharmaName, email, password, buttonText } = values

    const handleChange = (pharmaName) => (event) => {
        setValues({...values, [pharmaName]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {regId, pharmaName, email, password}
        })
        .then(response => {
            // console.log('SIGNUP SUCCESS',response)
            setValues({...values, regId:'', pharmaName:'', email:'', password:'', buttonText: 'Submitted'})
            toast.success(response.data.message)   
        })
        .catch(error =>{
            // console.log('SIGNUP ERROR', error.response.data)
            setValues({...values, buttonText:'Submit'})
            toast.error(error.response.data.error)
        })
    }

    const signupForm = () => {
        return (
            <form className="col-md-8 offset-md-0 m-0">
                <div className="form-group">
                    <label className="text-muted">Registration ID</label>
                    <input onChange={handleChange('regId')} value={regId} type="text" className="form-control" style={{backgroundColor:'#e6ffff'}}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Pharmacy Name</label>
                    <input onChange={handleChange('pharmaName')} value={pharmaName} type="text" className="form-control" style={{backgroundColor:'#e6ffff'}}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={handleChange('email')} value={email} type="email" className="form-control" style={{backgroundColor:'#e6ffff'}}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={handleChange('password')} value={password} type="password" className="form-control" style={{backgroundColor:'#e6ffff'}}/>
                </div><br />
                <div>
                    <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
                </div>
            </form>
        )
    }
    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? <Navigate to="/"/> : null}
                <h2 className="p-2 text-center">Signup</h2>
                {signupForm()}
            </div>
        </Layout>
    )
}
export default Signup;