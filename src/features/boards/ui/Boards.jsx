import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../shared/ui';
import { GreenButton, BrownButton, Button } from '../../../shared/ui/Button';
import { ICONS } from '../../../shared/ui/Icons';
import { Input } from '../../../shared/ui/Input';

import styles from './styles.module.scss';

export const Boards = () => {
    const [showCreateBoard, setShowCreateBoard] = useState(false);

    const handleCreateBoard = () => {
        setShowCreateBoard(true);
    };

    const handleCancel = () => {
        setShowCreateBoard(false);
    };

    return (
        <>
            <Header />
            <main>
                <div className={styles.wrap}>
                    <div className={styles.leftColumn}>
                        <GreenButton onClick={handleCreateBoard}>
                            Новая доска <i className={ICONS.DOWN_ARROW}></i>
                        </GreenButton>
                        
                        {showCreateBoard && (
                            <form className={styles.createBoard}>
                                <h2>Название доски <i className={ICONS.UP_ARROW}></i></h2>
                                <Input type="text" placeholder="Введите название..."/>
                                
                                <div className={styles.formButtons}>
                                    <BrownButton onClick={handleCancel}> Отмена </BrownButton>
                                    <Button className={styles.btnSave}> Сохранить </Button>
                                </div>
                            </form>
                        )}
                        
                    </div>
                    <div className={styles.rightColumn}>
                        <div className={styles.existBoards}>
                            <h3>Мои доски</h3>

                            <div id="boardsList">
                                <Link to="/board/1" className={styles.btnMove}>
                                    Доска #1
                                    <div className={styles.boardBtn}>
                                        <i className={ICONS.EDIT}></i>
                                        <i className={ICONS.TRASH}></i>
                                    </div>
                                </Link>
                                
                                <Button className={styles.btnMoveRepeat}>
                                    Доска #2
                                    <div className={styles.boardBtn}>
                                        <i className={ICONS.EDIT}></i>
                                        <i className={ICONS.TRASH}></i>
                                    </div>
                                </Button>
                                
                                <Button className={styles.btnMoveRepeat}>
                                    Доска #3
                                    <div className={styles.boardBtn}>
                                        <i className={ICONS.EDIT}></i>
                                        <i className={ICONS.TRASH}></i>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}