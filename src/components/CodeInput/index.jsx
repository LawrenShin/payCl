import React, {
    useMemo,
    useState,
    useCallback,
    useRef,
    useImperativeHandle,
    forwardRef,
    createRef,
} from 'react';
import { uid } from '@client/helpers';
import {
    Wrapper,
    Group,
    Symbol,
} from './styled';

function codeIsFilled(code) {
    return code.every(group => group.every(symbol => symbol.length > 0));
}

const CodeInput = (props, ref) => {
    const { pattern, disabled, onComplete } = props;
    const initialValue = useMemo(() => (
        pattern.split(' ').map(part => part.split('').fill(''))
    ), []);
    const groups = useMemo(() => (
        initialValue.map(group => group.map(() => uid()))
    ), []);

    const [code, setCode] = useState(initialValue.map(group => [...group]));
    const symbols = useRef(
        initialValue.map(group => group.map(() => createRef())),
    );

    const getNextSymbol = useCallback((groupNumber, symbolNumber) => {
        const groupsLength = groups.length;
        const symbolsLength = groups[groupNumber].length;
        const nextSymbolNumber = symbolNumber + 1 < symbolsLength ? symbolNumber + 1 : 0;
        let nextGroupNumber = groupNumber;

        if (nextSymbolNumber === 0) {
            nextGroupNumber = groupNumber + 1 < groupsLength ? groupNumber + 1 : -1;
        }

        if (nextGroupNumber === -1) return null;

        return symbols.current[nextGroupNumber][nextSymbolNumber].current;
    }, [groups, symbols]);
    const onChange = useCallback((groupNumber, symbolNumber) => (event) => {
        const symbol = event.target.value;
        const nextSymbol = getNextSymbol(groupNumber, symbolNumber);
        const nextCode = code.map(group => [...group]);

        nextCode[groupNumber][symbolNumber] = symbol;

        setCode(nextCode);

        if (codeIsFilled(nextCode)) {
            onComplete(nextCode.map(group => group.join('')).join(''));
            symbols.current[groupNumber][symbolNumber].current.blur();
        }

        if (symbol.length > 0 && nextSymbol) {
            nextSymbol.focus();
        }
    }, [code, onComplete]);

    useImperativeHandle(ref, () => ({
        focus() {
            if (symbols.current[0][0].current) {
                symbols.current[0][0].current.focus();
            }
        },
        reset() {
            setCode(initialValue.map(group => [...group]));
            symbols.current[0][0].current.focus();
        },
    }), [symbols]);

    return (
        <Wrapper>
            {groups.map((group, groupNumber) => (
                <Group key={group.map(id => id).join('')}>
                    {group.map((id, symbolNumber) => (
                        <Symbol
                            key={id}
                            ref={symbols.current[groupNumber][symbolNumber]}
                            size="large"
                            maxLength={1}
                            type="text"
                            disabled={disabled}
                            value={code[groupNumber][symbolNumber]}
                            onChange={onChange(groupNumber, symbolNumber)}
                        />
                    ))}
                </Group>
            ))}
        </Wrapper>
    );
};

export default forwardRef(CodeInput);
