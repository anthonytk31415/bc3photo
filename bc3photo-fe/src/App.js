
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import {FrontPage} from './frontPage'
import {Menu} from './menu'
import {Galleries} from './galleries'
import {About} from './about'
import { BottomRibbon } from './bottomRibbon';
import { Faq } from './faq';
import { Blog } from './blog';
import {LoginPage} from './login';
import {SignupPage} from './signup';
import { CreateBlogPost } from './createBlogPost'

import { LoginContextProvider } from './providers/LoginContextProvider';
import { UserLoggedInContextProvider } from './providers/UserLoggedInContextProvider';

function App() {
  return (
    <BrowserRouter className="router">
      <div className="app">
        <LoginContextProvider>
            <UserLoggedInContextProvider>
              <Menu/>
              <div className='main'> 
                  <Routes> 
                    <Route key="front-page" path="/" element={ <FrontPage/> } />
                    <Route key="galleries" path="/galleries" element={ <Galleries/> } />
                    <Route key="about" path="/about" element={ <About/> } />
                    <Route key="blog" path="/blog" element={ <Blog/> } />
                    <Route key="faq" path="/faq" element={ <Faq/> } />
                    <Route key='login' path='login' element={<LoginPage/>}/> 
                    <Route key="signup" path="signup" element={<SignupPage />} />
                    <Route key="createblogpost" path="createblogpost" element={< CreateBlogPost />} />
                  </Routes> 
              </div>
              <BottomRibbon/>
            </UserLoggedInContextProvider>
          </LoginContextProvider>
      </div>



    </BrowserRouter>
  );
}

export default App;
