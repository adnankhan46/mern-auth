import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";

// For Redux Persist - Step A
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
 
const rootReducer = combineReducers({user: userReducer});

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
// For Redux Persist - Step B
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

// Step 1  ^^^

export const persistor = persistStore(store);

