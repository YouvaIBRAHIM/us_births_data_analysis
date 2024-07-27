import { Grid } from '@mui/material';
import { Stack } from '@mui/system';
export default function Home() {

    return (    
    <Grid container spacing={4}>
        <Grid item xs={12} md={4} lg={3}>
            <Stack spacing={4}>
                hello
            </Stack>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
            <Stack spacing={4}> 
                hello
            </Stack>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
            hello
        </Grid>
    </Grid>
    )
}
