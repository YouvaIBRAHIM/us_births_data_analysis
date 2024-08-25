import { Grid, Paper } from '@mui/material';
import Graphics from '@src/components/StatisticsView/Graphics/Graphics';
import StatsListView from '@src/components/StatisticsView/StatsListView';
import Form from '@src/components/StatisticsView/form/Form';
export default function Home() {

    return (    
    <Grid container spacing={4}>
        <Grid item xs={12}>
            <Paper sx={{
                p: 2
            }}>
                <Form />
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Graphics />
        </Grid>
        
        <Grid item xs={12}>
            <StatsListView />
        </Grid>
    </Grid>
    )
}
