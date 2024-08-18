import { Button, CircularProgress, Typography } from "@mui/material";
import GraphicFormBase from "@components/Graphics/GraphicsForm/GraphicFormBase/GraphicFormBase"
import { Stack } from "@mui/system";
import CustomTextField from "@src/components/Inputs/TextField";
import ConditionBuilder from "@src/components/Conditions/Conditions";
import { ICondition } from "@src/components/Conditions/Conditions.types";
import { useGraphics } from "@src/services/hooks/graphics.hook";


export interface IGraphics{
    selectedGraphicId: string | null
}

const fieldOptions = [
    {
        label: "Années",
        value: "years"
      },
      {
        label: "Prénoms",
        value: "names"
      },
      {
        label: "Genre",
        value: "gender"
      },
      {
        label: "Naissances",
        value: "births"
      }
]

const GraphicsForm = ({ selectedGraphicId }: IGraphics) => {
    const { 
        form, 
        onFormUpdate, 
        onSubmit,
        onSetConditions,
        isPendingGraphicData,
    } = useGraphics()

    if (!selectedGraphicId) {
        return(
            <Typography variant="body2" gutterBottom>Veuillez sélectioner un graphique</Typography>
        );
    }

    const renderForm = (selectedGraphicId: string) => {
        switch (selectedGraphicId) {
            case 'bar':
                return <GraphicFormBase />;
            case 'h-bar':
                return <GraphicFormBase />;
            case 'line':
                return <GraphicFormBase />;
            case 'scatter':
                return <GraphicFormBase />;
            case 'pie':
                return <GraphicFormBase />;
            default:
                return <Typography variant="body2" gutterBottom>Le formulaire n'est pas disponible</Typography>;
        }
    }

    return (
        <Stack 
            gap={2}
            flexDirection="column"
        >
            <CustomTextField 
                label="Titre"
                sx={{
                    maxWidth: 350
                }}
                onChange={(e) => onFormUpdate("title", e.target.value)}
            />
            {renderForm(selectedGraphicId)}
            <ConditionBuilder fieldOptions={fieldOptions} conditions={form?.conditions as ICondition[] ?? []} onSetConditions={onSetConditions} />
            <Stack
                alignItems="flex-end"
                marginTop={4}
            >
                <Button
                    variant="contained" 
                    onClick={onSubmit}
                    disabled={isPendingGraphicData}
                    sx={{
                        minWidth: 150
                    }}
                >
                    {
                        !isPendingGraphicData ?
                        "Générer"
                        :
                        <CircularProgress size={24} color="inherit" />
                    }
                    
                </Button>
            </Stack>
        </Stack>
    )
}


export default GraphicsForm
