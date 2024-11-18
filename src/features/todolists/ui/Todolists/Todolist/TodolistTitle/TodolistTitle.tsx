import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks"
import { DomainTodolist, removeTodolistTC } from "../../../../model/todolistsSlice"
import s from "./TodolistTitle.module.css"
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolistsApi"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()

  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    // dispatch(removeTodolistTC(id))
    removeTodolist(id)
  }
  const updateTodolistHandler = (title: string) => {
    // dispatch(updateTodolistTitleTC({ id, title }))
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
