import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {getStorage,ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const [image,setImage] = useState(undefined)
  const { currentUser } = useSelector((state) => state.user);
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError,setImageError] = useState(false)
  const [formData,setFormData] = useState({})
  useEffect(()=>{
    if(image){
      handleFileUpload(image)
    }
  },[image])
  const handleFileUpload = async (image) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime()+image.name
    const storageRef = ref (storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  }
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center my-7 text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e)=>setImage(e.target.files[0])} accept="image/*" hidden type="file" ref={fileRef} />
        <img
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 rounded-full self-center object-cover mt-2 cursor-pointer"
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
        />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          defaultValue={currentUser.username}
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          id="username"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          id="password"
        />
        <button className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
