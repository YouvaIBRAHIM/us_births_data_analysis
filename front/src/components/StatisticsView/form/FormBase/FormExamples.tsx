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
        indexes: ['years', 'names'],
        columns: ['gender', 'births'],
        years: {
            type: "period",
            field: "years",
            value: [1996, 2018]
        },
        names: {
            type: "enum",
            field: "names",
            value: ['Manon', 'Miguel', 'Youva']
        },
        gender: {
            type: "enum",
            field: "gender",
            value: ['F', 'M']
        },
        births: {
            type: "all",
            field: "births",
            value: []
        },
        conditions: [
          {
            field: 'names',
            condition: 'LIKE',
            value: 'M%',
          },
          {
            field: 'births',
            condition: '>',
            value: '3000',
          }
        ],
        aggregations: {
          years: null,
          names: null,
          gender: null,
          births: 'moan'
        },
        limit: 5000,
        orderBy: {
            field: "names",
            order: "asc"
        }
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
