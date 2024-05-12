import { Item } from '../item/Item';
import './List.css';

type Props = {
  list: {
    id: number,
    image: string,
    title: string,
    author: string,
    publisher: string,
    width: number
  }[]
}

export function List({ list }: Props) {
  return (
    <div className='list-wrap'>
      <ul className='list'>{
        list.map(item =>
          <li className='list-item' key={item.id} style={{ width: `${item.width}px` }}>{
            <Item children={item} />}
          </li>
        )}
      </ul>
    </div>
  )
}
