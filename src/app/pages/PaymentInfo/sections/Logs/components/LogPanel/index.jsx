/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Input, Typography } from 'antd';

const { TreeNode } = Tree;
const { Search } = Input;
const { Text } = Typography;

const getFormattedTitle = (text, searchValue) => {
    const index = text.indexOf(searchValue);
    const beforeStr = text.substr(0, index);
    const afterStr = text.substr(index + searchValue.length);

    return index > -1
        ? (
            <span>
                {beforeStr}
                <Text mark>{searchValue}</Text>
                {afterStr}
            </span>
        )
        : <span>{text}</span>;
};

const generateTree = (obj, searchValue, depth = 0) => {
    return Object.keys(obj).map(key => {
        if (!obj[key]) {
            return (
                <TreeNode
                    key={key + depth}
                    title={getFormattedTitle(`${key}: ${JSON.stringify(obj[key])}`, searchValue)}
                    selectable={false}
                />
            );
        }
        if (typeof obj[key] === 'object' && !('length' in obj[key] && obj[key].length === 0)) {
            return (
                <TreeNode key={key + depth} title={key} selectable={false}>
                    {generateTree(obj[key], searchValue, depth + 1)}
                </TreeNode>
            );
        }

        return (
            <TreeNode
                key={key + depth}
                title={getFormattedTitle(`${key}: ${JSON.stringify(obj[key])}`, searchValue)}
                selectable={false}
            />
        );
    });
};

const getParentKey = (targetKey, tree, depth = 0) => {
    return Object.keys(tree)
        .map(key => (
            typeof tree[key] === 'object' && tree[key] !== null
                ? (
                    Object.keys(tree[key]).some(nestedKey => (nestedKey + (depth + 1)) === targetKey)
                        ? `${key}${depth}`
                        : getParentKey(targetKey, tree[key], depth + 1)
                )
                : undefined
        ))
        .find(key => key);
};

export default class LogPanel extends React.Component {
    static propTypes = {
        data: PropTypes.shape(),
    };

    static defaultProps = {
        data: {},
    };

    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
    };

    dataList = [];

    componentDidMount() {
        this.generateDataList(this.props.data);
    }

    onSearch = (e) => {
        const { data } = this.props;
        const value = e.target.value;

        if (value.length === 0) {
            this.setState({ searchValue: value });
            return;
        }

        const expandedKeys = this.dataList
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, data);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    };

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    generateDataList = (data, depth = 0) => {
        Object.keys(data).forEach(key => {
            const isObject = typeof data[key] === 'object' && data[key] !== null;

            this.dataList.push({
                key: `${key}${depth}`,
                title: isObject ? key : `${key}: ${JSON.stringify(data[key])}`,
            });

            if (isObject) {
                this.generateDataList(data[key], depth + 1);
            }
        });
    };

    render() {
        const { data } = this.props;
        const { expandedKeys, autoExpandParent, searchValue } = this.state;

        return (
            <div>
                <Search style={{ marginBottom: 8 }} placeholder="Поиск" onChange={this.onSearch} />
                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    showLine
                >
                    {generateTree(data, searchValue)}
                </Tree>
            </div>
        );
    }
}
