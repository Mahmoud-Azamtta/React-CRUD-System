import React, { useEffect, useState } from "react";
import Button from "../../shared/Button/Button";
import "./ShowAll.css"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../shared/Loader/Loader";

function ShowAll() {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const { data } = await axios.get(
      "https://crud-users-gold.vercel.app/users/"
    );
    setUsers(data.users);
    setLoading(false);
  };

  const deleteUser = async (id) => {
    setLoading(true);
    const {data} = await axios.delete(`https://crud-users-gold.vercel.app/users/${id}`);
    console.log(data);
    if (data.message == "success") {
      initiatToast();
      setLoading(false);
      getUsers();
    }
  };

  const initiatToast = () => {
    toast.success("User delelted successfuly", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []);

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="wrapper">
      <h2 className="m-4 pb-2 border-bottom text-white fw-bold">All Users</h2>
      <div className="bg-dark m-4 p-4 rounded-4 shadow">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="table-row">
                      <td>{index}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>
                        <Button
                          label={<img src="/assets/delete-user.svg" alt=""/>}
                          buttonClass="delete-user"
                          clickHandler={() => deleteUser(user._id)}
                        />
                        <Link to={`/user/${user._id}`}>
                          <Button
                            label={<img src="/assets/details.svg" alt=""/>}
                            buttonClass="details"
                          />
                        </Link>
                        <Link to={`/user/update/${user._id}`}>
                          <Button
                            label={<img src="/assets/update-icon.svg" alt=""/>}
                            buttonClass="update-user"
                          />
                        </Link>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
            ) : (
              <h2>No users data</h2>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowAll;
