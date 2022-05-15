import React from "react";

export default function Todo(props){
    return (
        <li className="todo stack-small">
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
        </li>
    );
}