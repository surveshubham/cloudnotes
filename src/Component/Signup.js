import React, { useState } from 'react'
import { useHistory } from 'react-router';

const host = "http://localhost:5000";

const Signup = () => {

    const [credintials, setcred] = useState({ name: "", email: "", password: "", cpassword: "" });
    let history = useHistory();

    const handleclick = async (e) => {
        e.preventDefault();
        if (credintials.password === credintials.cpassword) {
            const response = await fetch(`${host}/api/auth/createusers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ name: credintials.name, email: credintials.email, password: credintials.password }),
            });

            const json = await response.json();
            console.log(json);
            history.push("/Login");
        } else {
            alert(`password does not match`);
        }
    }


    const onChange = (e) => {
        setcred({ ...credintials, [e.target.name]: e.target.value });
    }


    return (
        <div className="container my-5 border border-success p-3">
            <h3 className="text-center font-weight-bold">SIGNUP TO CREATE AN ACCOUNT</h3>
            <form onSubmit={handleclick} className="">

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credintials.name} id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credintials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credintials.password} id="password" name="password" onChange={onChange} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                    <div id="emailHelp" className="form-text">please enter at least 8 characters including no@char</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credintials.cpassword} id="cpassword" name="cpassword" onChange={onChange} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                    <div id="emailHelp" className="form-text">rewrite password which you have entered</div>
                </div>

                <button type="submit" className="btn btn-success" disabled={credintials.name.length < 5 || credintials.password.length < 8} >Submit</button>
            </form>
        </div>
    )
}

export default Signup;
