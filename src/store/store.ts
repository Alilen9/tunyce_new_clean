import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { matatuApi } from './matatuApi';
import { outletsApi } from './outletsApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [matatuApi.reducerPath]:  matatuApi.reducer,
    [outletsApi.reducerPath]:  outletsApi.reducer,
  
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
   .concat(matatuApi.middleware)
   .concat(outletsApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
