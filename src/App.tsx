import { Routes, Route, useNavigate } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import User from './pages/User';
import type { RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import ErrorPage from './pages/ErrorPage';
import { applyToken } from './store/auth';

export default function App() {
  const { hasToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const date = localStorage.getItem('date');
    if (!date) return navigate('/Login');
    const now = new Date().getTime();
    if (!((now - +date) as number)) return navigate('/Login');
    const token = localStorage.getItem('token');
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`,
        {
          requestType: 'VERIFY_EMAIL',
          idToken: token,
        }
      )
      .then(() => {
        dispatch(
          applyToken({
            token: token,
            date: date,
            id: '',
          })
        );
        navigate('/user');
      })
      .catch(() => {
        localStorage.clear();
        navigate('/Login');
      });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        {hasToken && <Route path='/user' element={<User />} />}
        {!hasToken && (
          <>
            <Route path='/Login' element={<LogIn />} />
            <Route path='/SignUp' element={<SignUp />} />
          </>
        )}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}
