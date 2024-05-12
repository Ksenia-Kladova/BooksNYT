import type { ChangeEvent } from 'react';
import './Select.css';
import { useBookCategory } from './SelectContext';
import { Select } from '@chakra-ui/react'

export function SelectCategory() {
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
        <div className='select__content'>
            <div className='select__wrap'>
                <label htmlFor="categories" className='select__label'>Categories</label>
                <Select bg='white' size='sm' borderRadius='4px' id='categories' onChange={handlerChange} defaultValue={"trade-fiction-paperback"}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value} label={option.title} >{option.title}</option>)
                    )}
                </Select>
            </div>
        </div>
    )
}