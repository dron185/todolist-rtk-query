import { configureStore } from "@reduxjs/toolkit"
import { authReducer, authSlice } from "../features/auth/model/authSlice"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice"
import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolistsSlice"
import { appReducer, appSlice } from "./appSlice"
import { _todolistsApi, todolistsApi } from "../features/todolists/api/todolistsApi"
import { setupListeners } from "@reduxjs/toolkit/query"
//
// export const store = configureStore({
//   reducer: {
//     [tasksSlice.name]: tasksReducer,
//     [todolistsSlice.name]: todolistsReducer,
//     [appSlice.name]: appReducer,
//     [authSlice.name]: authReducer,
//   },
// })
//
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [todolistsApi.reducerPath]: todolistsApi.reducer,
  },
  // 1
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todolistsApi.middleware),
})

// 2
setupListeners(store.dispatch)