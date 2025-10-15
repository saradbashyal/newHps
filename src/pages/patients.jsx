import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, SquarePen, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";
const Patients = () => {
  const navigate = useNavigate();

  const [state, setstate] = useState({
    patient: [],
    search: "",
    loading: true,
  });

  const token = Cookies.get("token");
  console.log(token);
  const api = import.meta.env.VITE_API_BASE_URL;

  const patientInstance = axios.create({
    baseURL: api,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    async function dataLoad() {
      try {
        const response = await patientInstance.get("/user/get");
        const patientsres = response.data.data;
        console.log(patientsres);
        setstate((prev) => ({ ...prev, patient: patientsres || [] }));
      } catch (error) {
        console.log("api error:", error);
      } finally {
        setstate((prev) => ({ ...prev, loading: false }));
      }
    }
    dataLoad();
  }, []);

  function handleEdit(id) {
    navigate(`/EditPatient/${id}`);
  }
  function handleView(id) {
    navigate(`/ViewPatient/${id}`);
  }
  async function handleDelete(id) {
    try {
      patientInstance.post(`/user/delete/${id}`);
      setstate((prev) => ({
        ...prev,
        patient: prev.patient.filter((p) => p.id !== id),
      }));
    } catch (error) {
      toast.error(error.response.data.message || "error while deleting");
    }
  }

  const filterPatirent = state.patient.filter((p) => {
    const term = state.search.trim();
    return (
      p.id.toString().includes(term) ||
      p.userName.toLowerCase().includes(term) ||
      p.email.toLowerCase().includes(term) ||
      p.contactNumber.toLowerCase().includes(term) ||
      p.address.toLowerCase().includes(term) ||
      p.dateOfBirth.toLowerCase().includes(term) ||
      p.gender.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <section>
        <h1>Patient Table</h1>
        <div>
          <button>
            <Plus />
          </button>
          <input
            type="text"
            placeholder="Search patients..."
            value={state.search}
            onChange={(e) => setstate(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.loading ? (
              <tr>
                <td>loading...</td>
              </tr>
            ) : state.patient.length > 0 ? (
              state.patient.map((p) => {
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.userName}</td>
                    <td>{p.email}</td>
                    <td>{p.contactNumber}</td>
                    <td>{p.address}</td>
                    <td>{p.dateOfBirth}</td>
                    <td>{p.gender}</td>
                    <td>
                      <div>
                        <button onClick={() => handleView(p.id)}>
                          <Eye />
                        </button>
                        <button onClick={() => handleEdit(p.id)}>
                          <SquarePen />
                        </button>
                        <button onClick={() => handleDelete(p.id)}>
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Response not found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Patients;
