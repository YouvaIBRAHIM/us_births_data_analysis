import { SyntheticEvent } from "react"

import { Autocomplete } from "@mui/material"
import CustomTextField from "./TextField"
import { useSnackBarStore } from "@src/stores/snackbar.store";


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
    id?: string
}

const CustomAutocomplete = ({
    values,
    label,
    options,
    onChange,
    maxValues,
    id,
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
            renderInput={(params) => <CustomTextField {...params} label={label} />}
        />
    )
}

export default CustomAutocomplete
