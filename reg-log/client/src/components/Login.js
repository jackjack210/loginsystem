import React, {useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom';
import Email from '../asset/email.png';
import Password from '../asset/password.png';
import ReactLogo from '../asset/pigeon_logo (1).svg';

const Login = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) =>{
        e.preventDefault();

        const res = await fetch('/signin', {
            method:'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email, password
            })
        });

        const data = res.json();

        if (res.status === 400 || !data) {
            window.alert("invalid credentials")
        } else {
            window.alert("successfull")
            history.push("/");
        }
    }

    return (
        <section>
            <div class="container">
                <div class="user signinBx">
                <div class="imgBx"><img src={ReactLogo}/>
                </div>
                    <div class="formBx">
                    <form mathode="POST">
                        <h2>Welcome Back</h2>
                        <img src={Email} width="25" height="25"></img>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                        <img src={Password} width="25" height="25"></img>
                        <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <input type="submit" name="" value="Signin" onClick={loginUser} />
                        <p class="signup">
                        Not have acccount just..! 
                        <NavLink to="/registration" onclick="toggleForm();"> Sign Up.</NavLink>
                        </p>
                    </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
