import { useSelector } from "react-redux"
function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center my-7 text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <img className="w-24 h-24 rounded-full self-center object-cover mt-2 cursor-pointer" src={currentUser.profilePicture} alt="profile" />
        <input type="text" defaultValue={currentUser.username} placeholder="Username" className="bg-slate-100 rounded-lg p-3" id="username" />
        <input type="email" defaultValue={currentUser.email} placeholder="Email" className="bg-slate-100 rounded-lg p-3" id="email" />
        <input type="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3" id="password" />
        <button className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
