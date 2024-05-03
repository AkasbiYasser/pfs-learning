import './App.css'

//components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Course from './components/Course/Course';
import About from './components/About/About';
import Newsletter from './components/Newsletter/Newsletter';

function App() {

  return (
    <>
      <Header />
      <Home />
      <Course />
      <About />
      <Newsletter />
      <Footer />
    </>
  )
}

export default App
