
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
import {LoginPage} from './components/AccountSettings/LoginPage';
import {SignupPage} from './components/AccountSettings/signup';
import { CreateBlogPost } from './createBlogPost'
import { CreateGalleryPhoto } from './createGalleryPhoto';

import { LoginContextProvider } from './providers/LoginContextProvider';
import { UserLoggedInContextProvider } from './providers/UserLoggedInContextProvider';

import {BlogEntry} from './blogEntry'
import { GalleryPhotoEntry } from './galleryPhotoEntry';

function App() {
  return (
    <BrowserRouter className="router" basename='/'>
      <div className="app">
        <LoginContextProvider>
            <UserLoggedInContextProvider>
              <Menu/>
              <div className='main'> 
                  <Routes> 
                    <Route key="front-page" path="/" element={ <FrontPage/> } />
                    <Route key="galleries" path="/galleries" element={ <Galleries/> } />
                    <Route key="galleryPhoto" path="/galleries/:galleryphoto_id" element={ <GalleryPhotoEntry/> } />
                    <Route key="about" path="/about" element={ <About/> } />
                    <Route key="blog" path="/blog" element={<Blog/>} />
                    <Route key="blog-entry" path="/blog/:blog_id" element={<BlogEntry />}/>
                    <Route key="faq" path="/faq" element={ <Faq/> } />
                    <Route key='login' path='/login' element={<LoginPage/>}/> 
                    <Route key="signup" path="/signup" element={<SignupPage />} />
                    

                    <Route key="createblogpost" path="/createblogpost" element={< CreateBlogPost />} />
                    <Route key="creategalleryphoto" path="/creategalleryphoto" element={< CreateGalleryPhoto />} />


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
