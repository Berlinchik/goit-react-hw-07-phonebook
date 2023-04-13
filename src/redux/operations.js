import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addContactsApi,
  getContactsApi,
  removeContactsApi,
} from '../services/contactsApi';

export const addContacts = createAsyncThunk(
  'contacts/add',
  async (newContact, thunkApi) => {
    try {
      const contact = await addContactsApi(newContact);
      return contact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/delete',
  async (id, thunkApi) => {
    try {
      await removeContactsApi(id);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getContacts = createAsyncThunk(
  'contacts/get',
  async (_, thunkApi) => {
    try {
      const data = await getContactsApi();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { contacts } = getState().items;

      if (!contacts.length) return true;
      return false;
    },
  }
);
