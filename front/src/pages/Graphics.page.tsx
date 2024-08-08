import { Grid, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import Graphics from '@src/components/Graphics/Graphics';
import GraphicFormBase from '@src/components/Graphics/GraphicsForm/GraphicsForm';
import SelectGraphics from '@src/components/Graphics/GraphicsTabs/GraphicsTabs';
import { useGraphics } from '@src/services/hooks/graphics.hook';

export default function GraphicsPage() {

    const {
        selectedButtonId,
        onSelectedButtonId
    } = useGraphics()
    
    return (    
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SelectGraphics selectedButtonId={selectedButtonId} onHandleClick={onSelectedButtonId} />
            </Grid>
            <Grid item xs={12}>
                <Paper 
                    sx={{
                        padding: 2
                    }}
                >
                    <GraphicFormBase selectedGraphicId={selectedButtonId} />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper 
                    sx={{
                        padding: 2
                    }}
                >
                    <Stack 
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            minHeight: 400
                        }}
                    >
                        <Graphics selectedGraphicId={selectedButtonId} />         
                    </Stack>       
                </Paper>
            </Grid>
        </Grid>
    )
}
