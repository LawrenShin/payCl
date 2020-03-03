import React, {
    useCallback,
    useMemo,
    useState,
    Fragment,
} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Tooltip,
    Popconfirm,
    Dropdown,
    Menu,
} from 'antd';

const BaseButton = (props) => {
    const {
        title,
        expanded,
        confirmText,
        onConfirm: parentOnConfirm,
        onCancel: parentOnCancel,
        okText,
        cancelText,
        shouldConfirm,
        options,
        disabled,
        ...other
    } = props;
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const optionsExists = useMemo(() => options.length > 0, [options]);
    const Wrapper = useMemo(() => (shouldConfirm ? Popconfirm : Fragment), [shouldConfirm]);
    const OptionsWrapper = useMemo(() => (optionsExists ? Dropdown : Fragment), [optionsExists]);

    const onVisibleChange = useCallback(visibility => setConfirmVisible(visibility), []);
    const onSelect = useCallback(({ key }) => {
        setConfirmVisible(true);
        setSelectedOption(key);
    }, []);
    const onClick = useCallback(() => {
        if (!optionsExists) {
            setConfirmVisible(true);
        }
    }, [optionsExists]);
    const onConfirm = useCallback(() => {
        parentOnConfirm(selectedOption);
        setConfirmVisible(false);
    }, [selectedOption, parentOnConfirm]);
    const onCancel = useCallback(() => {
        parentOnCancel();
        setConfirmVisible(false);
        setSelectedOption(null);
    }, [parentOnCancel]);

    const wrapperProps = (
        shouldConfirm
            ? {
                visible: confirmVisible,
                onVisibleChange,
                title: confirmText,
                okText,
                cancelText,
                onConfirm,
                onCancel,
                trigger: [],
            }
            : {}
    );
    const optionsWrapperProps = (
        optionsExists
            ? {
                overlay: (
                    <Menu onClick={onSelect}>
                        {options.map(({ value, label }) => (
                            <Menu.Item key={value}>{label}</Menu.Item>
                        ))}
                    </Menu>
                ),
                disabled,
            }
            : {}
    );

    return (
        <OptionsWrapper {...optionsWrapperProps}>
            <Wrapper {...wrapperProps}>
                {expanded
                    ? <Button disabled={disabled} {...other} onClick={onClick}>{title}</Button>
                    : (
                        <Tooltip title={title}>
                            <Button disabled={disabled} {...other} onClick={onClick} />
                        </Tooltip>
                    )}
            </Wrapper>
        </OptionsWrapper>
    );
};

BaseButton.propTypes = {
    title: PropTypes.string.isRequired,
    expanded: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    icon: PropTypes.string,
    confirmText: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    shouldConfirm: PropTypes.bool,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }),
    ),
};

BaseButton.defaultProps = {
    expanded: false,
    disabled: false,
    loading: false,
    icon: 'question',
    confirmText: 'Вы верены?',
    onConfirm: () => {},
    onCancel: () => {},
    okText: 'Да',
    cancelText: 'Отмена',
    shouldConfirm: true,
    options: [],
};

export default BaseButton;
