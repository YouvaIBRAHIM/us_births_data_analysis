import { Stack } from "@mui/material"
import CustomSelect from "@src/components/Inputs/Select"
import { clearForm, useFormStore } from "@src/components/StatisticsView/form/Form.store"
import { useState } from "react"
import { IStatsForm } from "./FormBase.types"

interface IOption{
  label: string,
  value: string,
  form: IStatsForm
}

const options: IOption[] = [
  {
    label: 'Personnalisé',
    value: 'custom',
    form: clearForm
  },
  {
    label: 'Mon formulaire exemple 1',
    value: 'example-1',
    form: {
        title: 'Mon formulaire exemple 1',
        indexes: ['years'],
        columns: ['gender', 'births'],
        years: {
            type: "period",
            field: "years",
            value: [1880, 1881]
        },
        names: {
            type: "all",
            field: "names",
            value: ['Manon', 'Miguel', 'Youva']
        },
        gender: {
            type: "enum",
            field: "gender",
            value: ['F', 'M']
        },
        conditions: [],
        aggregations: {
          years: null,
          names: null,
          gender: null,
          births: 'mean'
        },
        limit: null,
        orderBy: null
    }
  }
]

const FormExamples = () => {
    const {onSetForm} = useFormStore()
    const [ selectedExample, setSelectedExample ] = useState<string>('custom')

    const onSetSelectedExample = (val: string) => {
      setSelectedExample(val)
      
      const form = options.find(opt => opt.value === val)?.form

      if (form) {
        onSetForm(form)
      }
    }

    return (
      <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
        <CustomSelect
          id="forms"
          label="Formulaires"
          value={selectedExample}
          onChange={onSetSelectedExample}
          options={options}
        />
      </Stack>
    )
}


export default FormExamples
