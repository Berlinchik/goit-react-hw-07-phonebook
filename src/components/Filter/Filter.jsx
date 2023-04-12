import s from './Filter.module.scss';
import { changeFilter } from '../../redux/contactsSlice';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <input
      className={s.input}
      type="text"
      onChange={e => dispatch(changeFilter(e.target.value))}
    />
  );
};

export default Filter;
