import { Paper } from "@mui/material"

const CustomPaper = ({children}: {children: JSX.Element}) => {

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                width: '100%'
            }}
        >
            {children}
        </Paper>
    )
}

export default CustomPaper;