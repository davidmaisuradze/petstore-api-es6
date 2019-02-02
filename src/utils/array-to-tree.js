export const arrayToTree = (list) => {
    try {
        list.sort((a, b) => {
            if (a.parentId === null) {
                return 1;
            } else if (b.parentId === null) {
                return -1;
            } else if (a.parentId === b.parentId) {
                return 0;
            }
        });

        let treeList = [];
        let lookup = {};

        list.forEach(obj => {
            lookup[obj._id] = {...obj.toObject(), children: []};
        });

        for (let item in lookup) {
            const obj = lookup[item];

            if (obj.parentId != null && lookup[obj.parentId]) {
                lookup[obj.parentId].children.push(obj);
            } else if (obj.parentId === null) {
                treeList.push(obj);
            }
        }

        return treeList;
    } catch (err) {
        console.log(err, 'err');
    }
};

export const sortTree = (list, sortByProp = 'order') => {
    list.sort((a, b) => a[sortByProp] - b[sortByProp]);
    list.forEach(c => dfs(c, sortByProp));
    return list;
};

const dfs = (node, sortPropName) => {
    if (node.children) {
        node.children.sort((a, b) => a[sortPropName] - b[sortPropName]);
        node.children.forEach(ch => dfs(ch));
    }
};
