import { SyntheticEvent } from "react"

import { Autocomplete, Stack, Tooltip } from "@mui/material"
import CustomTextField from "./TextField"
import { useSnackBarStore } from "@src/stores/snackbar.store";
import { Info } from "@phosphor-icons/react";


export interface IAutocompleteValue {
    label: string;
    value: string;
}

interface IAutocomplete {
    label: string;
    values: string[];
    options: IAutocompleteValue[];
    onChange: (value: string[]) => void;
    maxValues?: number;
    id?: string,
    description?: string
}

const CustomAutocomplete = ({
    values,
    label,
    options,
    onChange,
    maxValues,
    id,
    description
}: IAutocomplete) => {
    const { showSnackBar } = useSnackBarStore()

    const onHandleChange = (_: SyntheticEvent<Element, Event>, value: IAutocompleteValue[]) => {

        if (value) {
            if (maxValues && value.length > maxValues) {
                showSnackBar(`Vous ne pouvez sélectionner que ${maxValues} valeur.s dans le champ ${label}`, "warning")
            }else{
                onChange(value.map(val => val.value))
            }
        }
    }

    return (
        <Stack
            gap={1}
            flexWrap="nowrap"
            flexDirection="row"
            alignItems="center"
            flexGrow={1}
        >
            <Autocomplete
                size="small"
                sx={{
                    my: 2,
                    flexBasis: {
                        xs: "100%",
                        sm: "20%",
                    },
                    width: {
                        xs: "100%",
                    },
                    flexGrow: 1

                }}
                multiple
                disablePortal
                id={id ?? "autocompleteId"}
                options={options}
                value={options.filter((el) =>
                    values.includes(el.value),
                )}
                onChange={onHandleChange}
                renderInput={(params) => <CustomTextField {...params} label={label} margin="none"/>}
            />
            {
                description &&
                <Tooltip title={description}>
                    <Info size={24} />
                </Tooltip>
            }
        </Stack>
    )
}

export default CustomAutocomplete
