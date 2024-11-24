import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { DomainTodolist } from "../../../../model/todolistsSlice"
import { Task } from "./Task/Task"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { useAppDispatch } from "common/hooks"
import { setAppError } from "../../../../../../app/appSlice"
import { useEffect } from "react"

type Props = {
  todolist: DomainTodolist
}

type ErrorData = {
  status: number
  data: {
    message: string
  }
}

export const Tasks = ({ todolist }: Props) => {
  const { data, isLoading, error } = useGetTasksQuery(todolist.id)

  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   if (error) {
  //     const errorData = error as ErrorData
  //     dispatch(setAppError({ error: errorData.data.message }))
  //   }
  // }, [error])

  let tasksForTodolist = data?.items

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
