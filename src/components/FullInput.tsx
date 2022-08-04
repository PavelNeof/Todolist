import React, { ChangeEvent, useState, KeyboardEvent } from "react";


type FullInputPropsType={
    callBack: (valueTitle: string)=>void  
}

export const FullInput = (props: FullInputPropsType) => {

    let [title, setTitle] = useState("");

    const addTask = () => {
        props.callBack(title);
        setTitle("");
      };

      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
      };

      const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
          addTask();
        }
      };

  return (
    <div>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <button onClick={addTask}>+</button>
    </div>
  );
};
