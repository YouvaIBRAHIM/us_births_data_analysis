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
const colOptions: Record<string, IOption[]> = {
  'gender': [
    ...noAggregation,
    {
      label: 'Proportions',
      value: 'proportions'
    }
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

const indexOptions: Record<string, IOption[]> = {
  'years': [
    ...noAggregation,
    {
      label: 'Par décennies',
      value: 'decades'
    },
    {
      label: 'Nombre de prénoms par année',
      value: 'count-names-per-year'
    }
  ],
  'names': [
    ...noAggregation,
    {
      label: 'Prénoms composés',
      value: 'compounds-names'
    },
    {
      label: 'Proportions',
      value: 'proportions'
    },
    {
      label: 'Longueur des prénoms',
      value: 'names-length'
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

    if (form.columns.length === 0 && form.indexes.length === 0) {
      return null
    }
    
    return (
      <Stack width={'100%'} flexGrow={1} flex={2} gap={2} flexDirection="column">
          <Divider 
            sx={{
              width: '100%'
            }}
          >Aggrégations</Divider>
          <Stack 
            flexDirection='row'
            width={'100%'}
            gap={4}
            justifyContent='space-between'
          >
            <Stack
              width={'100%'}
              flexDirection="column"
              alignSelf="flex-start"
              gap={2}
            >
              {
                form.indexes.map((index, i) => (
                  indexOptions[index] && (
                    <Stack 
                      key={i} 
                      direction="row" 
                      alignItems="center" 
                      flexWrap="wrap" 
                      gap={2} 
                      sx={{
                        width: '100%'
                      }}
                    >
                      <Typography variant="body2">{getLabel(index)}</Typography>
                      <CustomSelect
                        id="aggregations"
                        label="Fonction d'aggrégation"
                        value={form.aggregations[index]}
                        onChange={(val) => onSetSelectedExample(val, index)}
                        options={indexOptions[index] ?? []}
                        description={"Vous pouvez appliquer l'une des fonctions listées sur l'index " + getLabel(index)}
                      />
                    </Stack>
                  )
                ))
              }
            </Stack>
            <Stack
              width={'100%'}
              flexDirection="column"
              alignSelf="flex-end"
              gap={2}
            >
              {
                form.columns.map((col, i) => (
                  colOptions[col] && (
                    <Stack 
                      key={i} 
                      direction="row" 
                      alignItems="center" 
                      flexWrap="wrap" 
                      gap={2} 
                      sx={{
                        width: '100%'
                      }}
                    >
                      <Typography variant="body2">{getLabel(col)}</Typography>
                      <CustomSelect
                        id="aggregations"
                        label="Fonction d'aggrégation"
                        value={form.aggregations[col]}
                        onChange={(val) => onSetSelectedExample(val, col)}
                        options={colOptions[col] ?? []}
                        description={"Vous pouvez appliquer l'une des fonctions listées sur la colonne " + getLabel(col)}
                      />
                    </Stack>
                  )
                ))
              }
            </Stack>
          </Stack>
      </Stack>
    )
}


export default FormAggregations
