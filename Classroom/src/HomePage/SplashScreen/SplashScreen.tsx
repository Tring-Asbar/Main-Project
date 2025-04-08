import katon from '../../assets/Images/KatonImg.svg';
import './SplashScreen.scss'

const SplashScreen = () => {
  return (
    <div className='splash'>
        <img src={katon} alt="splash"/>
    </div>
  )
}

export default SplashScreen