import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from '../../../shared/ui';
import { GreenButton, BrownButton, Button } from '../../../shared/ui/Button';
import { ICONS } from '../../../shared/const';
import { Input } from '../../../shared/ui/Input';
import { createList, deleteList, editList, getLists } from '../../../entities/lists/api/listsApi';
import { createTask, deleteTask, editTask, getTasks } from '../../../entities/tasks/api/tasksApi';

import styles from './styles.module.scss';

export const MyBoard = () => {
    const dispatch = useDispatch();

    // lists
    const { lists } = useSelector(state => state.list);

    // tasks
    const { tasks } = useSelector(state => state.task);

    // tasks
    const [taskInputs, setTaskInputs] = useState({});
    const [editTaskId, setEditTaskId] = useState(null);
    const [formTask, setFormTask] = useState('');
    const [formTaskError, setFormTaskError] = useState('');
    
    // lists
    const [showCreateList, setShowCreateList] = useState(false);
    const [formError, setFormError] = useState('');
    const [editListId, setEditListId] = useState(null);
    const [formList, setFormList] = useState({ listName: '' });
    
    const params = useParams();
    const boardId = params.id;
    const location = useLocation();

    const boardNameAfterUrl = decodeURI(location.search.split('=').pop());

    const onSubmitList = (e) => {
        e.preventDefault();
        if (editListId) {
            handleEditList();
        } else {
            handleCreateList();
        }
    }
    
    const updateFormList = (e) => {
        const { name, value } = e.target;
        setFormList(oldForm => ({
            ...oldForm,
            [name]: value,
        }));
    }

    const handleCreateList = () => {
        dispatch(createList({ name: formList.listName, boardId })) 
        .unwrap()
        .then(() => {
            dispatch(getLists({ boardId }));
            setFormList({ listName: '' });
            setShowCreateList(false);
        })
        .catch(setFormError);
    }
    
    const handleEditIconList = (list, e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditListId(list.id);
        setFormList({ listName: list.name });
        setShowCreateList(true);
    }
    
    const handleEditList = () => {
        dispatch(editList({ listId: editListId, boardId, name: formList.listName }))
        .unwrap()
        .then(() => { 
            dispatch(getLists({ boardId }));
            setFormList({ listName: '' });
            setShowCreateList(false);
        })
        .catch(setFormError);
    }
    
    const handleDeleteIconList = (listId, e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteList({ boardId, listId }))
        .unwrap()
        .then(() => { 
            dispatch(getLists({ boardId }));
        })
        .catch(setFormError);
    }

    const handleCreateListForm = () => {
        setShowCreateList(true);
        setEditListId(null);
        setFormList({ listName: '' });
    };

    const handleCancelListForm = () => {
        setShowCreateList(false);
        setEditListId(null);
        setFormList({ listName: '' });
    };

    useEffect(() => {
        dispatch(getLists({ boardId }))
    }, [dispatch, boardId]);

    // tasks
    const onTaskSubmit = (e, listId) => {
        e.preventDefault();
        handleCreateTask(listId);
    };

    const updateTaskForm = (listId, value) => {
        setTaskInputs(oldTasks => ({
            ...oldTasks,
            [listId]: value
        }));
    };

    const handleCreateTask = (listId) => {
        const taskName = taskInputs[listId];
        
        dispatch(createTask({ name: taskName, listId, boardId }))
        .unwrap()
        .then(() => {
            dispatch(getTasks({ boardId, listId }));
            setTaskInputs(oldTasks => ({
                ...oldTasks,
                [listId]: ''
            }));
        })
        .catch(setFormTaskError);
    };

    const handleEditIconTask = (task, e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditTaskId(task.id);
        setFormTask(task.name);
    };

    const handleEditTask = () => {
        const task = tasks.find(task => task.id === editTaskId);

        dispatch(editTask({
            boardId, listId: task.listId, taskId: editTaskId, name: formTask, isActive: task.isActive
        }))
        .unwrap()
        .then(() => {
            dispatch(getTasks({ boardId, listId: task.listId }));
            setEditTaskId(null);
        })
        .catch(setFormTaskError);
    };

    const onTaskEditSubmit = (e) => {
        e.preventDefault();
        handleEditTask();
    };

    const handleDeleteIconTask = (listId, taskId, e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteTask({ boardId, listId, taskId }))
        .unwrap()
        .then(() => {
            dispatch(getTasks({ boardId, listId }));
        })
        .catch(setFormTaskError);
    };

    const changeTask = (task) => {
        dispatch(editTask({
            boardId, listId: task.listId, taskId: task.id, name: task.name, isActive: !task.isActive
        }))
        .unwrap()
        .then(() => {
            dispatch(getTasks({ boardId, listId: task.listId }));
        })
        .catch(setFormTaskError);
    };

    const getActiveTaskIcon = (task) => {
        if (task.isActive) {
            return ( 
            <>
            <i className={ICONS.CHECKBOX} onClick={() => changeTask(task)}></i>
            <span className={styles.taskName}>{task.name}</span>
            </>
            );
        } else {
            return (
            <>
            <i className={ICONS.CHECKBOX_CHECKED} onClick={() => changeTask(task)}></i>
            <span className={styles.taskName} style={{textDecoration: 'line-through'}}>{task.name}</span>
            </>
            )
        }
    };

    useEffect(() => {
        if (lists) {
            for (const list of lists) {
                dispatch(getTasks({ boardId, listId: list.id }));
            }
        }
    }, [dispatch, lists, boardId]);

    return (
        <>
            <Header />
            <main>
                <div className={styles.wrap}>
                    <div className={styles.boardItem}>
                        <h1> Название доски: {boardNameAfterUrl}</h1>

                        {formError && <div className={styles.error}>{formError}</div>}
                        {formTaskError && <div className={styles.error}>{formTaskError}</div>}
                        
                        <div className={styles.newLists}>
                            <GreenButton onClick={handleCreateListForm}>
                                Добавить список <i className={ICONS.DOWN_ARROW}></i>
                            </GreenButton>
                        </div>

                        <div className={styles.lists}>
                            {showCreateList && (
                                <form className={styles.createList} onSubmit={onSubmitList}>
                                        <h2>Название списка <i className={ICONS.UP_ARROW}></i></h2>

                                        <Input type="text" name='listName' value={formList.listName} 
                                        onChange={updateFormList} placeholder="Введите название..." required/>
                                   
                                    
                                    <div className={styles.formButtons}>
                                        <BrownButton type="button" onClick={handleCancelListForm}> Отмена </BrownButton>
                                        <Button type='submit' className={styles.btnSave}> Сохранить </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        <div className={styles.existLists}>
                            {lists.map(list => (
                                <div key={list.id} className={styles.listContainer}>
                                    <div className={styles.listHead}>
                                        <h2>{list.name}</h2>

                                        <div className={styles.listOperation}>
                                            <i className={ICONS.EDIT} onClick={(e) => handleEditIconList(list, e)}></i>
                                            <i className={ICONS.TRASH} onClick={(e) => handleDeleteIconList(list.id, e)}></i>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.tasksList}>
                                        {tasks
                                            .filter(task => task.listId === list.id)
                                            .map(task => {
                                                if (editTaskId === task.id) {
                                                    return (
                                                        <div key={task.id}>
                                                            <form className={styles.taskEditForm} onSubmit={onTaskEditSubmit}>
                                                                <Input noWrapper value={formTask} onChange={(e) => setFormTask(e.target.value)}
                                                                className={styles.taskEditInput} required/>
                                                                
                                                                <Button type="submit" className={styles.taskEditButton}>
                                                                    <i className={ICONS.CHECKBOX_CHECKED}></i>
                                                                </Button>
                                                                
                                                                <i className={ICONS.CLOSE} onClick={() => setEditTaskId(null)}></i>
                                                            </form>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div key={task.id} className={styles.taskItem}>
                                                        {getActiveTaskIcon(task)}

                                                        <div className={styles.taskActions}>
                                                            <i className={ICONS.EDIT} onClick={(e) => handleEditIconTask(task, e)}></i>
                                                            <i className={ICONS.TRASH} onClick={(e) => handleDeleteIconTask(list.id, task.id, e)}></i>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    
                                    <div className={styles.taskAddForm}>
                                        <form className={styles.createTaskForm} onSubmit={(e) => onTaskSubmit(e, list.id)}>
                                            
                                            <Input type="text" name='taskName' value={taskInputs[list.id]} 
                                            onChange={(e) => updateTaskForm(list.id, e.target.value)} 
                                            placeholder="Введите задачу..." className={styles.taskInput} required />
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}