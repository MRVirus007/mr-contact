import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { db } from "../api/firebase";
import {
  collection,
  addDoc,
  getDocs,
  QuerySnapshot,
  DocumentData,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Contact } from "../api/models/contact";

interface ContactState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
};

//Redux slice for managing contacts state.
const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContactSuccess: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    getContactsSuccess: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    updateContactSuccess: (state, action: PayloadAction<Contact>) => {
      const updatedContact = action.payload;
      const index = state.contacts.findIndex(
        (contact) => contact.id === updatedContact.id
      );
      if (index !== -1) {
        state.contacts[index] = updatedContact;
      }
    },
    deleteContactSuccess: (state, action: PayloadAction<string>) => {
      const contactId = action.payload;
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== contactId
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addContactSuccess,
  getContactsSuccess,
  updateContactSuccess,
  deleteContactSuccess,
  setLoading,
  setError,
} = contactSlice.actions;

export default contactSlice.reducer;

// Thunk Actions
//Add a Contact to Firebase and make changes to redux store
export const addContact =
  (contact: Contact): AppThunk =>
  async (dispatch: any) => {
    try {
      await addDoc(collection(db, "contacts"), contact);
      dispatch(addContactSuccess(contact));
    } catch (error: any) {
      dispatch(setError("Error adding contact to Firestore: " + error.message));
    }
  };

//Update Contact to Firebase and make changes to redux store
export const updateContact =
  (contactId: any, updatedData: Partial<Contact>): AppThunk =>
  async (dispatch: any) => {
    try {
      const contactRef = doc(db, "contacts", contactId);
      await updateDoc(contactRef, updatedData);
      dispatch(
        updateContactSuccess({ id: contactId, ...updatedData } as Contact)
      );
    } catch (error: any) {
      dispatch(
        setError("Error updating contact in Firestore: " + error.message)
      );
    }
  };

//Delete Contact From Firebase and make changes to redux store
export const deleteContact =
  (contactId: string): AppThunk =>
  async (dispatch: any) => {
    try {
      const contactRef = doc(db, "contacts", contactId);
      await deleteDoc(contactRef);
      dispatch(deleteContactSuccess(contactId));
    } catch (error: any) {
      dispatch(
        setError("Error deleting contact from Firestore: " + error.message)
      );
    }
  };

//Get Contacts from firebase and store it to redux store
export const getContacts = (): AppThunk => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, "contacts")
    );
    const contacts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      firstname: doc.data().firstname,
      lastname: doc.data().lastname,
      status: doc.data().status,
    }));
    dispatch(getContactsSuccess(contacts));
  } catch (error: any) {
    dispatch(
      setError("Error retrieving contacts from Firestore: " + error.message)
    );
  } finally {
    dispatch(setLoading(false));
  }
};
