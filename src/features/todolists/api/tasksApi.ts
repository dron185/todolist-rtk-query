import { BaseResponse } from "common/types"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "../../../app/baseApi"

export const PAGE_SIZE = 5

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => {
        const params = { ...args, count: PAGE_SIZE }

        return {
          url: `todo-lists/${todolistId}/tasks`,
          params,
        }
      },
      providesTags: (res, err, { todolistId }) =>
        res
          ? [
            ...res.items.map(({ id }) => ({ type: "Task", id }) as const),
            { type: "Task", id: todolistId }
          ]
          : ["Task"]
    }),

    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        method: "POST",
        url: `todo-lists/${todolistId}/tasks`,
        body: { title }
      }),
      invalidatesTags: (res, err, { todolistId }) => [{ type: "Task", id: todolistId }]
      //invalidatesTags: ["Task"],
    }),

    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          method: "DELETE",
          url: `todo-lists/${todolistId}/tasks/${taskId}`
        }
      },
      invalidatesTags: (res, err, { taskId }) => [{ type: "Task", id: taskId }]
    }),

    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: "PUT",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        body: model
      }),
      invalidatesTags: (res, err, { taskId }) => [{ type: "Task", id: taskId }]
    })
  })
})

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi
