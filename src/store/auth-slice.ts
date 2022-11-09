import {createSlice} from '@reduxjs/toolkit'

interface AuthState {
    isLogged: boolean;
    isLogout: boolean;
}

const initialState: AuthState = {
    isLogged: false,
    isLogout: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.isLogged = true;
            state.isLogout = false;
        },
        logout(state) {
            state.isLogged = false;
            state.isLogout = true;
        }
    }
})

export const authActions = authSlice.actions;