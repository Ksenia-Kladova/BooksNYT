import { Item } from '../item/Item';
import './List.css';

type Props = {
  list: {
    id: number,
    image: string,
    title: string,
    author: string,
    publisher: string
  }[]
}

export function List({ list }: Props) {
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
