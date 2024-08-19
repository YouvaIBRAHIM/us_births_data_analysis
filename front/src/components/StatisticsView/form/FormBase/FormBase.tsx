import { Stack } from "@mui/material"
import { useFormStore } from "@src/components/StatisticsView/form/Form.store"
import RefineOptions from "./RefineOptions";
import { IStatsFormFields } from "./FormBase.types";
import CustomAutocomplete, { IAutocompleteValue } from "@src/components/Inputs/Autocomplete";
import FormAggregations from "./FormAggregations";
import MoreOptions from "./MoreOptions";


export const options: IAutocompleteValue[] = [
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
  }
]

const birthsOption: IAutocompleteValue = {
  label: "Naissances",
  value: "births"
}

const FormBase = () => {
    const {form, onFormUpdate} = useFormStore()


    const onUpdateIndexes = (values: string[]) => {
      onFormUpdate('indexes', values)
    }

    const onUpdateColumns = (values: string[]) => {
      onFormUpdate('columns', values)
    }

    return (
      <Stack direction="column" alignItems="center" gap={2}>
        <Stack width={'100%'} flexGrow={1} direction="row" alignItems="center" flexWrap="wrap" gap={2}>
          <CustomAutocomplete
            options={options.filter(opt => !form.columns.includes(opt.value as IStatsFormFields['fields']))}
            values={form.indexes ?? []}
            onChange={(values: string[]) => onUpdateIndexes(values)}
            label="Indexes"
            id="indexes"
            maxValues={2}
          />
          <CustomAutocomplete
            options={[...options, birthsOption].filter(opt => !form.indexes.includes(opt.value as IStatsFormFields['fields']))}
            values={form.columns ?? []}
            onChange={(values: string[]) => onUpdateColumns(values)}
            label="Colonnes"
            id="columns"
            maxValues={3}
          />
        </Stack>
        <FormAggregations />
        <RefineOptions />
        <MoreOptions />
      </Stack>
    )
}


export default FormBase
