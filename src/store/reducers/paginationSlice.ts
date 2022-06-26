import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import database from '../../database.json'

interface PaginationState {
    currentPage: number;
    itemsQuantity: number;
}

const initialState: PaginationState = {
    currentPage: 0,
    itemsQuantity: 5,
}


export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setItemsQuantity(state, action: PayloadAction<number>) {
            state.itemsQuantity = action.payload
        },
        setFirstPage(state) {
            state.currentPage = 0
        },
        setLastPage(state) {
            if (database.length / state.itemsQuantity - Math.floor(database.length / state.itemsQuantity))
                state.currentPage = Math.floor(database.length / state.itemsQuantity)
            else state.currentPage = database.length / state.itemsQuantity - 1
        }
    }
})

export default paginationSlice.reducer