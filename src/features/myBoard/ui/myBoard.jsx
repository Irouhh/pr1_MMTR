import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../../shared/ui';
import { GreenButton, BrownButton, Button } from '../../../shared/ui/Button';
import { ICONS } from '../../../shared/ui/Icons';
import { Input } from '../../../shared/ui/Input';

import styles from './styles.module.scss';

export const MyBoard = () => {
    const [showCreateList, setShowCreateList] = useState(false);

    const params = useParams();
    const boardId = params.id;

    const handleCreateList = () => {
        setShowCreateList(true);
    };

    const handleCancel = () => {
        setShowCreateList(false);
    };

    return (
        <>
            <Header />
            <main>
                <div className={styles.wrap}>
                    <div className={styles.boardItem}>
                        <h1> Доска №{boardId}</h1>
                        
                        <div className={styles.newLists}>
                            <GreenButton onClick={handleCreateList}>
                                Добавить список <i className={ICONS.DOWN_ARROW}></i>
                            </GreenButton>
                        </div>

                        <div className={styles.lists}>
                            {showCreateList && (
                                <form className={styles.createList}>
                                    <div className={styles.inputText}>
                                        <h2>Название списка <i className={ICONS.UP_ARROW}></i></h2>
                                        <Input type="text" placeholder="Введите название..."/>
                                    </div>
                                    
                                    <div className={styles.formButtons}>
                                        <BrownButton onClick={handleCancel}> Отмена </BrownButton>
                                        <Button className={styles.btnSave}> Сохранить </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        <div className={styles.existLists}>
                            <div className={styles.listContainer}>
                                <div className={styles.listHead}>
                                    <h2>Список 1</h2>
                                    <div className={styles.listOperation}>
                                        <i className={ICONS.EDIT}></i>
                                        <i className={ICONS.TRASH}></i>
                                    </div>
                                </div>

                                <div className={styles.listItems}>
                                    <div className={styles.listItem}>
                                        <span>Элемент списка 1</span>
                                        <i className={ICONS.CHECKBOX}></i>
                                    </div>

                                    <div className={styles.listItemDemo}>
                                        <span>Элемент списка 2</span>
                                        <i className={ICONS.CHECKBOX_CHECKED}></i>
                                    </div>
                                    
                                    <div className={styles.createTaskForm}>
                                        <Input type="text" placeholder="Добавить задачу" className={styles.taskInput}/>
                                        <Button className={styles.addTaskBtn}><i className={ICONS.PLUS}></i></Button>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.listContainer}>
                                <div className={styles.listHead}>
                                    <h2>Список 2</h2>
                                    <div className={styles.listOperation}>
                                        <i className={ICONS.EDIT}></i>
                                        <i className={ICONS.TRASH}></i>
                                    </div>
                                </div>
                                
                                <div className={styles.listItems}>
                                    <div className={styles.listItem}>
                                        <span>Элемент списка 1</span>
                                        <i className={ICONS.CHECKBOX}></i>
                                    </div>
                                    
                                    <div className={styles.createTaskForm}>
                                        <Input type="text" placeholder="Добавить задачу" className={styles.taskInput}/>
                                        <Button className={styles.addTaskBtn}> <i className={ICONS.PLUS}></i> </Button>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.listContainer}>
                                <div className={styles.listHead}>
                                    <h2>Список 3</h2>
                                    <div className={styles.listOperation}>
                                        <i className={ICONS.EDIT}></i>
                                        <i className={ICONS.TRASH}></i>
                                    </div>
                                </div>
                                
                                <div className={styles.createTaskForm}>
                                    <Input type="text" placeholder="Добавить задачу" className={styles.taskInput}/>
                                    <Button className={styles.addTaskBtn}> <i className={ICONS.PLUS}></i> </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}