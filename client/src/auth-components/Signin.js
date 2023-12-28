import React, { useState } from "react";
import Layout from "../core-components/Layout";
import axios from 'axios'
import { Navigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { authenticate, isAuth } from "./helpers";
import withRouter from "../core-components/WithRouter";

const Signin = ({router}) => {
    const {navigate} = router
    const [values, setValues] = useState({
        email: "",
        password: "",
        buttonText: "Submit"
    })

    const { email, password, buttonText } = values

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, buttonText: 'Submitting' })
        axios({ //insted of postman
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }
        })
            .then(response => {
                //save the response {user, token} in localStorage/ cookie
                authenticate(response, () => {
                    setValues({ ...values, email: '', password: '', buttonText: 'Submitted' })
                    if (isAuth() && isAuth().role === "admin") {
                        navigate('/admin')
                    } else {
                        navigate('/private')
                    }
                })
            })
            .catch(error => {
                // console.log('SIGNUP ERROR', error.response.data)
                setValues({ ...values, buttonText: 'Submit' })
                toast.error(error.response.data.error)
            })
    }

    const signinForm = () => {
        return (
            <form className="col-md-6 offset-md-3">
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={handleChange('email')} value={email} type="email" className="form-control" style={{backgroundColor:'#e6ffff'}}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={handleChange('password')} value={password} type="password" className="form-control" style={{backgroundColor:'#e6ffff'}}/>
                </div><br />
                <div className="m-2" style={{display:"inline-block"}}>
                    <button className="btn btn-outline-success" onClick={clickSubmit}>{buttonText}</button>
                </div>
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger mr-0" style={{display:'inline-block', marginLeft:'60px'}}>Forgot Password?</Link>
            </form>
        )
    }
    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? <Navigate to="/" /> : null}
                <h1 className="text-center">Signin</h1>
                {/* <FacebookLoginOption informParent={informParent}/> */}
                {signinForm()}
                <br/>
                
            </div>
        </Layout>
    )
}
export default withRouter(Signin);