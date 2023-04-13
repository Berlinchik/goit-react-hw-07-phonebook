import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.items.contacts;
export const selectFilter = state => state.items.filter;
export const selectLoading = state => state.items.isLoading;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.length > 0
      ? contacts.filter(({ name }) => name.toLowerCase().includes(filter))
      : contacts;
  }
);
