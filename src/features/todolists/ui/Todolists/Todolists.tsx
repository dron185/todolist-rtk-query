import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Unstable_Grid2"
import { Todolist } from "./Todolist/Todolist"
import { useGetTodolistsQuery } from "../../api/todolistsApi"

export const Todolists = () => {
  // const todolists = useAppSelector(selectTodolists)
  //
  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC())
  // }, [])

  //const [skip, setSkip] = useState(true)
  //const { data: todolists } = useGetTodolistsQuery(undefined, { skip })

  // const [trigger, { data: todolists }] = useLazyGetTodolistsQuery()

  // const fetchTodolistHandler = () => {
  //   //setSkip(false)
  //   trigger()
  // }

  const { data: todolists } = useGetTodolistsQuery()

  return (
    <>
      {/*<div>*/}
      {/*  <button onClick={refetch}>Загрузить тудулисты</button>*/}
      {/*</div>*/}
      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
