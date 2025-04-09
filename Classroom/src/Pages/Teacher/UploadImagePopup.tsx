import { Dialog } from "@mui/material"
import Button from "../../Components/customComponents/Button/Button"
import upload from '../../assets/Images/Upload.gif'
import './UploadImagePopup.scss'

const UploadImagePopup = () => {
  return (
    <>
    <div className="upload">
      <Dialog open={true} maxWidth='lg'>
        <div className="">
          <img src={upload} alt="uploadImage" width={50} height={50} />
          <h3>Drag & drop Image </h3>
          <p>or browse files on your computer</p>
        </div>
        <div>
          <Button action='Upload' className="upload-btn"/>
        </div>
      </Dialog>
    </div>
    </>
  )
}

export default UploadImagePopup
