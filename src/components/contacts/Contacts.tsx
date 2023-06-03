import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { getContacts, deleteContact } from "../../redux/contactSlice";
function Contacts() {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const loading = useSelector((state: RootState) => state.contacts.loading);
  const error = useSelector((state: RootState) => state.contacts.error);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDeleteContact = async (id: any) => {
    try {
      dispatch(deleteContact(id));
      navigate('/');
    } catch (error) {
      console.error("Error deleting contact: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-nowrap justify-center m-4">
        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          <Link to="/addcontact">Create Contact</Link>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div className="mr-4 rounded shadow-lg mb-3">
            <img
              src="https://via.placeholder.com/400x400"
              alt="placeholder images"
            />
            <div className="px-6 py-4">
              <div className="font-bold mb-2 text-md">
                {contact.firstname} {contact.lastname}
              </div>
              <p className="text-gray-700 text-base">
                <div className="flex justify-between">
                  <button
                    className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold rounded py-[2%] px-[10%]"
                    type="button"
                  >
                    <Link to={ '/editcontact/' + contact.id}>Edit</Link>
                  </button>
                  <button
                    className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-[2%] px-[10%] rounded"
                    type="button"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    Delete
                  </button>
                </div>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Contacts;
