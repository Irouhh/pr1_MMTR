import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

export const SortDndBoard = ({ board, dndBoards, children, className }) => {
    let ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'board',
        item: { id: board.id, order: board.order },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [, drop] = useDrop({
        accept: 'board',
        drop: (item) => {
            dndBoards(item.id, board.order);
        },
    })

    drop(ref);
    drag(ref);

    return (
        <div ref={ref} className={className} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {children}
        </div>
    );
};

export const SortDndList = ({ list, boardId, dndLists, children, className }) => {
    let ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'list',
        item: { id: list.id, order: list.order },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [, drop] = useDrop({
        accept: 'list',
        drop: (item) => {
            dndLists(item.id, boardId, list.order);
        },
    })

    drop(ref);
    drag(ref);

    return (
        <div ref={ref} className={className} style={{ opacity: isDragging ? 0.5 : 1, cursor: isDragging ? 'grabbing' : 'grab' }}>
            {children}
        </div>
    );
};

export const SortDndTask = ({ task, dndTasks, children, className }) => {
    let ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'task',
        item: { id: task.id, order: task.order, listId: task.listId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [, drop] = useDrop({
        accept: 'task',
        drop: (item) => {
            dndTasks( item.id, task.order, task.listId, item.listId);
        },
    })

    drop(ref);
    drag(ref);

    return (
        <div ref={ref} className={className} style={{ opacity: isDragging ? 0.5 : 1, cursor: isDragging ? 'grabbing' : 'grab' }}>
            {children}
        </div>
    );
};