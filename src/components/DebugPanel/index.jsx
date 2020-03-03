import React, {
    useState,
    useCallback,
    useEffect,
    useMemo,
} from 'react';
import ReactDOM from 'react-dom';
import { Drawer, Affix, Button } from 'antd';
import { YodaHints, Storage } from './components';

const DebugPanel = () => {
    const rootNode = useMemo(() => document.createElement('div'));
    const [visible, setVisibility] = useState(false);
    const onToggle = useCallback(() => setVisibility(visibility => !visibility), [setVisibility]);

    useEffect(() => {
        rootNode.style.position = 'fixed';
        rootNode.style.bottom = '0px';
        rootNode.style.right = '0px';
        rootNode.style.zIndex = 1000;
        document.body.appendChild(rootNode);
    });

    return ReactDOM.createPortal((
        (
            <React.Fragment>
                {!visible && (
                    <Affix style={{ position: 'absolute', bottom: 20, right: 20 }}>
                        <Button icon="crown" onClick={onToggle} />
                    </Affix>
                )}
                <Drawer
                    title="God Mode"
                    placement="right"
                    closable={false}
                    onClose={onToggle}
                    visible={visible}
                >
                    <YodaHints />
                    <Storage />
                </Drawer>
            </React.Fragment>
        )
    ), rootNode);
};

export default DebugPanel;
