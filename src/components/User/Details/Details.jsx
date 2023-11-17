import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./Details.css";
import { useParams } from 'react-router-dom';

function Details() {
	const {id} = useParams("id");
	let [user, setUser] = useState({});
	const getUser = async () => {
		const {data} = await axios.get(`https://crud-users-gold.vercel.app/users/${id}`);
		setUser(data.user);
	}

	useEffect(() => {
		getUser();
	}, [])

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
		  <div className="user-details w-50 border p-4 rounded-4 shadow bg-white">
				<h2 className='border-bottom pb-2'>{user.name}</h2>
				<div className="d-flex justify-content-between align-items-center mt-4 px-5">
					<p className='property'>User id:</p>
					<p className='value'>{user._id}</p>
				</div>
				<div className="d-flex justify-content-between align-items-center px-5">
					<p className='property'>Email:</p>
					<p className='value'>{user.email}</p>
				</div>
				<div className="d-flex justify-content-between align-items-center px-5">
					<p className='property'>Created at:</p>
					<p className='value'>{user.createdAt}</p>
				</div>
				<div className="d-flex justify-content-between align-items-center px-5">
					<p className='property'>Password:</p>
					<p className='value'>{user.password}</p>
				</div>
				<div className="d-flex justify-content-between align-items-center px-5">
					<p className='property'>Status:</p>
					<p className='value'>{user.status}</p>
				</div>
				<div className="d-flex justify-content-between align-items-center px-5">
					<p className='property'>Role:</p>
					<p className='value'>{user.role}</p>
				</div>
			</div>
    </div>
  )
}

export default Details