import { useState } from 'react';
import s from './ContactForm.module.scss';
import { nanoid } from 'nanoid';
import { addContacts } from '../../redux/contactsSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';

const ContactForm = () => {
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { value, name } = event.currentTarget;
    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const value = e.currentTarget.elements.userName.value;
    const elem = contacts.find(
      ({ userName }) => userName.toLowerCase() === value.toLowerCase()
    );

    if (!elem) {
      dispatch(addContacts({ userName, number }));
    } else {
      return alert(`${elem.userName} is already in contacts`);
    }

    setUserName('');
    setNumber('');
  };

  const nameId = nanoid();
  const numId = nanoid();

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label} htmlFor={nameId}>
        Name
        <input
          className={s.input}
          id={nameId}
          type="text"
          name="userName"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={userName}
          onChange={handleInputChange}
        />
      </label>
      <label className={s.label} htmlFor={numId}>
        Number
        <input
          className={s.input}
          id={numId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInputChange}
        />
      </label>
      <button className={s.btn}>Add contact</button>
    </form>
  );
};

export default ContactForm;
