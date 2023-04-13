import { useState } from 'react';
import s from './ContactForm.module.scss';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/selectors';
import { addContacts } from '../../redux/operations';

const initState = {
  name: '',
  phone: '',
};

const ContactForm = () => {
  const [form, setForm] = useState(initState);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const value = e.currentTarget.elements.name.value;
    const elem = contacts.find(
      ({ name }) => name.toLowerCase() === value.toLowerCase()
    );

    if (!elem) {
      dispatch(addContacts({ ...form }));
    } else {
      return alert(`${elem.name} is already in contacts`);
    }
    setForm(initState);
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
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={form.name}
          onChange={handleChange}
        />
      </label>
      <label className={s.label} htmlFor={numId}>
        Number
        <input
          className={s.input}
          id={numId}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={form.phone}
          onChange={handleChange}
        />
      </label>
      <button className={s.btn}>Add contact</button>
    </form>
  );
};

export default ContactForm;
