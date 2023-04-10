import { useState } from 'react';

import QuestionTitle from '../../components/QuestionTitle';
import QuestionForm from '../../components/QuestionForm';
import css from './index.module.scss';

function QuestionPane() {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
        console.log(`Selected option: ${selectedOption}`);
        // 在这里可以将选项提交到服务器或进行其他逻辑处理
    };

    const itemArray = [
        '选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A',
        '选项B',
        '选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A',
        '选项D'
    ]

    return (
        <div className={css.container}>
            <QuestionTitle index={1}>这是一个带问号的题目这是一个带问号的题目这是一个带问号的题目这是一个带问号的题目？</QuestionTitle>
            <QuestionForm
                option={selectedOption}
                itemArray={itemArray}
                onChange={handleOptionChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default QuestionPane
