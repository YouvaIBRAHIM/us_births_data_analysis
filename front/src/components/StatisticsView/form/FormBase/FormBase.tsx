import { Stack } from "@mui/material"
import { useFormStore } from "@src/components/StatisticsView/form/Form.store"
import RefineOptions from "./RefineOptions";
import { IStatsFormFields } from "./FormBase.types";
import CustomAutocomplete, { IAutocompleteValue } from "@src/components/Inputs/Autocomplete";
import FormAggregations from "./FormAggregations";
import MoreOptions from "./MoreOptions";
import CustomPaper from "@src/components/CustomPaper";


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
  },
  {
    label: "Naissances",
    value: "births"
  }
]

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
            options={options.filter(opt => !form.columns.includes(opt.value as IStatsFormFields['fields']) && opt.value !== 'births')}
            values={form.indexes ?? []}
            onChange={(values: string[]) => onUpdateIndexes(values)}
            label="Indexes"
            id="indexes"
            maxValues={2}
            description="En séléctionnant un ou deux index, vous générez implicitement une table pivot."
          />
          <CustomAutocomplete
            options={options.filter(opt => !form.indexes.includes(opt.value as IStatsFormFields['fields']))}
            values={form.columns ?? []}
            onChange={(values: string[]) => onUpdateColumns(values)}
            label="Colonnes"
            id="columns"
            maxValues={3}
            description='Les colonnes contiendront les différrentes valeurs des élements sélectionnées. Exemple : Si vous sélectionnez la colonne "Genre", vous aurez les colonnes "H" et "F".'
          />
        </Stack>
        <FormAggregations />
        <RefineOptions />
        <CustomPaper>
          <MoreOptions />
        </CustomPaper>
      </Stack>
    )
}


export default FormBase
