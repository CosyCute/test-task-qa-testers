import React, { ChangeEvent, FocusEvent, useState } from 'react';
import database from '../../database.json'

import { useAppSelector, useAppDispatch } from '../../store/hooks/redux';

import { TbChevronLeft, TbChevronRight, TbChevronsLeft, TbChevronsRight } from 'react-icons/tb'
import classes from './Pagination.module.scss'
import Select from '../Select/Select';
import { paginationSlice } from './../../store/reducers/paginationSlice';
import { useEffect } from 'react';

const Pagination = () => {

    const dispatch = useAppDispatch()

    const itemsQuantity = useAppSelector(state => state.pagination.itemsQuantity)

    const [page, setPage] = useState<string>('1')
    const [selectActive, setSelectActive] = useState<boolean>(false)
    const [maxPages, setMaxPages] = useState<number>(1)

    const handlerInputPage = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target.value
        const targetNumber = parseInt(target)
        if (!isNaN(targetNumber) &&
            !target.toString().includes(' ') &&
            !(targetNumber === 0) &&
            targetNumber < maxPages - 1 &&
            targetNumber >= 1) {
            setPage(target.toString())
            dispatch(paginationSlice.actions.setPage(Number(target)))
        }

        if (Number(target) >= maxPages) handlerLastPage()

        if (target.toString() === '') setPage(target.toString())
    }

    const handlerFirstPage = () => {
        dispatch(paginationSlice.actions.setFirstPage())
        setPage('1')
    }
    const handlerSetPage = (page: number) => {
        if (page >= 1 && page <= maxPages) {
            dispatch(paginationSlice.actions.setPage(page - 1))
            setPage(page.toString())
        }
    }
    const handlerLastPage = () => {
        dispatch(paginationSlice.actions.setLastPage())
        setPage(maxPages.toString())
    }

    const handlerBlur = (event: FocusEvent<HTMLInputElement>) => {
        if (event.target.value === '') handlerFirstPage()
    }

    useEffect(() => {
        let localMaxPages = Math.ceil(database.length / itemsQuantity)
        if (database.length / itemsQuantity - Math.floor(database.length / itemsQuantity)) {
            setMaxPages(Math.ceil(localMaxPages))
        }
        else {
            setMaxPages(localMaxPages)
        }
        if (localMaxPages < Number(page)) {
            handlerFirstPage()
        }
    }, [itemsQuantity])


    return (
        <div className={classes.container}>
            <div className={classes.info}>записи 1-{maxPages}</div>
            <div className={classes.buttons}>
                <button onClick={handlerFirstPage}><TbChevronsLeft /></button>
                <button onClick={() => handlerSetPage(Number(page) - 1)}><TbChevronLeft /></button>
                <input onBlur={handlerBlur} value={page} onChange={handlerInputPage} />
                <button onClick={() => handlerSetPage(Number(page) + 1)}><TbChevronRight /></button>
                <button onClick={handlerLastPage}><TbChevronsRight /></button>
            </div>
            <div className={classes.itemsQuantity}>
                <span>по</span>
                <div><Select active={selectActive} setActive={setSelectActive} /></div>
                <span>записей</span>
            </div>
        </div>
    );
};

export default Pagination;