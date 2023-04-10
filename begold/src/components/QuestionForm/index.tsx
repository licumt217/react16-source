import React from 'react'
import QuestionItem from '../QuestionItem'
// import css from './index.module.less'
export default function QuestionForm({ onSubmit, option, itemArray, onChange }
    : {
        onSubmit: (event: any) => void,
        option: string | null,
        itemArray: Array<string>,
        onChange: (event: any) => void
    }) {
    return (
        <form>
            <QuestionItem value='A' option={option} onChange={onChange}>
                A、{itemArray[0]}
            </QuestionItem>
            <QuestionItem value='B' option={option} onChange={onChange}>
                B、{itemArray[1]}
            </QuestionItem>
            <QuestionItem value='C' option={option} onChange={onChange}>
                C、{itemArray[2]}
            </QuestionItem>
            <QuestionItem value='D' option={option} onChange={onChange}>
                D、{itemArray[3]}
            </QuestionItem>
            <div className="container">
                <div className="column1">
                    <button>退出</button>
                </div>
                <div className="column2">
                    <button onClick={onSubmit}>提交</button>
                </div>
            </div>







        </form>
    )
}
