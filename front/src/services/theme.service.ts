import { PaletteMode } from "@mui/material"

import {
  TOOLBAR_HEIGTH,
  breakpoints,
  colors,
  sideBarConst,
} from "@services/constants.service"

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    xxl: true
  }
}

export const getTheme = (mode: PaletteMode) => ({
    typography: {
        fontFamily: '"Inter", "Poppins"',
        fontSize: 14,
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        h2: {
            fontSize: '2.25rem',
            lineHeight: '2.5rem',
            fontWeight: 700,
        },
        h3: {
            fontSize: '1.5rem',
            lineHeight: '2rem',
            fontWeight: 700,
        },
        h4: {
            fontSize: '1.5rem',
            lineHeight: '2rem',
            fontWeight: 600,
        },
        h5: {
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            fontWeight: 500,
        },
        subtitle2: {
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            fontWeight: 400,
            whiteSpace: 'pre-line',
            margin: 0,
        },
        subtitle1: {
            fontSize: '1.875rem',
            lineHeight: '2.25rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            fontWeight: 400,
        },
    },
    breakpoints: {
        values: breakpoints,
    },
    palette: {
        mode,
        ...colors[mode],
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: '1rem 2.5rem',
                    [`@media (min-width:${breakpoints.sm}px)`]: {
                        overflow: 'overlay',
                    },
                    [`@media (min-width:${breakpoints.md}px)`]: {
                        padding: '1rem 6rem',
                    },
                    [`@media (min-width:${breakpoints.xxl}px)`]: {
                        padding: '1rem 12rem',
                    },
                    '&.mainPageContainer': {
                        height: '100%',
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    transition: `width ${sideBarConst.transitionDuration}ms ease`,
                    [`@media (min-width:${breakpoints.md}px)`]: {
                        position: 'static',
                    },
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    '& .MuiListItemButton-root': {
                        minHeight: 48,
                        alignItems: 'center',
                        margin: '8px',
                        padding: '0 12px',
                        borderRadius: '6px',
                        backgroundColor:
                            mode === 'light'
                                ? sideBarConst.backgroundColor.listItemBg.light
                                : sideBarConst.backgroundColor.listItemBg.dark,
                    },
                    '& .MuiListItemIcon-root': {
                        minWidth: 'inherit',
                    },
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    '& .MuiSwitch-switchBase': {
                        margin: 1,
                        padding: 0,
                        top: 6,
                        transform: 'translateX(6px)',
                        '&.Mui-checked': {
                            color: '#fff',
                            transform: 'translateX(24px)',
                            '& + .MuiSwitch-track': {
                                opacity: 1,
                                backgroundColor:
                                    mode === 'dark' ? '#8796A5' : '#aab4be',
                            },
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        backgroundColor:
                            mode === 'dark' ? '#003892' : '#001e3c',
                        width: 24,
                        height: 24,
                        '&::before': {
                            content: "''",
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            left: 0,
                            top: 0,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        },
                    },
                    '& .MuiSwitch-track': {
                        opacity: 1,
                        backgroundColor:
                            mode === 'dark' ? '#8796A5' : '#aab4be',
                        borderRadius: 20 / 2,
                    },
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: TOOLBAR_HEIGTH + 'rem',
                    [`@media (min-width:${breakpoints.xs}px)`]: {
                        minHeight: TOOLBAR_HEIGTH + 'rem',
                    }
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: colors[mode].text.secondary
                    }
                },
            },
        },
        MuiTabs:{
            styleOverrides: {
                root: {
                    '& .MuiTabs-indicator': {
                        backgroundColor: colors[mode].secondary.main
                    }
                },
            },
        }
    },
})
