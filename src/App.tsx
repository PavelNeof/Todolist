import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
// CRUD => СRUD
// GUI & CLI
export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todoListId: string]: Array<TaskType>
}


function App() {

    // BLL:
// todolists:

    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todoListId_1, title: "What to learn", filter: "all"},
            {id: todoListId_2, title: "What to buy", filter: "all"},
        ]
    )


    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ],
    })


    const removeTask = (taskID: string, todoListId: string): void => {
        const todoListTask = tasks[todoListId]
        const updateTask = todoListTask.filter((task: TaskType) => task.id !== taskID)
        const copyTask = {...tasks}
        copyTask[todoListId] = updateTask
        /*updateTask = copyTask[todoListId]*/
        setTasks(copyTask)

        // длинный вариант
        /* setTasks( {...tasks, [todoListId]: tasks[todoListId].filter((task: TaskType) => task.id !== taskID)})*/

        /*setTasks(tasks.filter((task: TaskType) => task.id !== taskID))*/
    }
    const addTask = (title: string, todoListId: string) => {
        const todoListTasks = tasks[todoListId]
        const updateTask = [{id: v1(), title, isDone: false}, ...todoListTasks]
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updateTask
        setTasks(copyTasks)


        setTasks({...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]})
    }
    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter} : tl))

        // setFilter(filter)
    }

    const changeTodolistTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))

        // setFilter(filter)
    }


    const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {  // 3, false

        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, isDone} : t)})

        // setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} :t))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {  // 3, false

        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, title: title} : t)})

        // setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} :t))
    }

    const removeTodolists = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodolist: TodoListType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }


    // UI:

    const todoListComponents = todoLists.map(tl => {

        let tasksForRender;
        switch (tl.filter) {
            case "completed":
                tasksForRender = tasks[tl.id].filter(t => t.isDone === true)
                break
            case "active":
                tasksForRender = tasks[tl.id].filter(t => t.isDone === false)
                break
            default:
                tasksForRender = tasks[tl.id]
        }

        return (
            <Grid item key={tl.id} >
            <Paper style={{padding: "20px"}}
                   elevation={5}>
                <TodoList
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForRender}

                    addTask={addTask}
                    removeTask={removeTask}
                    removeTodoList={removeTodolists}
                    changeFilter={changeFilter}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                />
            </Paper>
            </Grid>
        )
    })

    //
    return (
        <div className="App">
            <AppBar position="static">

                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{paddingTop:"6px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={2}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
