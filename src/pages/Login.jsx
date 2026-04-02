import { useState } from "react";


function Login({ setIsAuth}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/users/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if(data.success){
                localStorage.setItem('token', data.data.token);
                setIsAuth(true);
            }else{
                alert(data.message);
            }
        } catch(error){
            console.log(error.message);
        }
    };

    return(
        <div className="app">
            <h1>Login</h1>

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;