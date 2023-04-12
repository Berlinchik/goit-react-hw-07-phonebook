import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initState = {
  contacts: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'items',
  initialState: initState,
  reducers: {
    addContacts: {
      reducer(state, { payload }) {
        return {
          ...state,
          contacts: [...state.contacts, payload],
        };
      },
      prepare(value) {
        return {
          payload: {
            ...value,
            id: nanoid(),
          },
        };
      },
    },
    deleteContacts(state, { payload }) {
      return {
        ...state,
        contacts: state.contacts.filter(el => el.id !== payload),
      };
    },
    changeFilter(state, { payload }) {
      return {
        ...state,
        filter: payload,
      };
    },
  },
});

export const { addContacts, deleteContacts, changeFilter } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
