import { Item } from '../item/Item';
import PropTypes from 'prop-types';
import './List.css';

export function List({ list }) {
  return (
    <ul className='list'>{
      list.map(item =>
        <li className='list-item' key={item.id} >{
          <Item children={item} />}
        </li>
      )}
    </ul>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    item: PropTypes.objectOf(PropTypes.shape({ id: PropTypes.number }))
  })).isRequired
};
