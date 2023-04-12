import React, { useState, useEffect, useContext, Suspense } from 'react';
import LoadingContext from '../../context/LoadingContext';
import QuestionForm from '../../components/QuestionForm';
import FiveStar from '../../components/icons/FiveStar';
import css from './index.module.scss';
import usePopup from '../../hooks/usePopup';
import Dialog2 from '../../components/weui/Dialog2';

const QuestionTitle = React.lazy(() => import('../../components/QuestionTitle'));

interface IQuestion {
    title: string;
    index: number;
    answerArray: Array<string>
}

const questionList: IQuestion[] = [

];

for (let i = 0; i < 100; i++) {
    questionList.push({
        title: `问题${i + 1}`,
        index: i + 1,
        answerArray: [
            '选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A',
            '选项B',
            '选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A',
            '选项D'
        ]
    })
}

const api = {
    getLatestQuestion() {
        return new Promise((resolve, reject) => {
            const key = Math.floor(Math.random() * 100);
            setTimeout(() => {
                resolve(questionList[key])
            }, 1000)
        })
    }
}

function QuestionPane() {
    const [question, setQuestion] = useState<IQuestion>();
    const [selectedOption, setSelectedOption] = useState(null);
    const loading = useContext(LoadingContext)
    const popup = usePopup();

    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
        if (false) {//回答正确

            getNext();
        } else {
            popup.show({
                title: 'title',
                content: "分类设计费了时间烦死了发是"
            });
        }
    };

    function getNext() {
        loading.change(true);
        api.getLatestQuestion().then((data: any) => {
            setQuestion(data);
        }).finally(() => {
            loading.change(false);
        })
    }

    useEffect(() => {
        getNext();
    }, []);

    return (
        <>
            {
                question && (
                    // <div className={css.container}>
                    //     <FiveStar />
                    //     <Suspense fallback={"loading..."}>
                    //         <QuestionTitle index={question.index}>{question.title}</QuestionTitle>
                    //     </Suspense>
                    //     <QuestionForm
                    //         option={selectedOption}
                    //         itemArray={question.answerArray}
                    //         onChange={handleOptionChange}
                    //         onSubmit={handleSubmit}
                    //     />


                    // </div>
                    <Dialog2 />
                )
            }
        </>

    );
}

export default QuestionPane
