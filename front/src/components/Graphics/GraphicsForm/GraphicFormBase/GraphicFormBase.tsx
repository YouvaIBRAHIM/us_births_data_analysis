import { Stack } from "@mui/material"
import { useGraphicFormStore } from "@components/Graphics/GraphicsForm/GraphicForm.store";
import CustomSelect from "@components/Inputs/Select";
import RefineOptions from "./RefineOptions";
import { useEffect } from "react";
import { IAxis } from "./GraphicFormBase.types";

export interface IGraphics{
    selectedGraphicId: string | null
}

export const axisOptions: {
  label: string;
  value: string;
}[] = [
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

const GraphicFormBase = ({withZAxis}: {withZAxis?: boolean}) => {
    const {form, onFormUpdate, removeKeyForm} = useGraphicFormStore()

    useEffect(() => {
      if (!withZAxis) {
        removeKeyForm("zAxis")
      }
    }, [withZAxis])

    const tempForm = form as Record<string, IAxis>;

    return (
      <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
        <CustomSelect
          id="XAxeId"
          label="Axe X"
          value={tempForm['xAxis']?.field as string ?? ''}
          onChange={(field: string) => onFormUpdate('xAxis', {field, value: []})}
          options={axisOptions}
          disabledOption={tempForm['yAxis']?.field as string ?? ''}
        />
        <CustomSelect
          id="YAxeId"
          label="Axe Y"
          value={tempForm['yAxis']?.field as string ?? ''}
          onChange={(field: string) => onFormUpdate('yAxis', {field, value: []})}
          options={axisOptions}
          disabledOption={tempForm['xAxis']?.field as string ?? ''}
        />
        {
          withZAxis &&
          <CustomSelect
            id="ZAxeId"
            label="Axe Z"
            value={tempForm['zAxis']?.field as string  ?? ''}
            onChange={(field: string) => onFormUpdate('zAxis', {field, value: []})}
            options={axisOptions}
            disabledOption={tempForm['yAxis']?.field as string ?? ''}
          />
        }
        <RefineOptions />
      </Stack>
    )
}


export default GraphicFormBase
