import React from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';

const { TreeNode } = Tree;

function renderObject(obj) {
    return Object.keys(obj).map(key => (
        obj[key]
        && typeof obj[key] === 'object'
        && typeof obj[key].length === 'undefined'
        && obj[key] !== null
            ? (
                <TreeNode key={key} title={key}>
                    {renderObject(obj[key])}
                </TreeNode>
            )
            : (
                <TreeNode
                    key={key}
                    // eslint-disable-next-line
                    title={`${key}: ${obj[key] && typeof obj[key].length !== 'undefined' && typeof obj[key] !== 'string' ? `Array[${obj[key].length}]` : obj[key]}`}
                />
            )
    ));
}

const RecordAsObject = ({ data }) => (
    <Tree>
        {renderObject(data)}
    </Tree>
);

RecordAsObject.propTypes = {
    data: PropTypes.shape().isRequired,
};

export default RecordAsObject;
