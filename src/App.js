import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use objeect spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    // array.filter() は与えられた条件に合致する全要素から新たな配列を生成する。(条件に合わない要素は取り除かれる。)
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks.map(task => (
    <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed}
    key={task.id}
    //reactでは一意な key でコンポーネントを管理する。
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    />
  ));

  function addTask(name){
    //配列に追加するnewTaskオブジェクトを作成し、新しいタスクの配列を作成してから、タスクデータのStateを更新する。spread構文を使用して既存の配列をコピーし、最後にオブジェクトを追加します。次に、この配列をsetTasks（）に渡して、Stateを更新。 
    const newTask = {id:'todo-' + nanoid(), name:name, completed:false};
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';

  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form  addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton />
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"//role属性は,<ul>にあるスタイルを追加した場合、リストとして扱われなくなってしまうことを防ぐためにリストとしての役割を付与している。
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"//これは下のリストの目的を説明する見出しとして昨日している。
      >
      {taskList}
      </ul>
    </div>
  );
}


export default App;
