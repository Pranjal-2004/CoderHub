import { FC } from 'react';
import Heading from '../Heading/Heading.tsx';
import './Home.css';
import Footer from '../Footer/Footer.tsx';

const Home: FC = () => {
  return (
    <div className="home-container">
      <Heading />
      <div className="image">
        <img 
          src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg" 
          alt="software developer" 
        />
      </div>
      <Footer />
    </div>
  )
}

export default Home