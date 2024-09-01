import { Stack } from "@mui/material"
import CustomSelect from "@src/components/Inputs/Select"
import { useFormStore } from "@src/components/StatisticsView/form/Form.store"
import { useState } from "react"
import { options } from "./FormExamples.mock"

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
