import {FrontPage} from './frontPage'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Menu} from './menu'
import {Galleries} from './galleries'
import {About} from './about'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BottomRibbon } from './bottomRibbon';

function App() {
  return (
    <BrowserRouter className="router">
      <div className="app">
        <Menu/>
        <div className='main'> 
            <Routes> 
              <Route key="/" path="/" element={ <FrontPage/> } />
              <Route key="/galleries" path="/galleries" element={ <Galleries/> } />
              <Route key="/about" path="/about" element={ <About/> } />
            </Routes> 

        </div>
        <BottomRibbon/>
      </div>



    </BrowserRouter>
  );
}

export default App;
