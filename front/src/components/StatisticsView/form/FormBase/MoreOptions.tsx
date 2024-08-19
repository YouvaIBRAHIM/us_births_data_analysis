import { Divider, Stack } from "@mui/material"
import CustomSelect from "@src/components/Inputs/Select"
import { useFormStore } from "@src/components/StatisticsView/form/Form.store"
import { options } from "./FormBase";
import CustomTextField from "@src/components/Inputs/TextField";

interface IOption{
  label: string,
  value: string,
}

const orderOptions: IOption[] = [
  {
    label: 'Descendant',
    value: 'desc'
  },
  {
    label: 'Ascendant',
    value: 'asc'
  }
]

const MoreOptions = () => {
    const {form, onFormUpdate} = useFormStore()

    const onSetOrderBy = (val: string | null) => {
      onFormUpdate('orderBy', val ? {
        field: val,
        order: 'asc'
      } : null)
    }

    const onSetOrder = (val: string| null) => {
      onFormUpdate('orderBy', {
        ...form.orderBy,
        order: val,
      })
    }

    const onSetLimit = (val: string) => {
      onFormUpdate('limit', val.trim() != "" ? Number(val) : null)
    }

    return (
      <Stack width={'100%'} flexGrow={1} flex={2} gap={2} direction="column" alignItems="flex-start">
          <Divider 
            sx={{
              width: '100%'
            }}
          >Plus d'options</Divider>
          <Stack flexDirection='row' flexWrap='wrap' gap={2}>
            <Stack flexDirection='row' gap={2}>
              <CustomSelect
                id="orderField"
                label="Ordonner par"
                value={form.orderBy?.field ?? null}
                onChange={(val) => onSetOrderBy(val)}
                options={[{label: 'Non ordonné', value: null},...options, {label: 'Naissances', value: 'births'}]}
              />
              <CustomSelect
                id="order"
                label="Ordre"
                value={form.orderBy?.order ?? null}
                onChange={(val) => onSetOrder(val)}
                options={orderOptions}
                disabled={form.orderBy?.field ? false : true}
              />
            </Stack>
            <Stack flexDirection='row' gap={2}>
              <CustomTextField value={form.limit} size="small" label="Limite de réponse" type="number" onChange={(e) => onSetLimit(e.target.value)}/>
            </Stack>
          </Stack>
      </Stack>
    )
}


export default MoreOptions
