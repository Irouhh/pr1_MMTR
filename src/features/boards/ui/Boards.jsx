import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

import { Header } from '../../../shared/ui';
import { GreenButton, BrownButton, Button } from '../../../shared/ui/Button';
import { ICONS} from '../../../shared/const';
import { Input } from '../../../shared/ui/Input';
import { createBoard, deleteBoard, editBoard, getBoards } from '../../../entities/boards/api/boardsApi';

import styles from './styles.module.scss';

export const Boards = () => {
    const dispatch = useDispatch();
    const { boards } = useSelector(state => state.board);

    const [showCreateBoard, setShowCreateBoard] = useState(false);
    const [formError, setFormError] = useState('');
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ boardName: '' });

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (editId) {
            handleEdit();
        } else {
            handleCreate();
        }
    }

    const updateForm = (e) => {
        const { name, value } = e.target;
        
        setForm(oldForm => ({
            ...oldForm,
            [name]: value,
        }));
    }

    const handleCreate = () => {
        dispatch(createBoard({ name: form.boardName })) 
        .unwrap()
        .then(() => {
            dispatch(getBoards());
            setForm({ boardName: '' });
            setShowCreateBoard(false);
        })
        .catch(setFormError);
    }

    const handleEditIcon = (board, e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditId(board.id);
        setForm({ boardName: board.name });
        setShowCreateBoard(true);
    }

    const handleEdit = () => {
    dispatch(editBoard({ id: editId, name: form.boardName }))
        .unwrap()
        .then(() => { 
            dispatch(getBoards());
            setForm({ boardName: '' });
            setShowCreateBoard(false);
        })
        .catch(setFormError);
    }

    const handleDeleteIcon = (boardId, e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteBoard(boardId))
        .unwrap()
        .then(() => { 
            dispatch(getBoards());
        })
        .catch(setFormError);
    }

    const handleCreateBoardForm = () => {
        setShowCreateBoard(true);
        setEditId(null);
        setForm({ boardName: '' });
    };

    const handleCancelForm = () => {
        setShowCreateBoard(false);
        setEditId(null);
        setForm({ boardName: '' });
    };

    useEffect(() => {
        dispatch(getBoards())
    }, [])

    return (
        <>
            <Header />
            <main>
                <div className={styles.wrap}>
                    <div className={styles.leftColumn}>
                        <GreenButton onClick={handleCreateBoardForm}>
                            Новая доска <i className={ICONS.DOWN_ARROW}></i>
                        </GreenButton>
                        
                        {showCreateBoard  && (
                            <form className={styles.createBoard} onSubmit={onSubmit}>
                                <h2>Название доски <i className={ICONS.UP_ARROW}></i></h2>

                                {formError && <div className={styles.error}>{formError}</div>}

                                <Input type="text" value={form.boardName} name='boardName'
                                onChange={updateForm} placeholder="Введите название..." required/>
                                
                                <div className={styles.formButtons}>
                                    <BrownButton onClick={handleCancelForm}> Отмена </BrownButton>
                                    <Button type='submit' className={styles.btnSave}> Сохранить </Button>
                                </div>
                            </form>
                        )}   
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.existBoards}>
                            <h3>Мои доски</h3>

                            <div id="boardsList">
                                {boards.map(board => (
                                    <Link key={board.id} to={'/board/' + board.id + '?name=' + board.name} 
                                    className={styles.btnMove}>
                                        
                                        {board.name}
                                        
                                        <div className={styles.boardBtn}>
                                            <i className={ICONS.EDIT} onClick={(e) => handleEditIcon(board, e)}></i>
                                            <i className={ICONS.TRASH} onClick={(e) => handleDeleteIcon(board.id, e)}></i>
                                            </div>
                                    </Link>
                                ))} 
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}