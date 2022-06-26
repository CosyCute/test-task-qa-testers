import React from 'react';

import classes from './Select.module.scss'
import { useState } from 'react';
import { TbChevronDown } from 'react-icons/tb';
import { useAppDispatch } from '../../store/hooks/redux';
import { paginationSlice } from '../../store/reducers/paginationSlice';

interface SelectProps {
    active: boolean;
    setActive: Function
}

const arr = [5, 10, 15, 20, 25]

const Select = ({ active, setActive }: SelectProps) => {

    const dispatch = useAppDispatch()

    const [selected, setSelected] = useState<number>(5)

    const handlerActive = (item: number) => {
        setSelected(item)
        setActive(false)
        dispatch(paginationSlice.actions.setItemsQuantity(item))
    }

    return (
        <div className={`${active ? classes.activeMenu : ''} ${classes.container}`}>
            <span
                onClick={() => setActive(!active)}
            >
                {selected}
                <div><TbChevronDown /></div>
            </span>
            <ul>
                {arr.map((item: any) => {
                    const activeMenuItemClass = selected === item.name ? classes.activeMenuItem : ''

                    return <li
                        key={item}
                        className={activeMenuItemClass}
                        onClick={() => handlerActive(item)}
                    >
                        {item}
                    </li>
                })}
            </ul>
        </div>
    );
};

export default Select;