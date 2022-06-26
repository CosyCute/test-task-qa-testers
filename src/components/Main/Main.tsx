import React, { useState } from 'react';
import database from '../../database.json'

import { CreatedUser, TableCell } from '../../interfaces/index';
import Pagination from './../Pagination/Pagination';
import { useAppSelector } from '../../store/hooks/redux';
import { Link } from 'react-router-dom'

import classes from './Main.module.scss'
import Status from '../Status/Status';

const getDate = (timestamp: number) => {
    let localDate = new Date(timestamp)
    return localDate.getDate() +
        '.' +
        (localDate.getMonth() < 10 ? '0' + localDate.getMonth() : localDate.getMonth()) +
        '.' +
        localDate.getFullYear()
}

const getFullName = (user: CreatedUser) => {
    return `${user.surname} ${user.name.charAt(0)}.${user.patronymic.charAt(0)}.`
}

const Main = () => {

    const currentPage = useAppSelector(state => state.pagination.currentPage)
    const itemsQuantity = useAppSelector(state => state.pagination.itemsQuantity)
    const [screenW, setScreenW] = useState(window.screen.width)

    window.onresize = () => setScreenW(window.screen.width)

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <td>Номер / Дата</td>
                            <td>Тип задания / Автор</td>
                            {screenW < 1080 ? <td>...</td> : <td>Аккаунт / Терминал</td>}
                            <td>Статус</td>
                        </tr>
                    </thead>
                    <tbody>
                        {database.slice(currentPage * itemsQuantity, (currentPage + 1) * itemsQuantity).map((item: TableCell) =>
                            <tr key={item.id}>
                                <td>
                                    <a href={`/date/${item.id}`}>
                                        <div className={classes.id}>
                                            <span>
                                                №{item.id}
                                            </span>
                                            <span>
                                                {getDate(item.created_date)}
                                            </span>
                                        </div>
                                    </a>
                                </td>
                                <td className={classes.name}>
                                    <a href={`/user/${item.created_user.oguid}`}>
                                        <div>
                                            <span>
                                                {item.order_type.name}
                                            </span>
                                            <span>
                                                {getFullName(item.created_user)}
                                            </span>
                                        </div>
                                    </a>
                                </td>
                                {screenW < 1080 ?
                                    <td>...</td> :
                                    <td className={classes.terminal}>
                                        <a href={`/terminal/${item.terminal.oguid}`}>
                                            <div>
                                                <span>
                                                    {item.account.name}
                                                </span>
                                                <span>
                                                    {item.terminal.name}
                                                </span>
                                            </div>
                                        </a>
                                    </td>}
                                <td className={classes.status}>
                                    <div>
                                        <a href={`/status/${item.status}`}>
                                            <span>
                                                <Status status={item.status}/>
                                            </span>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination />
        </div>
    );
};

export default Main;