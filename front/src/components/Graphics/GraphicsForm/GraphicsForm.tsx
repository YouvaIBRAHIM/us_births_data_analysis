import { Button, Typography } from "@mui/material";
import GraphicBarFrom from "@components/Graphics/GraphicsForm/GraphicBar/GraphicBarFrom"
import { Stack } from "@mui/system";
import CustomTextField from "@src/components/Inputs/TextField";
import { useGraphicFormStore } from "@components/Graphics/GraphicsForm/GraphicForm.store";
import ConditionBuilder from "@src/components/Conditions/Conditions";
import { Condition } from "@src/components/Conditions/Conditions.types";


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

const GraphicFrom = ({ selectedGraphicId }: IGraphics) => {
    const {form, onFormUpdate} = useGraphicFormStore()

    if (!selectedGraphicId) {
        return(
            <Typography variant="body2" gutterBottom>Veuillez sélectioner un graphique</Typography>
        );
    }

    const renderForm = (selectedGraphicId: string) => {
        switch (selectedGraphicId) {
            case 'bar':
                return <GraphicBarFrom />;
            case 'h-bar':
                return <GraphicBarFrom />;
            default:
                return <Typography variant="body2" gutterBottom>Le formulaire n'est pas disponible</Typography>;
        }
    }

    const onSetConditions = (conditions: Condition[]) => {
        onFormUpdate("conditions", conditions)
    }

    const onSubmit = () => {
        console.log(form);
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
            <ConditionBuilder fieldOptions={fieldOptions} conditions={form?.conditions as Condition[] ?? []} onSetConditions={onSetConditions} />
            <Stack
                alignItems="flex-end"
                marginTop={4}
            >
                <Button
                    variant="contained" 
                    onClick={onSubmit}
                >
                    Générer
                </Button>
            </Stack>
        </Stack>
    )
}


export default GraphicFrom
