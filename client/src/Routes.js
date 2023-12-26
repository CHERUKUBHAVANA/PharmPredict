import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App'
import Signup from './auth-components/Signup'
import Signin from './auth-components/Signin'
import Private from './core-components/Private'
import PrivateRoute from './auth-components/PrivateRoute'
const PharmRoutes = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App/>}/>
                <Route path='/pharma/signup' exact element={<Signup/>}/>
                <Route path='/pharma/signin' exact element={<Signin/>}/>
                <Route path="/pharma/private" element={<PrivateRoute><Private/></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    )
}
export default PharmRoutes