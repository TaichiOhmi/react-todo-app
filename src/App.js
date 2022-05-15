import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import usePrevious from "./components/usePrevious";

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

const FILTER_MAP = {
  ALL: () => true,
  Active: task => !task.completed,
  Completed: task=> task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('ALL');
  
  const prevTaskLength = usePrevious(tasks.length);
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use objeect spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
        //...（Spread構文）を使うと、配列リテラル中に既存の配列やオブジェクトを展開できる。この例の場合、task オブジェクトを展開し、プロパティ名が被った場合は後に指定したオブジェクトの値で上書きされる性質を利用してcompletedを上書きしている。
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    // tasks配列をmap関数で一つずつ回す。
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    // array.filter() は与えられた条件に合致する全要素から新たな配列を生成する。(条件に合わない要素は取り除かれる。)
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed}
    key={task.id}
    //reactでは一意な key でコンポーネントを管理する。
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key = {name} 
      name = {name}
      isPressed = {name === filter}
      setFilter = {setFilter}
    />
  ));

  function addTask(name){
    //配列に追加するnewTaskオブジェクトを作成し、新しいタスクの配列を作成してから、タスクデータのStateを更新する。spread構文を使用して既存の配列をコピーし、最後にオブジェクトを追加します。次に、この配列をsetTasks（）に渡して、Stateを更新。 
    const newTask = {id:'todo-' + nanoid(), name:name, completed:false};
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form  addTask={addTask}/>
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading" tabIndex='-1' ref={listHeadingRef}>
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
