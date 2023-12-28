import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App'
import Signup from './auth-components/Signup'
import Signin from './auth-components/Signin'
import Private from './core-components/Private'
import PrivateRoute from './auth-components/PrivateRoute'
import Activate from './auth-components/Activate'
import ForgotPassword from './auth-components/ForgotPassword'
import Admin from './core-components/Admin'
import AdminRoute from './auth-components/AdminRoute'
import ResetPassword from './auth-components/ResetPassword'
const PharmRoutes = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App/>}/>
                <Route path='/pharma/signup' exact element={<Signup/>}/>
                <Route path='/pharma/signin' exact element={<Signin/>}/>
                <Route path="/private" element={<PrivateRoute><Private/></PrivateRoute>} />
                <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>} />
                <Route path="/auth/password/forgot" exact element={<ForgotPassword/>}/>
                <Route path="/auth/activate/:token" exact element={<Activate/>}/>
                <Route path="/auth/password/reset/:token" exact element={<ResetPassword/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default PharmRoutes