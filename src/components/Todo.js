import React, { useEffect, useRef, useState } from "react";
import usePrevious from "./usePrevious";

// function usePrevious(value) {
//     const ref = useRef();
//     useEffect(() => {
//       ref.current = value;
//     });
//     return ref.current;
// }
  
export default function Todo(props){
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    // const [変数, 変数の値を変更する関数] = 変数のデフォルト値
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

    const wasEditing = usePrevious(isEditing);

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        // 従来のイベントを防ぎ、propsから受け取ったeditTask関数を用いてTaskを編集したら、input field を初期化し、editingTemplateをviewTemplateに切り替える
        e.preventDefault();
        if (newName.length > 0) {
            props.editTask(props.id, newName);
            setNewName('');
            setEditing(false);
        }else{
            alert('Task name is required')
        }
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
              New name for {props.name}
            </label>
            <input 
                id={props.id} 
                className="todo-text" 
                type="text" 
                value={newName}
                onChange={handleChange}
                ref={editFieldRef}
            />
          </div>
          <div className="btn-group">
            <button 
                type="button" 
                className="btn todo-cancel" 
                onClick={() => setEditing(false)}
            >
              Cancel
              <span className="visually-hidden">renaming {props.name}</span>
            </button>
            <button type="submit" className="btn btn__primary todo-edit">
              Save
              <span className="visually-hidden">new name for {props.name}</span>
            </button>
          </div>
        </form>
    );
    
    const viewTemplate = (
        <div className="stack-small">
          <div className="c-cb">
              {/* 
                defaultCheckedはReactにこのチェックボックスを最初にチェックするように伝える。 
                また、JSX属性でブール値（trueおよびfalse）を使用するには、それらを中括弧で囲む必要がある。 defaultChecked = "true"と書くと、defaultCheckedの値は "true"の文字列リテラルになってしまう。これではJavaScriptであり、HTMLではなくなってしまう。
                上にあるaria-pressed属性の値は「true」だが、aria-pressedは、真のブール属性ではないから。
              */}
              <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)}
              />
              {/* htmlFor属性はHTMLで使用されるforと同じ役割。JSXの属性としてforを使用することはできないので用いる。 */}
              <label className="todo-label" htmlFor={props.id}>
                {props.name}
              </label>
            </div>
            <div className="btn-group">
              <button 
                type="button" 
                className="btn" 
                onClick={() => setEditing(true)}
                ref={editButtonRef}
            >
                Edit <span className="visually-hidden">{props.name}</span>
              </button>
              <button
                type="button"
                className="btn btn__danger"
                onClick={() => props.deleteTask(props.id)}
              >
                Delete <span className="visually-hidden">{props.name}</span>
              </button>
            </div>
        </div>
    );
      
    useEffect(() => {
        if (!wasEditing && isEditing) {
          editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
          editButtonRef.current.focus();
        }
        //第二引数の配列の中の値が変更された場合にのみ、useEffectが実行される。(無くても良い。)
    }, [wasEditing, isEditing]);
      
    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
    //条件に続いて疑問符 (?)、そして条件が真値であった場合に実行する式、その次にコロン (:) が続き、条件が偽値であった場合に実行する式が来る。

}