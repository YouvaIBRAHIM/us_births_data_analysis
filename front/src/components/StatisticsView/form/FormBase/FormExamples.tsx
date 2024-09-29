import { Chip, Stack } from "@mui/material"
import CustomSelect from "@src/components/Inputs/Select"
import { useFormStore } from "@src/components/StatisticsView/form/Form.store"
import { useState } from "react"
import { options } from "./FormExamples.mock"
import ArrowTooltips from "@src/components/ArrowTooltips"
import { Info } from "@phosphor-icons/react"

const FormExamples = () => {
    const {onSetForm, form} = useFormStore()
    const [ selectedExample, setSelectedExample ] = useState<string>('custom')

    const onSetSelectedExample = (val: string) => {
      setSelectedExample(val)
      
      const form = options.find(opt => opt.value === val)?.form

      if (form) {
        onSetForm(form)
      }
    }

    return (
      <Stack 
        direction="column" 
        gap={1}
        width="100%"
      >
        <CustomSelect
          id="forms"
          label="Formulaires"
          value={selectedExample}
          onChange={onSetSelectedExample}
          options={options}
        />
        {
          form.description &&
          <ArrowTooltips
              title={form.description}
          >
              <Chip  avatar={<Info size={24}/>} label={form.description} />
          </ArrowTooltips>
        }
      </Stack>
    )
}


export default FormExamples
