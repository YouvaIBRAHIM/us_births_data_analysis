import CustomSlider from "@src/components/Inputs/Slider";
import CustomSelect from "@components/Inputs/Select";
import { useFormStore } from "@components/StatisticsView/form/Form.store";
import { Divider, Paper, Stack } from "@mui/material";
import InputList from "@components/Inputs/InputList";
import { options } from "./FormBase";
import { IStatsFormFields } from "./FormBase.types";


const yearsOptions = [
    {
        label: "Période",
        value: "period"
    },
    {
        label: "Énumération",
        value: "enum"
    }
]

const fieldOptions = [
    {
        label: "Toutes les valeurs",
        value: "all"
    },
    {
        label: "Énumération",
        value: "enum"
    }
]

const getLabel = (value: string) => {
    return options.find(opt => opt.value == value)?.label
}

const RefineOptions = () => {
    const { form, onFormUpdate } = useFormStore()
    
    const onHandlePeriod = (value: [number, number]) => {
        onFormUpdate('years', {
            field: 'years',
            type: "period",
            value
        })
    }
    
    const renderAxisOptions = (
        field: IStatsFormFields['fields'], 
    ) => {

        const onAddValue = (value: string) => {
            const values = form[field].value as string[]
            if (!values.includes(value)) {
                onFormUpdate(field, {
                    ...form[field],
                    value: [...values, value]
                })
            }
        }

        const onRemoveValue = (index: number) => {
            const values = form[field].value as string[]
            onFormUpdate(field, {
                ...form[field],
                value: values.filter((_, i) => i !== index)
            })
        }

        const renderOptions = () => {
            if ((field === 'years')) {
                switch (form[field].type) {
                    case "period":
                        return <CustomSlider label={getLabel(field) ?? field} onHandleChange={(val) => onHandlePeriod(val)} value={form.years.value as [number, number]} /> ;

                    case "enum":
                        return <InputList label={getLabel(field) ?? field} values={form[field].value as string[]} onAddValue={onAddValue} onRemoveValue={onRemoveValue} />;
                
                    default:
                        return null;
                }
            } else {
                switch (form[field].type) {
                    case "enum":
                        return <InputList label={getLabel(field) ?? field} values={form[field].value as string[]} onAddValue={onAddValue} onRemoveValue={onRemoveValue} />;
                
                    default:
                        return null;
                }
            }
        }

        const getSelect = () => {

            const onChangeSelect = (val: string) => {
                if (val === 'period') {
                    onFormUpdate(field, {
                        ...form[field],
                        type: val,
                        value: [1880, 1881]
                    })
                }else{
                    onFormUpdate(field, {
                        ...form[field],
                        type: val
                    })
                }
            }
            return ( 
                <>
                    <Divider>Options du champ {getLabel(field as string)}</Divider>  
                    <CustomSelect
                        id={`${field}Options`}
                        label="Sélectionner par"
                        value={form[field].type}
                        onChange={onChangeSelect}
                        options={field === "years" ? yearsOptions : fieldOptions}
                    />
                </>
            )
        }

        return (
            <Paper
                elevation={3}
                sx={{
                    p: 2
                }}
            >
                <Stack flexDirection="column" gap={2} width="100%">
                    {getSelect()}
                    {renderOptions()}
                </Stack>
            </Paper>
        )
    }

    return (
        <Stack flexDirection="column" gap={2} width="100%">
            {renderAxisOptions('years')}
            {renderAxisOptions('names')}
            {renderAxisOptions('gender')}
            {renderAxisOptions('births')}
        </Stack>
    )
}

export default RefineOptions
