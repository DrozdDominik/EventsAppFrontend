import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { UserRole } from 'types'

interface RoleState {
    role: UserRole | null;
}

const initialState: RoleState  = {
    role: null
}

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole(state, action: PayloadAction<UserRole>) {
            state.role = action.payload;
        },
        removeRole(state) {
            state.role = null;
        }
    }
})

export const roleActions = roleSlice.actions;