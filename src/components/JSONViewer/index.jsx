import React from 'react';
import JSONTree from 'react-json-tree';
import { Wrapper } from './styled';

const theme = {
    scheme: 'warm',
    author: 'Vitalya (http://github.com/nicinabox)',
    base00: '#FFFFFF',
    base01: '#FF0000',
    base02: '#FF0000',
    base03: '#D8DEE9',
    base04: '#FF0000',
    base05: '#FF0000',
    base06: '#FF0000',
    base07: '#FF0000',
    base08: '#5E81AC',
    base09: '#D08770',
    base0A: '#FF0000',
    base0B: '#B48EAD',
    base0C: '#FF0000',
    base0D: '#5E81AC',
    base0E: '#FF0000',
    base0F: '#FF0000',
};

const JSONViewer = props => (
    <Wrapper>
        <JSONTree {...props} theme={theme} invertTheme={false} hideRoot />
    </Wrapper>
);

export default JSONViewer;
