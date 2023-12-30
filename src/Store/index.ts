import { API } from "@/Services/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { homeReducer, themeReducers, userReducer, scanReducer } from "./reducers";

const reducers = combineReducers({
  api: API.reducer,
  theme: themeReducers,
  home: homeReducer,
  user: userReducer,
  scan: scanReducer
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme"],
};

AsyncStorage.getAllKeys().then((keyArray) => {
  AsyncStorage.multiGet(keyArray).then((keyValArray) => {
    const myStorage: any = {};
    for (const keyVal of keyValArray) {
      myStorage[keyVal[0]] = keyVal[1];
    }

    console.log('CURRENT STORAGE: ', myStorage);
  });
});

const persistedReducer = persistReducer(persistConfig, reducers);

/* eslint-disable no-underscore-dangle */

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(API.middleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require("redux-flipper").default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
  devTools: true
});

/* eslint-enable */

const persistor = persistStore(store);

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export { store, persistor };
