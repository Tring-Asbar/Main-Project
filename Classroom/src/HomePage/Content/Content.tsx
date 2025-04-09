import bg from '../../assets/Images/Landing-image.svg'
import Button from '../../Components/customComponents/Button/Button'
import './Content.scss'

const Content = () => {
  return (
    <div className="container">
        <div className="section1">
          <div>
            <p>Katon 360 Classroom</p>
            <h1>TEACH SMART,</h1>
            <h1>LEARN EASY.</h1>
            <p>Welcome to the 360 Classroom where Teachers, Students and Parents meet to continue the traditional classroom activities.</p>
          </div>
          <div>
            <Button action="Join Classroom as Student" className='btn'/>
          </div>
        </div>
        <div className="section2">
            <img src={bg} alt="background" />
        </div>
        
    </div>
  )
}

export default Content
