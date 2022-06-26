import React from 'react';

import classes from './Status.module.scss'

const getComponent = (status: string) => {
    switch (status) {
        case "new":
            return <div className={classes.red}>Новое</div>;
        case "completed":
            return <div className={classes.green}>Выполнено</div>;
        case "assigned_to":
            return <div className={classes.yellow}>Назначено</div>;
        case "started":
            return <div className={classes.blue}>Выполняется</div>;
        case "declined":
            return <div className={classes.black}>Отменено</div>;
    }
    return <></>
}

const Status = ({ status }: { status: string }) => {
    return (
        <div className={classes.container}>
            {getComponent(status)}
        </div>
    );
};

export default Status;