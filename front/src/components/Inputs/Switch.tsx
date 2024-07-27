import { FormControlLabel, FormGroup, useTheme } from "@mui/material"
import MuiSwitch from "@mui/material/Switch"

interface ISwitchBackgoundColor {
  checked: {
    dark: string
    light: string
  }
  notChecked: {
    dark: string
    light: string
  }
}
const Switch = ({
  label,
  labelPlacement = "end",
  checked = false,
  action,
  background,
}: {
  label?: string
  labelPlacement?: "end" | "start" | "top" | "bottom"
  checked: boolean
  action: () => void
  background?: {
    backgroundImage?: {
      checked: string // img url
      notChecked: string // img url
    }
    backgroundColor?: {
      track?: ISwitchBackgoundColor
      thumb?: ISwitchBackgoundColor
    }
  }
}) => {
  const { mode } = useTheme().palette
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MuiSwitch
            sx={{
              m: 1.5,
              "& .MuiSwitch-switchBase": {
                "&.Mui-checked": {
                  "& .MuiSwitch-thumb:before": {
                    ...(background &&
                      background.backgroundImage && {
                        backgroundImage: `url(${background.backgroundImage.checked})`,
                      }),
                  },
                  "& + .MuiSwitch-track": {
                    ...(background &&
                      background.backgroundColor &&
                      background.backgroundColor.track && {
                        backgroundColor:
                          mode === "dark"
                            ? background.backgroundColor.track.checked.dark
                            : background.backgroundColor.track.checked.light,
                      }),
                  },
                },
              },
              "& .MuiSwitch-thumb": {
                ...(background &&
                  background.backgroundColor &&
                  background.backgroundColor.thumb && {
                    backgroundColor:
                      mode === "dark"
                        ? background.backgroundColor.thumb.notChecked.dark
                        : background.backgroundColor.thumb.notChecked.light,
                  }),
                "&::before": {
                  ...(background &&
                    background.backgroundImage && {
                      backgroundImage: `url(${background.backgroundImage.notChecked})`,
                    }),
                },
              },
              "& .MuiSwitch-track": {
                ...(background &&
                  background.backgroundColor &&
                  background.backgroundColor.track && {
                    backgroundColor:
                      mode === "dark"
                        ? background.backgroundColor.track.notChecked.dark
                        : background.backgroundColor.track.notChecked.light,
                  }),
              },
            }}
            defaultChecked={checked}
            onChange={action}
          />
        }
        labelPlacement={labelPlacement}
        label={label}
      />
    </FormGroup>
  )
}
export default Switch
