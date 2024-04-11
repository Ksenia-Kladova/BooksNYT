import type { ChangeEvent } from 'react';
import './Select.css';
import { useBookCategory } from './SelectContext';

export function Select() {
    const { updateSelectedCategory } = useBookCategory();

    const handlerChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateSelectedCategory({
            value: event.target.value,
            label: event.target.selectedOptions[0].textContent
        });
    };

    const options = [{ value: "trade-fiction-paperback", title: "Fiction" },
    { value: "mass-market-paperback", title: "Paperback Mass-Market Fiction" },
    { value: "manga", title: "Manga" },
    { value: "business-books", title: "Business" }]

    return (
        <div>
            <label htmlFor="categories" className='select__label'>Categories</label>
            <select id='categories' onChange={handlerChange} className='select' defaultValue={"trade-fiction-paperback"}>
                {options.map((option, index) => (
                    <option key={index} value={option.value} label={option.title} >{option.title}</option>)
                )}
            </select>
        </div>
    )
}