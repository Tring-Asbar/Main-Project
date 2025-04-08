import Lottie from "lottie-react"
import './Loader.scss'
import LoaderAnimation from '../assets/Loader/lottieLoader.json'

const Loader = () => {
  return (
    <div className="loader">
        <Lottie animationData={LoaderAnimation} className="animation"/>
    </div>
  )
}

export default Loader
