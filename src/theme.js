import { createTheme } from '@mui/material/styles';

// Create a responsive theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
            light: '#757de8',
            dark: '#002984',
            contrastText: '#fff',
        },
        secondary: {
            main: '#f50057',
            light: '#ff4081',
            dark: '#c51162',
            contrastText: '#fff',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
        success: {
            main: '#4caf50',
            light: '#81c784',
            dark: '#388e3c',
        },
        warning: {
            main: '#ff9800',
            light: '#ffb74d',
            dark: '#f57c00',
        },
        error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
        },
    },
    typography: {
        fontFamily: [
            'Poppins',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 500,
        },
        h6: {
            fontWeight: 500,
        },
        button: {
            fontWeight: 500,
            textTransform: 'none',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    },
                },
                contained: {
                    '&:hover': {
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 24,
                    '&:last-child': {
                        paddingBottom: 24,
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: 12,
                },
                elevation1: {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                },
                elevation2: {
                    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                },
                elevation3: {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '16px 24px',
                },
                head: {
                    fontWeight: 600,
                    color: '#212121',
                },
            },
        },
    },
});

export default theme; 