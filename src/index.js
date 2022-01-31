import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './assets/styles.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import { AppReducer, INITIAL_STATE } from './reducers/AppReducer';
import Post from './views/Post/Post';
import Category from './views/Category/Category';

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
