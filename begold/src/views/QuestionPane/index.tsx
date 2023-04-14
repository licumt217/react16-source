import React, { useState, useEffect, useContext, Suspense, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingContext from '../../context/LoadingContext';
import QuestionForm from '../../components/QuestionForm';
import FiveStar from '../../components/icons/FiveStar';
import css from './index.module.scss';
import usePopup from '../../hooks/usePopup';
import useDialog from '../../hooks/useDialog';
import useHalfDialog from '../../hooks/useHalfDialog';
import Ba from '../../components/weui/Ba';
import useLoading from '../../hooks/useLoading';

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

function QuestionPane(props: any) {

    console.log("props", props)

    const navigate = useNavigate();
    const [question, setQuestion] = useState<IQuestion>();
    const [selectedOption, setSelectedOption] = useState(null);
    const loading = useLoading();
    const dialog = useDialog();

    const handleOptionChange = useCallback((event: any) => {
        setSelectedOption(event.target.value);
    }, []);

    console.log("base")

    const handleSubmit = useCallback(() => {
        console.log("submit")
        if (false) {//回答正确

            getNext();
        } else {

            dialog.show({
                title: '回答错误',
                content: `答错了，此题的正确答案应该是B。`,
                cancelText: `结束答题`,
                okText: `续命一次`,
                onCancel() {
                    navigate('/');
                },
                onOk() {

                }

            })
        }
    }, [dialog]);

    function getNext() {
        loading.show();
        api.getLatestQuestion().then((data: any) => {
            setQuestion(data);
        }).finally(() => {
            loading.hide();
        })
    }

    useEffect(() => {
        getNext();
    }, [loading]);

    return (
        <>
            {
                question && (
                    <div className={css.container} >
                        <FiveStar />
                        <Suspense fallback={"loading..."}>
                            <QuestionTitle index={question.index}>{question.title}</QuestionTitle>
                        </Suspense>
                        <QuestionForm
                            option={selectedOption}
                            itemArray={question.answerArray}
                            onChange={handleOptionChange}
                            onSubmit={handleSubmit}
                        />
                    </div>
                )
            }
        </>

    );
}

export default React.memo(QuestionPane)
