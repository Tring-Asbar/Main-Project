import katon from '../../assets/Images/KatonImg.svg';
import './SplashScreen.scss'

const SplashScreen = () => {
  return (
    <div className='splash'>
        <img src={katon} alt="splash"/>
        <h2>KATON</h2>
        <p>360-Degree Knowledge Hub</p>
    </div>
  )
}

export default SplashScreen
