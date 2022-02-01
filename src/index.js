import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './assets/styles.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './views/Home/Home';
import { AppReducer, INITIAL_STATE } from './reducers/AppReducer';
import Post from './views/Post/Post';
import Category from './views/Category/Category';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Settings from './views/Settings/Settings';

export const appContext = React.createContext([]);

const App = () => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);

  return (
    <appContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/login" element={state.logged ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={state.logged ? <Navigate to="/" /> : <Register />} />
          <Route path="/settings" element={!state.logged ? <Navigate to="/" /> : <Settings />} />
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </appContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
