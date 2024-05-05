import { BrowserRouter } from "react-router-dom";
import {About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works} from './components';

function App() {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary' >
      {/* <StarsCanvas/> */}
        <div >
          <Navbar/>
          <Hero/>
        </div>
        <About/>
        <Experience/>
        <Tech/>
        <Works/>
        <Feedbacks/>
        <div className='relative z-0'>
          <Contact/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
