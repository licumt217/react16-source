import { useState } from 'react';

import QuestionTitle from '../../components/QuestionTitle';
import QuestionItem from '../../components/QuestionItem';
import QuestionForm from '../../components/QuestionForm';

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
        <div>
            <QuestionTitle>这是一个带问号的题目？</QuestionTitle>
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
