import React, { useState } from 'react';

function Form(props){
    // 1. set the initial name value as 'Use hooks!'
    // 2. difine a function whose job is to modify name, called setName()
    // 3. useState() returns these two things, so we are using array destructuring to capture them both in separate variables.
    const [name, setName] = useState('');

    function handleChange(e){
        // eventが発火した時、setName()を呼び出し、name にイベントの value をセット。
        setName(e.target.value);
    }

    function handleSubmit(e) {
        // 従来のイベントを防ぎ、propsで受け取ったaddTask()を呼び出し、setName('')をして、inputを空にする。
        e.preventDefault();
        if (name.length > 0){
            props.addTask(name);
        }else{
            alert('Error: task is required')
            // console.error('task is required')
        }
        setName('');
    }

    return(
      <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    )
}

export default Form;