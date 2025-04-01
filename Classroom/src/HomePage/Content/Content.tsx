import bg from '../../assets/Images/Landing-image.svg'
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
            <button className='btn'>Join Classroom as Student</button>
          </div>
        </div>
        <div className="section2">
            <img src={bg} alt="" />
        </div>
        
    </div>
  )
}

export default Content