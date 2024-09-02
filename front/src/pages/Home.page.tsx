import { Grid, Paper, Stack } from '@mui/material';
import DescriptionCard from '@src/components/Description/DescriptionCard';
import Graphics from '@src/components/StatisticsView/Graphics/Graphics';
import StatsListView from '@src/components/StatisticsView/StatsListView';
import Form from '@src/components/StatisticsView/form/Form';
import useHomeHook from '@src/services/hooks/home.hook';

export default function Home() {
    const {
        ref,
        messages, 
        isSendingImage,
        showDescriptionCard,
        hasFinishedStream,
        stopCurrentStreamAndClose,
        stopCurrentStream,
        convertToImageAndDescribe
    } = useHomeHook()
    
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
            <Stack ref={ref} gap={4}>
                <Graphics />
                <StatsListView />
            </Stack>
        </Grid>
        {
            showDescriptionCard && (
                <Grid 
                    item 
                    xs={12}
                    position="sticky"
                    bottom={0}
                    zIndex={1000}
                >
                    <Paper elevation={5}>
                        <DescriptionCard 
                            onClose={stopCurrentStreamAndClose}
                            onStop={stopCurrentStream}
                            onRetry={convertToImageAndDescribe}
                            title={(isSendingImage || !messages || messages.length == 0) ? "Analyse des données en cours..." : "Analyse des données"} 
                            messages={messages} 
                            isPending={isSendingImage} 
                            hasFinishedStream={hasFinishedStream && (messages && messages.length > 0)}
                        />
                    </Paper>
                </Grid>
            )
        }
    </Grid>
    )
}
