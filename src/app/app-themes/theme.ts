import {createMuiTheme} from '@material-ui/core';
import {palette} from './palette';
import {MediaBreakpoints} from './MediaBreakpoints';

const defaultTheme = createMuiTheme({
    palette,
    breakpoints: {
        values: {
            xs: MediaBreakpoints.Tiny,
            sm: MediaBreakpoints.Small,
            md: MediaBreakpoints.Medium,
            lg: MediaBreakpoints.Large,
            xl: MediaBreakpoints.HighDef
        }
    },
    typography: {
        h2: {
            color: palette.primary[500]
        },
        h3: {
            lineHeight: 1.5,
            color: palette.secondary[500]
        }
    }
});

const {breakpoints} = defaultTheme;

const theme = {
    ...defaultTheme,
    overrides: {
        MuiTypography: {
            body1: {
                '@media print': {
                    fontSize: '11pt',
                    lineHeight: 1.15
                }
            },
            h1: {
                fontSize: '2rem',
                [breakpoints.up('sm')]: {
                    fontSize: '3rem'
                },
                [breakpoints.up('md')]: {
                    fontSize: '4rem'
                },
                [breakpoints.up('lg')]: {
                    fontSize: '5rem'
                },
                [breakpoints.up('xl')]: {
                    fontSize: '6rem'
                },
                '@media print': {
                    fontSize: '26pt'
                }
            },
            h2: {
                fontSize: '1.5rem',
                [breakpoints.up('sm')]: {
                    fontSize: '2rem'
                },
                [breakpoints.up('md')]: {
                    fontSize: '2.75rem'
                },
                [breakpoints.up('lg')]: {
                    fontSize: '3.5rem'
                },
                [breakpoints.up('xl')]: {
                    fontSize: '4.5rem'
                },
                '@media print': {
                    fontSize: '16pt',
                    height: '61px',
                    lineHeight: '61px'
                }
            },
            h3: {
                fontSize: '1.25rem',
                [breakpoints.up('sm')]: {
                    fontSize: '1.5rem'
                },
                [breakpoints.up('md')]: {
                    fontSize: '1.75rem'
                },
                [breakpoints.up('lg')]: {
                    fontSize: '2rem'
                },
                [breakpoints.up('xl')]: {
                    fontSize: '2.5rem'
                },
                '@media print': {
                    fontSize: '12pt'
                }
            }
        }
    }
};

export default theme;
