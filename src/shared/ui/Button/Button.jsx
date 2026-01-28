import styles from './styles.module.scss';

export const GreenButton = ({children, onClick, type = 'button'}) => {
    return (
        <button type={type} className={styles.greenButton} onClick={onClick}>
            {children}
        </button>
    );
};
  
export const BrownButton = ({children, onClick, type = 'button'}) => {
    return (
        <button type={type} className={styles.brownButton} onClick={onClick}>
            {children}
        </button>
    );
};

export const Button = ({children, type = 'button', className = ''}) => {
    return (
        <button type={type} className={styles.button + ' ' + className}>
            {children}
        </button>
    );
};