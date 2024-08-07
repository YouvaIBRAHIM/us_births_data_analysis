import { Stack } from "@mui/material"
import { useGraphicFormStore } from "@components/Graphics/GraphicsForm/GraphicForm.store";
import CustomSelect from "@components/Inputs/Select";
import RefineOptions from "./RefineOptions";

export interface IGraphics{
    selectedGraphicId: string | null
}

export const axesOptions: {
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

const GraphicFormBase = ({withZAxes}: {withZAxes?: boolean}) => {
    const {form, onFormUpdate} = useGraphicFormStore()

    return (
      <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
        <CustomSelect
          id="XAxeId"
          label="Axe X"
          value={form?.xAxes as string || ''}
          onChange={(value: string) => onFormUpdate('xAxes', value)}
          options={axesOptions}
          disabledOption={form?.yAxes as string  || ''}
        />
        <CustomSelect
          id="YAxeId"
          label="Axe Y"
          value={form?.yAxes as string  || ''}
          onChange={(value: string) => onFormUpdate('yAxes', value)}
          options={axesOptions}
          disabledOption={form?.xAxes as string  || ''}
        />
        {
          withZAxes &&
          <CustomSelect
            id="ZAxeId"
            label="Axe Z"
            value={form?.zAxes as string  || ''}
            onChange={(value: string) => onFormUpdate('zAxes', value)}
            options={axesOptions}
            disabledOption={form?.yAxes as string  || ''}
          />
        }
        <RefineOptions />
      </Stack>
    )
}


export default GraphicFormBase
