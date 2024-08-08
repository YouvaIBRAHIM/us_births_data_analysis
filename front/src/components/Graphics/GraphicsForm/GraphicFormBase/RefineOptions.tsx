import CustomSlider from "@src/components/Inputs/Slider";
import CustomSelect from "@components/Inputs/Select";
import { useGraphicFormStore } from "@components/Graphics/GraphicsForm/GraphicForm.store";
import { useEffect, useState } from "react";
import { Divider, Stack } from "@mui/material";
import InputList from "@components/Graphics/GraphicsForm/Inputs/InputList";
import { axisOptions } from "./GraphicFormBase";
import { IAxis, IAxisList } from "./GraphicFormBase.types";


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

const namesOptions = [
    {
        label: "Tous les prénoms",
        value: "all"
    },
    {
        label: "Énumération",
        value: "enum"
    }
]

const getAxis = (axis: string) => {
    return axis[0].toUpperCase()
}

const getLabel = (value: string) => {
    return axisOptions.find(opt => opt.value == value)?.label
}

const RefineOptions = () => {
    const { form, onFormUpdate } = useGraphicFormStore()
    
    const onHandlePeriod = (form: Record<string, IAxis>, axis: string, value: [number, number]) => {
        onFormUpdate(axis, {
            ...form[axis],
            type: "period",
            value
        })
    }
    
    const renderAxisOptions = (
        axis: keyof IAxisList, 
        ) => {
        const tempForm = form as Record<string, IAxis>;
        const [selectedOption, setSelectedOption] = useState<"all" | "period" | "enum">("enum")

        useEffect(() => {
            if (tempForm[axis]) {
                onFormUpdate(axis, {
                    ...tempForm[axis],
                    type: selectedOption,
                    value: selectedOption === "period" ? [1880, 1890] : selectedOption === "all" ? [] : tempForm[axis].value
                })
            }
        }, [selectedOption])

        if (!tempForm[axis]) {
            return null
        }

        const onAddValue = (value: string) => {
            const values = tempForm[axis].value as string[]
            if (!values.includes(value)) {
                onFormUpdate(axis, {
                    ...tempForm[axis],
                    type: selectedOption,
                    value: [...values, value]
                })
            }
        }

        const onRemoveValue = (index: number) => {
            const values = tempForm[axis].value as string[]
            onFormUpdate(axis, {
                ...tempForm[axis],
                value: values.filter((_, i) => i !== index)
            })
        }

        const renderOptions = () => {
            if ((axis === 'xAxis' || axis === 'yAxis')) {
                switch (selectedOption) {
                    case "period":
                        return <CustomSlider label={getLabel(tempForm[axis].field) ?? getAxis(axis)} onHandleChange={(val) => onHandlePeriod(tempForm, axis, val)} value={tempForm[axis].value as [number, number] ?? [1880, 1881]} /> ;

                    case "enum":
                        return <InputList label={getLabel(tempForm[axis].field) ?? getAxis(axis)} values={tempForm[axis].value as string[]} onAddValue={onAddValue} onRemoveValue={onRemoveValue} />;
                
                    default:
                        return null;
                }
            } else {
                return <InputList label={getLabel(tempForm[axis].field) ?? getAxis(axis)} values={tempForm[axis].value as string[]} onAddValue={onAddValue} onRemoveValue={onRemoveValue} />;
            }
        }

        const getSelect = () => {
            const field = tempForm[axis].field
            if ((axis === 'xAxis' || axis === 'yAxis') && (field === "years" || field === "names")) {
                
                return ( 
                    <>
                        <Divider>Options du champ {getLabel(field as string)} sur l'axe {getAxis(axis)}</Divider>  
                        <CustomSelect
                            id={`${axis}Options`}
                            label="Sélectionner par"
                            value={selectedOption}
                            onChange={(value) => setSelectedOption(value as "all" | "period" | "enum")}
                            options={field === "years" ? yearsOptions : namesOptions}
                        />
                    </>
                )
            }
            return <Divider>Options du champ {getLabel(field as string)} sur l'axe {getAxis(axis)}</Divider> 
        }

        return (
            <Stack flexDirection="column" gap={2} width="100%">
                {getSelect()}
                {renderOptions()}
            </Stack>
        )
    }

    return (
        <Stack flexDirection="column" gap={2} width="100%">
            {renderAxisOptions('xAxis')}
            {renderAxisOptions('yAxis')}
            {renderAxisOptions('zAxis')}
        </Stack>
    )
}

export default RefineOptions
