import React, {ChangeEvent, FC, useState} from 'react';
import styles from "./Auth.module.sass"
import {useNavigate} from "react-router-dom";
import {login} from "../../store/action/userAction";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {errorUserSelector, isLoadingUserSelector} from "../../store/slices/UserSlice";


const LoginForm: FC = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch();
    const error = useAppSelector(errorUserSelector)
    const isLoading = useAppSelector(isLoadingUserSelector)


    const navigate = useNavigate()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (username && password) dispatch(login(username, password))
    }

    const onHandlerUser = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.form}>
                <form
                    method="post"
                    action=""
                    className={styles.btnBox}
                    onSubmit={handleSubmit}
                >

                    <h1 className={styles.title}>User Login</h1>
                    {error && <div style={{color: 'red', margin: '10px'}}>
                        {error}
                    </div>}
                    <div className={styles.inputBox}>
                        <label className={styles.icon} htmlFor="username">
                            <img src="/img/icon-user.svg" alt="user"/>
                        </label>
                        <input
                            value={username}
                            onChange={onHandlerUser}
                            id="username"
                            name="username"
                            placeholder="Username"
                            type="text"
                            required
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="password" className={styles.icon}>
                            <img src="/img/icon-password.svg" alt="password"/>
                        </label>
                        <input
                            value={password}
                            id="password"
                            onChange={onHandlerUser}
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className={styles.btnBox}>
                        <button

                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className={styles.subtitle}>
                    <a
                        className={styles.link}
                        href={'/register'}
                    >
                        Registration
                    </a>
                </div>


            </div>

        </div>

    );
};

export default LoginForm;