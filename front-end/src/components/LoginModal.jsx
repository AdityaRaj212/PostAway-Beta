import axios from "axios";
import { useContext, useState } from "react"
import { AuthContext } from "./AuthContext";
import styles from './LoginModal.module.css';
import { useEffect } from "react";
import Loader from './Loader';
import { LoadingContext } from "./LoadingContext";


const LoginModal = () => {
    const {startLoading, stopLoading} = useContext(LoadingContext);
    const { isAuth, setIsAuth} = useContext(AuthContext);

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [signUpActive,setSignUpActive] = useState(false);
    // const {setIsAuth} = useContext(AuthContext);

    const toggleSignup = (e) => {
      e.preventDefault();
      setSignUpActive(!signUpActive);
    }

    const handleSignUp = async (e) => {
      e.preventDefault();
      try{
        startLoading();
        const response = await axios.post('/api/users/signup',{name,email,password});
        setSignUpActive(false);
      }catch(err){
        console.log(err);
        setError('Unable to create account :(');
      }finally{
        stopLoading();
      }
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        try{
            startLoading();
            const response = await axios.post('/api/users/signin',{email,password});
            setIsAuth(true);  
            window.location.reload();
        }catch(err){
            setError('Invalid credentials');
        }finally{
          stopLoading();
        }      
    }

    useEffect(() => {
      const ele = document.getElementById('mainContainer');
      if (isAuth) {
          ele.classList.remove('blurred');
      } else {
          ele.classList.add('blurred');
      }
  }, [isAuth]);

  if (isAuth) {
    return null;
  }

  if(signUpActive){
    return(
      <div className={`login-modal ${styles.container}`}>
      <form onSubmit={handleSignUp}>
        <h2 className="center-align">Create a new account</h2>
        {error && <p className="alert alert-danger">{error}</p>}
        <div className="row mb-3">
          <label for="userName" className="col-sm-12 col-form-label">User Name</label>
          <div className="col-sm-10">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="userName" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputEmail3" className="col-sm-12 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail3" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputPassword3" className="col-sm-12 col-form-label">Password</label>
          <div className="col-sm-10">
            <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="form-control" id="inputPassword3" />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
          <div className={styles.loginOrCreate}>
              Already have account? <a href='#' onClick={toggleSignup}>Sign In</a>
          </div>
        </div>
        <div>
          <Loader duration={1}/>
        </div>
      </form>
    </div>
    )
  }else{
    return (
      <div className={`login-modal ${styles.container}`}>
        <form onSubmit={handleSignIn}>
          <h2 className="center-align">Login</h2>
          {error && <p className="alert alert-danger">{error}</p>}
          <div className="row mb-3">
            <label for="inputEmail3" className="col-sm-3 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail3" />
            </div>
          </div>
          <div className="row mb-3">
            <label for="inputPassword3" className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-10">
              <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="form-control" id="inputPassword3" />
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Login</button>
            <div className={styles.loginOrCreate}>
              Don't have account? <a href='#' onClick={toggleSignup}>Sign Up</a>
            </div>
          </div>
        </form>
      </div>
    );
  }

};

export default LoginModal;