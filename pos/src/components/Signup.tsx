import React, {useState} from "react";
import {Link} from "react-router-dom";
// import axios from "axios";

import AxiosInstance from '../config/axiosInstance.ts';

const Signup: React.FC = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signup = async () => {
        console.log(fullName, email, password)
        try {
            const response = await AxiosInstance.post('/users/register', {
                fullName, email, password
            });
            console.log(response);
            setFullName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <br/>
            <div className="container">
                <div className="raw">
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="email">Full Name</label>
                            <input type="text"
                                   onChange={(e) => {
                                       setFullName(e.target.value)
                                   }}
                                   className='form-control' placeholder='Full Name here'/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                   onChange={(e) => {
                                       setEmail(e.target.value)
                                   }}
                                   className='form-control' placeholder='Email here'/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   onChange={(e) => {
                                       setPassword(e.target.value)
                                   }}
                                   className='form-control' placeholder='Password here'/>
                        </div>
                    </div>
                    <div className="col-12">
                        <br/>
                        <button className='btn btn-primary col-12' onClick={signup}>Register Now</button>
                        <br/>
                        <br/>
                        <Link to="/login" className='btn btn-outline-dark col-12'>Already have an Account</Link>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Signup;