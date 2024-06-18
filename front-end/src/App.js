import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import './App.css';
import Home from './components/Home';
import { AuthContext, AuthProvider } from './components/AuthContext';
import LoginModal from './components/LoginModal';
import { LoadingProvider } from './components/LoadingContext';
import { UserProvider } from './components/UserContext';
import Loader from './components/Loader';
import ProfilePage from './components/ProfilePage';

function App() {
  const {isAuth} = useContext(AuthContext);

  return (
    <LoadingProvider>
      <AuthProvider>
        <UserProvider>
          <Router>
            <Loader duration={.5}/>
            {!isAuth && <LoginModal />}
            <div className={isAuth ? '' : 'blurred'} id='mainContainer'>
            {/* <div> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile/:userId" element={<ProfilePage/>}/>
              </Routes>
            </div>
          </Router>
        </UserProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
