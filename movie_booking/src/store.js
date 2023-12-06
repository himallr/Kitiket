import { createSlice, configureStore } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("userId");
            state.isLoggedIn = false;
        }
    },
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("Token");
            localStorage.removeItem("adminID");
            state.isLoggedIn = false;
        }
    },
});

export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;

export const store = configureStore({
    reducer: {
        admin: adminSlice.reducer,
        user: userSlice.reducer
    },
});
