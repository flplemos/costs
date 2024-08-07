import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Navbar from './layout/Navbar';
import Container from './layout/Container';
import Footer from './layout/Footer';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

function App() {
  return (
    <Router>
      <Navbar/>
     
      <Container customClass = "min-height">
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/company" element={<Company/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/newproject" element={<NewProject/>}/>
        <Route path="/project/:id" element={<Project/>}/>
      
      </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
