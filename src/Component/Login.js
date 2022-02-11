import React ,{useState} from 'react'
import { useHistory } from 'react-router';

const host = "http://localhost:5000";


const Login = () => {

    const [credintials, setcred] = useState({email: "", password: ""});
    let history =  useHistory();
    const handleclick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/loginuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email : credintials.email , password : credintials.password}),
          });
          
          const json = await response.json();
          console.log(json);
          if(json.success) {
              localStorage.setItem('token',json.authtoken);
              history.push("/");
          }else{
              alert("invalid credintials");
          }
    }


   const onChange = (e) => {
     setcred({ ...credintials, [e.target.name]: e.target.value });
   }

    return (
        <div className="container my-5 border border-success p-3">
            <form onSubmit={handleclick} className="">
            <h3 className="text-center font-weight-bold">LOGIN TO USE CLOUD-NOTES</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credintials.email} id="email" name="email"  onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credintials.password} id="password" name="password"  onChange={onChange}   />
                </div>   
                <button type="submit" className="btn btn-success" >Submit</button>
            </form>
        </div>
    )
};

export default Login;
