import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { UserRole } from 'types'

interface AuthState {
    role: UserRole | null;
}

const initialState: AuthState = {
    role: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserRole>) {
            state.role = action.payload;
        },
        logout(state) {
            state.role = null;
        }
    }
})

export const authActions = authSlice.actions;