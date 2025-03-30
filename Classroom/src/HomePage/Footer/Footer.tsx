import './Footer.scss'
import facebook from '../../assets/Images/Footer/Facebook.svg'
import insta from '../../assets/Images/Footer/Insta.svg'
import linkedin from '../../assets/Images/Footer/Linkedin.svg'
import x from '../../assets/Images/Footer/X.svg'
import youtube from '../../assets/Images/Footer/Youtube.svg'
import tiktok from '../../assets/Images/Footer/Tiktok.svg'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <p>FAQ</p>
        <p>Legal</p>
        <p>Support</p>
      </div>
      <div className='footer-left'>
      <p>@2025 Katon</p>
      <p>Version:1.0.7.3</p>
      </div>
      <div className="footer-right">
       <a href=""><img src={facebook}/></a>
        <a href=""><img src={insta}/></a>
        <a href=""><img src={linkedin}/></a>
        <a href=""><img src={x}/></a>
        <a href=""><img src={youtube}/></a>
        <a href=""><img src={tiktok}/></a> 
      </div>
    </div>
  )
}

export default Footer