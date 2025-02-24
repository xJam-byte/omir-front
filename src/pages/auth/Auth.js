import { useState } from 'react';
import './Auth.css';
import img from './Group 206.svg'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import userStore from '../../store/userStore/UserStore';

const Auth = () => {
    const [authType, setAuthType] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [iin, setIin] = useState('')

    const navigate = useNavigate(); 

    const handleLogin = async () => {
        if (email === '' || password === '')  {
            if(iin.length !== 0) return;
            return;
        }
        const responce = await axios.post('http://localhost:5000/auth/login/customer', {email: email, password: password, iin: iin})
        if(responce.data !== undefined){
            userStore.setUser(responce.data[1]);
            userStore.setToken(responce.data[0]);
            console.log(responce.data);
            navigate('/');
        }
    }

    const handleSignUp = async () => {
        if (email === '' || password === '' || firstname === '' || lastname === '' || phone === '' || iin === ''){
            //, {firstname: firstname, lastname: lastname, email: email , phone: phone, password: password, phoneNumber: phone, address: '', iin: iin}
            if(iin.length !== 0) return;
            return;
        }
        console.log(email, password, firstname, lastname, phone, iin)
        
        const responce = await axios.post('http://localhost:5000/auth/registration/customer', {firstName: firstname, lastName: lastname, email: email, password: password, phoneNumber: phone, address: 'asdfasdf' , iin: iin})
        console.log(responce)
        if(responce.data !== undefined){
            userStore.setUser(responce.data[1]);
            userStore.setToken(responce.data[0]);
            navigate('/');
        }
    }

    const handleClick = () => {
        if(authType === 0){
            setAuthType(1);
        }

        else{
            setAuthType(0);
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleFirstname = (e) => {
        setFirstname(e.target.value);
    }

    const handleLastname = (e) => {
        setLastname(e.target.value);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleIIN = (e) => {
        setIin(e.target.value);
    }

    return(
        <main className='wrapper'>
            <div className={authType === 1 ? 'auth-type left' : 'auth-type right'}>
                {authType === 1 ? <button className='auth-button' onClick={handleClick}>Log in</button> : <button className='auth-button' onClick={handleClick}>Sign Up</button>}
            </div>
            <div className='auth-content'>
                <img src={img} alt='' />
                <p className='auth-title'>Let’s get you started!</p>
                {authType === 1 ? 
                <>
                    <input className='pink-input' placeholder='Your e-mail' value={email} onChange={handleEmail}></input>
                    <input className='white-input' placeholder='Password' type='password' value={password} onChange={handlePassword}></input>
                    <input className='pink-input' placeholder='IIN' type='text' value={iin} onChange={handleIIN}></input>
                    <button className='auth-button' onClick={handleLogin}>Login</button>
                </> 
                : 
                <>
                    <input onChange={handleEmail} value={email} className='pink-input' placeholder='Your e-mail'></input>
                    <div className='auth-inputs'>
                        <input className='white-input' placeholder='First name' value={firstname} onChange={handleFirstname}></input>
                        <input className='white-input' placeholder='Last name' value={lastname} onChange={handleLastname}></input>
                    </div>
                    <input className='pink-input' placeholder='Password' value={password} onChange={handlePassword}></input>
                    <input className='white-input' placeholder='Phone number' value={phone} onChange={handlePhone}></input>

                    <p className='input-label'>Individual identification number</p>
                    <input className='pink-input' placeholder='Ex. 061130550327' value={iin} onChange={handleIIN}></input>
                    <button className='auth-button' onClick={handleSignUp}>Sign Up</button>
                </>}
            </div>
        </main>
    )
}

export default Auth;