import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum NotificationStatus {
    'success',
    'error',
    'info',
}

export interface NotificationData {
    status: NotificationStatus;
    title: string;
    message: string;
}

interface UiState {
   notification: NotificationData | null;
}

const initialState: UiState = {
    notification: null,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showNotification(state, action: PayloadAction<NotificationData>) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            }
        },
        clearNotification(state) {
            state.notification = null
        }
    }
})

export const uiAction = uiSlice.actions;