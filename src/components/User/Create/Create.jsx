import { useState } from "react";
import axios from "axios";
import Input from "../../shared/Input/Input";
import Loader from "../../shared/Loader/Loader";
import { toast } from "react-toastify";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import { validateUserData } from "../../../validation/uservalidation";

function Create() {
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
  const navigate = useNavigate();
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  let [errors, setErrors] = useState({});
  let [backendError, setBackendError] = useState("");
  let[isLoading, setLoading] = useState(false);
  const dataChanged = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    console.log(user);
  };

  const initiatToast = () => {
    toast.success("User added successfuly", {
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

  const submitData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const validationErrors = validateUserData(user);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const { data } = await axios
        .post("https://crud-users-gold.vercel.app/users/", user)
        .catch((error) => {
          setBackendError(error.response.data.message);
          setLoading(false);
        });
      if (data.message == "success") {
        initiatToast();
        navigate("/user/show-all");
        setLoading(false);
      }
      // I can use a regular try catch stetement just like the code below:
      // try {
      //   const { data } = await axios.post(
      //     "https://crud-users-gold.vercel.app/users/",
      //     user
      //   );
      //   if (data.message == "success") {
      //     initiatToast();
      //     navigate("/user/show-all");
      //   }
      // } catch (error) {
      //   console.log(error.response.data.message);
      // }
    }
    else 
      setLoading(false);
  };

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form
        method=""
        className="create-form w-50 p-5 rounded-4 shadow bg-dark text-white"
        onSubmit={() => submitData(event)}
      >
        <h2 className="border-bottom pb-2 mb-4 fw-bold">Add a user</h2>
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
          Add
        </button>
      </form>
    </div>
  );
}

export default Create;
