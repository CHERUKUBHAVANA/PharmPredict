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
import AddMedicine from './admin-components/AddMedicine'
import DisplayMedicine from './admin-components/DisplayMedicine'
const PharmRoutes = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App/>}/>
                <Route path='/pharma/signup' exact element={<Signup/>}/>
                <Route path='/pharma/signin' exact element={<Signin/>}/>
                <Route path="/pharma/private" element={<PrivateRoute><Private/></PrivateRoute>} />
                <Route path="/pharma/admin" element={<AdminRoute><Admin/></AdminRoute>} />
                <Route path="/pharma/admin/add-medicines" element={<AdminRoute><AddMedicine/></AdminRoute>} />
                <Route path="/auth/password/forgot" exact element={<ForgotPassword/>}/>
                <Route path="/auth/activate/:token" exact element={<Activate/>}/>
                <Route path="/auth/password/reset/:token" exact element={<ResetPassword/>}/>
                <Route path="/pharma/display-medicine" exact element={<DisplayMedicine/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default PharmRoutes