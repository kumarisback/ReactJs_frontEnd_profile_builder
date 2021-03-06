import React from 'react'
import { useNavigate } from 'react-router-dom';
import myInitObject from "../ApiUrl/url";
import img  from "../images/img.jfif"
const Card = (data) => {
  let navigate=useNavigate();
    const user =data.data;
    
    let image=img;
    if(user.filedata !=null && user.filedata["file"]!=null){
      image= "data:image/png;base64," +user.filedata["file"] ;
    }
      
  return (
    <div >
        <div className="rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-blue-500  ">
  	<img src="https://i.imgur.com/dYcYQ7E.png" className="w-full" />
    <div className="flex justify-center -mt-8">
        <img src={image} className="rounded-full border-solid border-white border-2 -mt-3 object-contain h-48 w-60" />		
    </div>
	<div className="text-center px-3 pb-6 pt-2">
		<h3 className="text-white text-sm bold font-sans">{user.name}</h3>
		<p className="mt-2 font-sans font-light text-white">{user.about}</p>
	</div>
  	<div className="flex justify-center pb-3 text-white">
    <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={()=>navigate(`/profile/${user.id}`)}>Detail</button>
      
  	</div>
</div>
    </div>
  )
}

export default Card