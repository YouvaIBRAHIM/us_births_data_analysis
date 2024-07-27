import * as React from "react"

import { useTheme } from "@mui/material/styles"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"

import UsersListView from "@src/components/UserListView/UserListView"

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2, minHeight: "75vh" }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  }
}

export default function Admin() {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Utilisateurs" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <UsersListView />
        </TabPanel>
    </Box>
  )
}
