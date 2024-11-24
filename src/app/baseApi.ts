import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setAppError } from "./appSlice"
import { Simulate } from "react-dom/test-utils"
import error = Simulate.error
import { ResultCode } from "common/enums"

export const _baseApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
      headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`)
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Todolist", "Task"],
})

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
        headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`)
      },
    })(args, api, extraOptions)

    let error = "Some error occurred"
    // 1. Global query errors
    if (result.error) {
      switch (result.error.status) {
        case "FETCH_ERROR":
        case "PARSING_ERROR":
        case "CUSTOM_ERROR":
          error = result.error.error
          break

        case 403:
          error = "403 Forbidden Error. Check API-KEY"
          break

        case 400:
          error = (result.error.data as { message: string }).message
          break

        case 401:
          error = "401 Error. Check Token"
          break

        default:
          error = JSON.stringify(result.error)
          break
      }
      api.dispatch(setAppError({ error }))
    }

    // 2. Result code errors
    if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
      const messages = (result.data as { messages: string[] }).messages
      error = messages.length ? messages[0] : error
      api.dispatch(setAppError({ error }))
    }

    // if (result.error) {
    //   if (result.error.status === "FETCH_ERROR") {
    //     api.dispatch(setAppError({ error: result.error.error }))
    //   }
    //
    //   if (result.error.status === "PARSING_ERROR") {
    //     api.dispatch(setAppError({ error: result.error.error }))
    //   }
    //
    //   if (result.error.status === 403) {
    //     api.dispatch(setAppError({ error: "403 Forbidden Error. Check API-KEY" }))
    //   }
    //
    //   if (result.error.status === 401) {
    //     api.dispatch(setAppError({ error: "401 Error. Check Token" }))
    //     // or: api.dispatch(setAppError({ error: (result.error.data as { message: string }).message }))
    //   }
    //
    //   if (result.error.status === 400) {
    //     api.dispatch(setAppError({ error: (result.error.data as { message: string }).message }))
    //   }
    // }

    return result
  },
  endpoints: () => ({}),
  tagTypes: ["Todolist", "Task"],
})
