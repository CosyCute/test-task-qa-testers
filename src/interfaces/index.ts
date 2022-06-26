export interface TableCell {
    id: number;
    oguid: string;
    status: string;
    order_type: {
        name: string;
        oguid: string;
    },
    terminal: {
        name: string;
        oguid: string;
    },
    account: {
        name: string;
        oguid: string;
    },
    created_user: CreatedUser,
    created_date: number;
}

export interface CreatedUser {
    surname: string;
    name: string;
    patronymic: string;
    oguid: string;
}