import { Stack, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';

interface ICustomSlider{
    label: string,
    minDistance?: number,
    value: [number, number],
    onHandleChange: (value: [number, number]) => void
}
export default function CustomSlider({label, minDistance = 1, value, onHandleChange}: ICustomSlider) {

    const handleChange = (
        _: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            onHandleChange([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            onHandleChange([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    return (
        <Stack
            width={"100%"}
            alignItems="flex-start"
            gap={4}
        >
            <Typography variant='h5'>{label}</Typography>
            <Slider
                value={value}
                min={1880}
                max={2018}
                onChange={handleChange}
                valueLabelDisplay="on"
                disableSwap
            />
        </Stack>
    );
    }
