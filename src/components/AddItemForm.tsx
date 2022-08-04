import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}


export const AddItemForm = (props: AddItemFormPropsType) => {
    const errorMessageStyles = {color: "hotpink"}


    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)


    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey === true) {
            onClickAddItem()
        }
    }


    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (


        <div>
            <TextField

                size ={"small"}
                variant="outlined"
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
                /*className={error ? "error" : ""}*/
                error ={error}
                label={"title"}
                helperText={error && "Title is required!"}
            />
           {/* <button onClick={onClickAddItem}>+</button>*/}
            <IconButton
                onClick={onClickAddItem}
                size = {"medium"}
                style = {{color:"#f06292"}}
                aria-label="delete">
                <AddBoxIcon />
            </IconButton>
            {/*{error && <div style={errorMessageStyles}>Title is required!</div>}*/}
        </div>
    )
}