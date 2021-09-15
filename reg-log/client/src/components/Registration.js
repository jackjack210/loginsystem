import React, {useState} from 'react'
import {NavLink, useHistory } from 'react-router-dom';
import Name from '../asset/name.png';
import Email from '../asset/email.png';
import Phone from '../asset/phone.png';
import Password from '../asset/password.png';
import ReactLogo from '../asset/pigeon_logo (1).svg';

const Registration = () => {

    const history = useHistory();

    const [user, setUser] = useState({
        name: "", email: "", phone:"", password: "", cpassword: ""
    });

    let name, value;

    const handleInputs = (e) =>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({... user, [name]:value});
    }

    const PostData = async (e) =>{
        e.preventDefault();

        const {name, email, phone, password, cpassword} = user;

        const res = await fetch('/registration', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name, email, phone, password, cpassword
            })
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert('Invalid Registration')
            console.log('Invalid Registration')
        }else{
            window.alert('Successfully Registration')
            console.log('Successfully Registration')

            history.push("/login")
        }
    }

    return (
        <section>
            <div class="container">
                <div class="user signupBx">
                <div class="imgBx"><img src={ReactLogo}/>
                </div>
                    <div class="formBx">
                    <form mathode="POST">
                        <h2>Create an account</h2>
                        <img src={Name} width="25" height="25" alt="image" />
                        <input type="text" name="name" id="name" value={user.name} onChange={handleInputs} autoComplete="off"  placeholder="Name" />
                        <img src={Email} width="25" height="25" alt="image" />
                        <input type="email" name="email" id="email" value={user.email} onChange={handleInputs} autoComplete="off"  placeholder="Email Address"/>
                        <img src={Phone} width="25" height="25" alt="image" />
                        <input type="number" name="phone" id="phone" value={user.phone} onChange={handleInputs} autoComplete="off" placeholder="PhoneNo" />
                        <img src={Password} width="25" height="25" alt="image" />
                        <input type="password" name="password" id="password" value={user.password} onChange={handleInputs} autoComplete="off"  placeholder="Create Password" />
                        <img src={Password} width="25" height="25" alt="image" />
                        <input type="password" name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInputs} autoComplete="off"  placeholder="Confirm Password" />
                        <input type="submit" name="" value="Sign Up" onClick= {PostData} />
                        <p class="signup">
                        Already have an account ? 
                        <NavLink to="/login" onclick="toggleForm();"> Sign in.</NavLink>
                        </p>
                    </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registration
