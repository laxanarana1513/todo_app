import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';


const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        let arr = localStorage.getItem("taskList")

        if (arr) {
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])


    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const resetTasks = (index) => {
        let tempList = taskList
        tempList.splice(index)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }


    return (
        <div className="main">
            <div className="sub-main">

                <div className="header text-center">
                    <h3 className="heading">TODO LIST</h3>
                    <button className="btn btn-primary mt-2" onClick={() => setModal(true)} >Create Task</button>
                    <button className="btn btn-danger mt-2" onClick={resetTasks} style={{ marginLeft: '8px' }}>Reset</button>
                </div>
                <div className="task-container">

                    {taskList && taskList.map((obj, index) => <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />)}
                    <CreateTask toggle={toggle} modal={modal} save={saveTask} />
                </div>
            </div>
        </div>
    );
};

export default TodoList;