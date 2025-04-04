import './Advertisement.scss'
import ad1 from '../../../assets/Images/Advertisements/Advertisement1.svg'
import ad2 from '../../../assets/Images/Advertisements/Advertisement2.svg'

const Advertisement = () => {
  return (
    <div className="advertisement-content">
      <div className='img1'>
        <img src={ad1}  alt="Image" />
      </div>
      <div className='img2'>
        <img src={ad2}  alt="Image" />
      </div>
    </div>
  )
}

export default Advertisement
