import React from "react";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditPatient = () => {
  const [state, setstate] = useState({
    UserName: "",
    Email: "",
    Password: "",
    ContactNumber: "",
    Address: "",
    DOB: "",
    Gender: "",
    loading: false,
  });

  const navigate = useNavigate()
  const { id } = useParams();

  const token = Cookies.get("token");
  const api = import.meta.env.VITE_API_BASE_URL;

  const EditInstance = axios.create({
    baseURL: api,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  function handleChange(e) {
    const { id, value, type } = e.target;
    if (type === "radio") {
      setstate({ ...state, Gender: value });
    } else {
      setstate({ ...state, [id]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!/^\+?\d{10}$/.test(state.ContactNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.Email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setstate((prev) => ({ ...prev, loading: true }));

    try {
      const response = EditInstance.post(`/user/update/${id}`, {
        userName: state.UserName,
        email: state.Email,
        contactNumber: state.ContactNumber,
        address: state.Address,
        gender: state.Gender,
        dateOfBirth: state.DOB,
      });
      toast.success("updated successfully");
      setstate({
        UserName: "",
        Email: "",
        Password: "",
        ContactNumber: "",
        Address: "",
        DOB: "",
        Gender: "",
        loading: false,
      })
      navigate("/patients")
    } catch (error) {
      toast.error(error.response.data.message || "updation failed");
    } finally {
      setstate((prev) => ({ ...prev, loading: false }));
    }
  }

  return (
    <>
      <form action="">
        <div>
          <label htmlFor="UserName">UserName</label>
          <input
            type="text"
            id="UserName"
            value={state.UserName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            id="Email"
            value={state.Email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input type="password" value="********" readOnly />
        </div>
        <div>
          <label htmlFor="ContactNumber">ContactNumber</label>
          <input
            type="text"
            id="ContactNumber"
            value={state.ContactNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Address">Address</label>
          <input
            type="text"
            id="Address"
            value={state.Address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Gender">Gender</label>
          <div>
            <label htmlFor="Male">Male</label>
            <input
              type="radio"
              name="Gender"
              id="Male"
              value="Male"
              checked={state.Gender === "Male"}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="Female">Female</label>
            <input
              type="radio"
              name="Gender"
              id="Female"
              value="Female"
              checked={state.Gender === "Female"}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="DOB">Date-of-Birth</label>
          <input
            type="date"
            name="DOB"
            id="DOB"
            value={state.DOB}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Update
        </button>
      </form>
      <ToastContainer/>
    </>
  );
};

export default EditPatient;
