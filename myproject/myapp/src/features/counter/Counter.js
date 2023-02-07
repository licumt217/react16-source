import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    decrement,
    increment,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
    const count = useSelector((state) => {
        return state.counter.value;
    });
    const dispatch = useDispatch();
    // const [incrementAmount, setIncrementAmount] = useState('2');

    // const incrementValue = Number(incrementAmount) || 0;

    return (
        <div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <span className={styles.value}>{count}</span>
                <button
                    className={styles.button}
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
            </div>

            {/* <div className={styles.row}>
                <input
                    className={styles.textbox}
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementByAmount(incrementValue))}
                >
                    Add Amount
                </button>
                <button
                    className={styles.asyncButton}
                    onClick={() => dispatch(incrementAsync(incrementValue))}
                >
                    Add Async
                </button>
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementIfOdd(incrementValue))}
                >
                    Add If Odd
                </button>
            </div> */}
        </div>
    );
}
