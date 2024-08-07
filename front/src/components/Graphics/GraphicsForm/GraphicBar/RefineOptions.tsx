import CustomSlider from "@src/components/Inputs/Slider";
import CustomSelect from "@components/Inputs/Select";
import { useGraphicFormStore } from "@components/Graphics/GraphicsForm/GraphicForm.store";
import { useEffect, useState } from "react";
import { Divider, Stack } from "@mui/material";
import InputList from "@components/Graphics/GraphicsForm/Inputs/InputList";

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

const RefineOptions = () => {
    const {form, onFormUpdate, removeKeyForm} = useGraphicFormStore()
    const [selectedYearsOption, setSelectedYearsOption] = useState<"period" | "enum">("period")
    const [selectedNamesOption, setSelectedNamesOption] = useState<"all" | "enum">("all")

    const onHandlePeriod = (value: [number, number]) => {
        onFormUpdate('period', value)
    }

    useEffect(() => {
        if (selectedYearsOption === "enum") {
            removeKeyForm("period")
        } else if (selectedYearsOption === "period") {
            removeKeyForm("years")
        }
    }, [selectedYearsOption])

    useEffect(() => {
        if (selectedNamesOption === "all") {
            removeKeyForm("names")
        }
    }, [selectedNamesOption])

    const renderYearsOptions = () => {
        const [values, setValues] = useState<string[]>([])

        useEffect(() => {
            onFormUpdate("years", values)
        }, [values])

        if (form?.xAxes !== "years" &&
            form?.yAxes !== "years"
        ) {
            return null
        }

        const onAddValue = (value: string) => {
            if (!values.includes(value)) {
                setValues([...values, value])
            }
        }

        const onRemoveValue = (index: number) => {
            setValues(values.filter((_, i) => i !== index))
        }

        const renderOption = () => {
            switch (selectedYearsOption) {
                case "period":
                    return <CustomSlider label="Période" onHandleChange={onHandlePeriod} value={form?.period as [number, number] ?? [1880, 1881]}/>;
            
                case "enum":
                    return <InputList label="Année" values={values} onAddValue={onAddValue} onRemoveValue={onRemoveValue} />;
            }
        }

        return (
            <Stack flexDirection="column" gap={1} width="100%">
                <Divider>Options sur le champ Année</Divider>
                <CustomSelect
                    id="yearsOptions"
                    label="Sélectionner par"
                    value={selectedYearsOption}
                    onChange={(value) => setSelectedYearsOption(value as "period" | "enum")}
                    options={yearsOptions}
                />
                {renderOption()}
            </Stack>
        )
    }

    const renderNamesOptions = () => {
        const [values, setValues] = useState<string[]>([])

        useEffect(() => {
            onFormUpdate("names", values)
        }, [values])

        if (form?.xAxes !== "names" &&
            form?.yAxes !== "names"
        ) {
            return null
        }

        const onAddValue = (value: string) => {
            if (!values.includes(value)) {
                setValues([...values, value])
            }
        }

        const onRemoveValue = (index: number) => {
            setValues(values.filter((_, i) => i !== index))
        }

        const renderOption = () => {
            switch (selectedNamesOption) {
                case "enum":
                    return <InputList label="Prénom" values={values} onAddValue={onAddValue} onRemoveValue={onRemoveValue} />;
            
                case "all":
                    return null;
            }
        }

        return (
            <Stack flexDirection="column" gap={1} width="100%">
                <Divider>Options sur le champ Prénom</Divider>
                <CustomSelect
                    id="namesOptions"
                    label="Sélectionner par"
                    value={selectedNamesOption}
                    onChange={(value) => setSelectedNamesOption(value as "all" | "enum")}
                    options={namesOptions}
                />
                {renderOption()}
            </Stack>
        )
    }
    return (
        <Stack flexDirection="column" gap={2} width="100%">
            {renderYearsOptions()}
            {renderNamesOptions()}
        </Stack>
    )
}

export default RefineOptions