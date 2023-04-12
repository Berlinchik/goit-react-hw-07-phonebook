import s from './ContactList.module.scss';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import { deleteContacts } from '../../redux/contactsSlice';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts =
    contacts.length > 0
      ? contacts.filter(({ userName }) =>
          userName.toLowerCase().includes(filter)
        )
      : contacts;

  return filteredContacts.length > 0 ? (
    <ul className={s.list}>
      {filteredContacts.map(({ userName, number, id }) => (
        <li key={id} className={s.item}>
          {userName}: {number}
          <button onClick={e => dispatch(deleteContacts(id))} className={s.btn}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className={s.text}>You don't have contacts</p>
  );
};

export default ContactList;
