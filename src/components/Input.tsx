import React, { ChangeEvent, KeyboardEvent } from "react";

type InpuntPropsType = {
    setTitle: (titleValue: string)=>void
    title: string
    callBack: ()=>void
}

export const Input = (props: InpuntPropsType ) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value);
      };

      const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
          props.callBack();
        }
      };


  return (
  
      <input
        value={props.title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
  
  );
};
