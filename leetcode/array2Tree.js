const array = [
    {
        menuId: 1,
        name: "系统管理1",
        parentMenu: null,
    },
    {
        menuId: 2,
        name: "系统管理2",
        parentMenu: null,
    },
    {
        menuId: 3,
        name: "系统管理1_0",
        parentMenu: 1,
    },
    {
        menuId: 4,
        name: "系统管理1_1",
        parentMenu: 1,
    },
    {
        menuId: 5,
        name: "系统管理2_0",
        parentMenu: 2,
    },
    {
        menuId: 6,
        name: "系统管理2_2_0",
        parentMenu: 5,
    },
    {
        menuId: 7,
        name: "系统管理3",
        parentMenu: null,
    },
    {
        menuId: 8,
        name: "系统管理1-1-2",
        parentMenu: 4,
    },
];
function transArray2Tree(arr) {
    const topLevelArray = arr.filter((item) => {
        return !item.parentMenu;
    });
    const childArray = arr.filter((item) => {
        return item.parentMenu;
    })

    findParents(topLevelArray, childArray);
    return topLevelArray;
}
function findParents(pArray, cArray) {
    for (let parent of pArray) {
        parent.children = []
        for (let child of cArray) {
            if (child.parentMenu === parent.menuId) {
                parent.children.push(child);
                findParents([child], cArray);
            }
        }
    }
}

function toTree(arr) {
    return arr.filter((p) => {
        const c = arr.filter((item) => {
            return item.parentMenu === p.menuId;
        })
        c.length && (p.children = c);
        return p.parentMenu === null;
    })
}