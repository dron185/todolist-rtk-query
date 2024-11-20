import Container from "@mui/material/Container"
import Grid from "@mui/material/Unstable_Grid2"
import { Path } from "common/router"
import { AddItemForm } from "common/components"
import { useAppSelector } from "common/hooks"
import { Navigate } from "react-router-dom"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAddTodolistMutation } from "../features/todolists/api/todolistsApi"
import { selectIsLoggedIn } from "./appSlice"

export const Main = () => {
  const [addTodolist, res] = useAddTodolistMutation()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const addTodolistCb = (title: string) => {
    addTodolist(title)
  }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolistCb} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
