import { Grid, Paper, Stack } from '@mui/material';
import DescriptionCard from '@src/components/Description/DescriptionCard';
import Graphics from '@src/components/StatisticsView/Graphics/Graphics';
import StatsListView from '@src/components/StatisticsView/StatsListView';
import Form from '@src/components/StatisticsView/form/Form';
import { useFormStore } from '@src/components/StatisticsView/form/Form.store';
import { useDescribeImage } from '@src/services/hooks/describeComponent.hook';
import { useEffect } from 'react';
export default function Home() {
    const { result } = useFormStore()
    const { ref, convertToImageAndDescribe, messages, isSendingImage } = useDescribeImage()

    useEffect(() => {
        if (result) {
            convertToImageAndDescribe()
        }
    }, [result])

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
            result && (
                <Grid 
                    item 
                    xs={12}
                    position="sticky"
                    bottom={0}
                    zIndex={1000}
                >
                    <Paper elevation={5}>
                        <DescriptionCard 
                            onClose={() => console.log('close')}
                            title={(isSendingImage || !messages || messages.length == 0) ? "Analyse des données en cours..." : "Analyse des données"} 
                            messages={messages} 
                            isPending={isSendingImage} 
                        />
                    </Paper>
                </Grid>
            )
        }
    </Grid>
    )
}
