import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../shared/Input/Input";
import Loader from "../../shared/Loader/Loader";
import { toast } from "react-toastify";
import { validateUserData } from "../../../validation/uservalidation";

function Update() {
  const inputs = [
    {
      id: 1,
      title: "Username",
      type: "text",
      id: "name",
      name: "name",
    },
    {
      id: 2,
      title: "Email Address",
      type: "email",
      id: "email",
      name: "email",
    },
    {
      id: 3,
      title: "Password",
      type: "password",
      id: "password",
      name: "password",
    },
  ];
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  let [id, setId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [backendSearchError, setBackendSearchError] = useState("");
  const [backendError, setBackendError] = useState("");
  const [hasId, setHasId] = useState(false);
  const [searchError, setSearchError] = useState("");

  id = useParams().id;

  const initiatToast = () => {
    toast.success("User added successfuly", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const dataChanged = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    console.log(user);
  };

  //TODO: doesn't workd because of the setId problem
  const searchForId = async (event) => {
    console.log(id);
    event.preventDefault();
    // setLoading(true);
    // const { data } = await axios.get(
    //   "https://crud-users-gold.vercel.app/users"
    // );
    // let currentUser = {};
    // for (const user of data) {
    //   if (user._id == id) {
    //     currentUser = user;
    //     break;
    //   }
    // }
    // if (Object.keys(currentUser).length === 0) setUser(currentUser);
    // else setBackendError("id does not exist");
    // console.log(currentUser);
    // console.log(user);
  };
  
  const getUserData = async () => {
    if (!id)
      return;
    setLoading(true);
    const {data} = await axios.get(`https://crud-users-gold.vercel.app/users/${id}`);
    setUser(data.user);
    setLoading(false);
  }

  const updateUser = async (event) => {
    event.preventDefault();
    console.log(id);
    setLoading(true);
    const validationErrors = validateUserData(user);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const { data } = await axios
        .put(`https://crud-users-gold.vercel.app/users/${id}`, user)
        .catch((error) => {
          setBackendError(error.response.data.message);
          setLoading(false);
        });
        console.log(data);
      if (data.message == "success") {
        initiatToast();
        navigate("/user/show-all");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  //TODO: problem setId does not work properly
  const handleChange = (event) => {
    let tempId = event.target.value;
    setId(tempId);
  };

  useEffect(() => {
    setHasId(id);
    getUserData();
  }, []);

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50 p-5 rounded-4 shadow bg-dark text-white">
        <h2 className="border-bottom pb-2 mb-4 fw-bold">Update user</h2>
        {!hasId && (
          <React.Fragment>
            {/* {backendSearchError && ( */}
              <div className="backend-error error-message text-center px-1 py-2 mb-3 rounded-3">
                <p className="m-0">The functionality Search for user by Id is not done yet :'(</p>
              </div>
            {/* )} */}
            <form
              method=""
              className="border-bottom pb-3 mb-2"
              onSubmit={searchForId}
            >
              <Input
                title="Search for a user by id:"
                type="text"
                id="x"
                name="x"
                errorMessage={searchError}
                value={id}
                onChange={handleChange}
              />
              <button className="submit px-3 py-2 rounded mt-2">Search</button>
            </form>
          </React.Fragment>
        )}
        <form method="" className="" onSubmit={() => updateUser(event)}>
          {backendError && (
            <div className="backend-error text-center py-2 mb-3 rounded-3">
              <p className="m-0">{backendError}</p>
            </div>
          )}
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              errorMessage={errors[input.name]}
              value={user[input.name]}
              onChange={dataChanged}
            />
          ))}
          <button type="submit" className="submit px-3 py-2 rounded mt-2">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
