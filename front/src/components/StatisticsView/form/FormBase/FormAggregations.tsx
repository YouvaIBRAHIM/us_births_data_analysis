import { Divider, Stack, Typography } from "@mui/material"
import CustomSelect from "@src/components/Inputs/Select"
import { useFormStore } from "@src/components/StatisticsView/form/Form.store"
import { options as fieldOptions } from "./FormBase";

interface IOption{
  label: string,
  value: string | null,
}

const noAggregation: IOption[] = [{
  label: 'Aucune fonction d\'aggrégation',
  value: null
}]
const options: Record<string, IOption[]> = {
  'years': [
    ...noAggregation,
    {
      label: 'Par décennies',
      value: 'decades'
    }
  ],
  'names': [
    ...noAggregation,
    {
      label: 'Prénoms composés',
      value: 'compounds-names'
    }
  ],
  'gender': [
    ...noAggregation
  ],
  'births': [
    ...noAggregation,
    {
      label: 'Moyenne',
      value: 'mean'
    },
    {
      label: 'Somme',
      value: 'sum'
    },
    {
      label: 'Médiane',
      value: 'median'
    },
    {
      label: 'Minimum',
      value: 'min'
    },
    {
      label: 'Maximum',
      value: 'max'
    }
  ]
}

const getLabel = (value: string) => {
  return fieldOptions.find(opt => opt.value == value)?.label
}

const FormAggregations = () => {
    const {form, onFormUpdate} = useFormStore()

    const onSetSelectedExample = (val: string, col: string) => {
      onFormUpdate('aggregations', {
        ...form.aggregations,
        [col]: val
      })
    }

    if (form.columns.length === 0) {
      return null
    }

    return (
      <Stack width={'100%'} flexGrow={1} flex={2} gap={2} flexDirection="column" alignItems="flex-end">
          <Divider 
            sx={{
              width: '100%'
            }}
          >Aggrégations</Divider>
            {
              form.columns.map((col, i) => (
                <Stack 
                  key={i} 
                  direction="row" 
                  alignItems="center" 
                  flexWrap="wrap" 
                  gap={2} 
                  sx={{
                    width: {
                      xs: '100%',
                      sm: '50%',
                    }
                  }}
                >
                  <Typography variant="body2">{getLabel(col)}</Typography>
                  <CustomSelect
                    id="aggregations"
                    label="Fonction d'aggrégation"
                    value={form.aggregations[col]}
                    onChange={(val) => onSetSelectedExample(val, col)}
                    options={options[col] ?? []}
                  />
                </Stack>
              ))
            }
      </Stack>
    )
}


export default FormAggregations
