import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { addContact, updateContact } from "../../redux/contactSlice";
import { Contact } from "../../api/models/contact";

function AddContact() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const contact = contacts.find((c) => c.id === id);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstname);
      setLastName(contact.lastname);
      setStatus(contact.status);
    }
  }, [contact]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (firstName === '' || lastName === '') {
      alert("please fill First Name and Last Name");
      return;
    }

    const updatedContact: Contact = {
      id: "",
      firstname: firstName,
      lastname: lastName,
      status: status,
    };

    try {
      if (contact) {
        // Update existing contact
        dispatch(updateContact(id, updatedContact));
        alert("Contact Saved Successfully!")
      } else {
        // Add new contact
        dispatch(addContact(updatedContact));
        setFirstName("");
        setLastName("");
        setStatus(true);
        alert("Contact Created Successfully!")
      }
    } catch (error) {
      console.error("Error adding contact: ", error);
    }
  };
  return (
    <>
      <form className="w-full max-w-sm" onSubmit={handleFormSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              First Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-first-name"
              type="text"
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-last-name"
            >
              Last Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-last-name"
              type="text"
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-last-name"
            >
              Status
            </label>
          </div>
          <div className="md:w-2/3">
            <div className="mx-auto max-w-sm text-center flex flex-wrap justify-center">
              <div className="flex items-center mr-4">
                <input
                  id="inline-status-active"
                  type="radio"
                  name="status"
                  className="hidden"
                  onChange={(e) => setStatus(true)}
                  checked={status === true}
                />
                <label
                  htmlFor="inline-status-active"
                  className="flex items-center cursor-pointer"
                >
                  <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                  Active
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="inline-status-inactive"
                  type="radio"
                  name="status"
                  className="hidden"
                  onChange={(e) => setStatus(false)}
                  checked={status === false}
                />
                <label
                  htmlFor="inline-status-inactive"
                  className="flex items-center cursor-pointer"
                >
                  <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex justify-between">
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-10 mb-2"
              type="submit"
            >
              {contact ? "Save Editted Contact" : "Save Contact"}
            </button>
          </div>
          <div className="md:w-1/3">
          <button
              className="shadow bg-orange-300 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => navigate('/')}
            >
              Go Back
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddContact;
