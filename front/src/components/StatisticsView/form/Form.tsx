import { Button, CircularProgress } from "@mui/material";
import FormBase from "@components/StatisticsView/form/FormBase/FormBase"
import { Stack } from "@mui/system";
import CustomTextField from "@src/components/Inputs/TextField";
import ConditionBuilder from "@src/components/Conditions/Conditions";
import { ICondition } from "@src/components/Conditions/Conditions.types";
import { useForm } from "@src/components/StatisticsView/form/Form.hook";
import FormExamples from "./FormBase/FormExamples";



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

const Form = () => {
    const { 
        form, 
        onFormUpdate, 
        onSubmit,
        onSetConditions,
        isPendingStatsData,
    } = useForm()

    return (
        <Stack 
            gap={2}
            flexDirection="column"
        >
            <FormExamples />
            <CustomTextField 
                label="Titre"
                sx={{
                    maxWidth: 350
                }}
                value={form.title}
                onChange={(e) => onFormUpdate("title", e.target.value)}
            />
            <FormBase />
            <ConditionBuilder fieldOptions={fieldOptions} conditions={form.conditions as ICondition[] ?? []} onSetConditions={onSetConditions} />
            <Stack
                alignItems="flex-end"
                marginTop={4}
            >
                <Button
                    variant="contained" 
                    onClick={onSubmit}
                    disabled={isPendingStatsData}
                    sx={{
                        minWidth: 150
                    }}
                >
                    {
                        !isPendingStatsData ?
                        "Générer"
                        :
                        <CircularProgress size={24} color="inherit" />
                    }
                    
                </Button>
            </Stack>
        </Stack>
    )
}


export default Form