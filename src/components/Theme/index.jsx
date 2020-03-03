import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
    color: {},
};

const Theme = props => (
    <ThemeProvider theme={theme} {...props} />
);

export default Theme;
