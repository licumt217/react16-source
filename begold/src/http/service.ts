const category_array = [
    "history",
    "english",
    "literature",
];

const db: any = {
    "history": {},
    "english": {},
    "literature": {}
}

for (let i = 0; i < 10; i++) {
    const history_category = "history";
    const english_category = "english";
    const literature_category = "literature";

    const paper_id = "paper_id" + i;
    db[history_category][paper_id] = [];
    db[english_category][paper_id] = [];
    db[literature_category][paper_id] = [];

    for (let j = 0; j < 10; j++) {
        [history_category, english_category, literature_category].forEach((parent_key) => {
            db[parent_key][paper_id].push({
                title: `${parent_key}-${paper_id}-问题${i + 1}`,
                index: i + 1,
                answerArray: [
                    `${parent_key}-${paper_id}选项A`,
                    `${parent_key}-${paper_id}选项B`,
                    `${parent_key}-${paper_id}选项C`,
                    `${parent_key}-${paper_id}选项D`,
                ]
            })
        })
    }
}




const service = {
    getPaperByCategory(category: string) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(db[category]["paper_id1"])
            }, 1000)
        })
    }
}

export default service;