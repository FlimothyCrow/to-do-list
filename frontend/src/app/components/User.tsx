import styles from "./User.module.scss";

type TaskProps = {
    userid: number;
    username: string;
    useremail: string;
};

const User: React.FC<TaskProps> = ({ username, useremail }) => {
    return (
        <div className={styles.userContainer}>
            <div>Username: {username}</div>
            <div>Email: {useremail}</div>
        </div>
    );
};

export default User;
