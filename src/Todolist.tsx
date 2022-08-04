import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";
import {Button, Checkbox, FormControlLabel, IconButton, List} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import {Favorite, FavoriteBorder} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskID: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodolistTitle: (title: string, todoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {


    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
            const onChangeTitleHandler = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
            return (

                <li key={task.id} className={task.isDone ? "isDone" : ""}>
                    {/*<input
                        onChange={changeTaskStatus}
                        type="checkbox" checked={task.isDone}
                    />*/}
                    <FormControlLabel
                        control={<Checkbox
                            value="checkedA"
                            onChange={changeTaskStatus} checked={task.isDone}
                            inputProps={{'aria-label': 'Checkbox A'}}
                            icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"
                        />}
                        label=""
                    />

                    {/*<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />*/}

                    {/*<button onClick={removeTask}>x</button>*/}

                    <EditableSpan title={task.title} changeTitle={onChangeTitleHandler}/>
                    <IconButton
                        aria-label="delete"
                        onClick={removeTask}>
                        <HighlightOffIcon/>
                    </IconButton>
                </li>
            )
        })
        : <span>Your taskList is empty</span>


    const getChangeFilterHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter, props.todoListId)
    }


    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todoListId)
    }

    const btnColor = {color: "#78909c"};

    return (


        <div>

            <h3><EditableSpan title={props.title}
                              changeTitle={changeTodolistTitle}/>
                {/* <button onClick={removeTodoList}>x</button>*/}
                <IconButton aria-label="delete"
                            style={btnColor}
                            onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>


            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksListItems}
            </List>
            <div>
                <Button
                    size={'small'}
                    variant={'contained'}

                    color={props.filter === "all" ? "secondary" : "primary"}
                    /*className={props.filter === "all" ? "active" : ""}*/
                    onClick={getChangeFilterHandler("all")}>All
                </Button>
                <Button
                    style={{marginLeft: "2px"}}

                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    /*className={props.filter === "active" ? "active" : ""}*/
                    onClick={getChangeFilterHandler("active")}>Active
                </Button>
                <Button
                    style={{marginLeft: "2px"}}
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    /*className={props.filter === "completed" ? "active" : ""}*/
                    onClick={getChangeFilterHandler("completed")}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;