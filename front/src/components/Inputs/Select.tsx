import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Tooltip } from "@mui/material";
import { Info } from "@phosphor-icons/react";

interface CustomSelectProps {
    id: string;
    label: string;
    value: string | null;
    onChange: (value: string) => void;
    options: { value: string | null; label: string }[];
    disabledOption?: string;
    disabled?: boolean;
    error?: boolean,
    description?: string
}

const CustomSelect = ({ id, label, value, onChange, options, disabledOption, disabled, error, description }: CustomSelectProps) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value as string);
    };

    return (
        <Stack
            gap={1}
            flexWrap="nowrap"
            flexDirection="row"
            alignItems="center"
            flexGrow={1}
        >
            <FormControl 
                size="small"
                sx={{
                    flexBasis: {
                        xs: "100%",
                        sm: "20%",
                    },
                    width: {
                        xs: "100%",
                    },
                    flexGrow: 1,
                    minWidth: 150
                }}
            >
                <InputLabel id={id}>{label}</InputLabel>
                <Select
                fullWidth
                labelId={id}
                id={id}
                label={label}
                value={value as string | undefined}
                onChange={handleChange}
                error={error}
                disabled={disabled}
                >
                {
                    options.filter(opt => opt.value !== disabledOption).map((opt, i) => (
                    <MenuItem key={i} value={opt.value as string | undefined}>{opt.label}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
            {
                description &&
                <Tooltip title={description}>
                    <Info size={24} />
                </Tooltip>
            }
        </Stack>
        );
};

export default CustomSelect;