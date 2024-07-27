export interface ISideBarConsts {
  openedWidth: number
  closedWidth: number
  mobileClosedWidth: number
  backgroundColor: {
    listItemBg: {
      light: string
      dark: string
    }
  }
  labelMaxLength: number
  transitionDuration: number
}

export interface IBreakPoints {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

export interface ThemePalette {
    primary: {
        main: string;
    };
    secondary: {
        main: string;
    };
    divider: string;
    background: {
        default: string;
        paper: string;
    };
    text: {
        primary: string;
        secondary: string;
    };
}

export interface ThemeObject {
  dark: ThemePalette
  light: ThemePalette
}
