import * as React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import {useContext, useState} from "react"
import EditProfile from "../../components/TabPanels/EditProfile"
import ChangePassword from "../../components/TabPanels/ChangePassword"
import QrScanner from "../../components/TabPanels/QrScanner"
import {dictionary} from "../../Language/lang";
import {LanguageApi} from "../../contextApi/LanguageContext";

import {palette,ThemeApi} from "../../contextApi/ThemeContext"

interface TabPanelProps {
  children?: any
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {

  const { children, value, index, ...other } = props

  


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default function SettingsPage() {
    const language = useContext(LanguageApi)
  const [value, setValue] = useState(0)
  const mode = useContext(ThemeApi)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{color:palette.textColor[mode.mode]}} label={dictionary["Edit Profile"][language.language]} />
          <Tab sx={{color:palette.textColor[mode.mode]}} label={dictionary["Security"][language.language]} />
          {/* <Tab label="QR-Code" /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EditProfile></EditProfile>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePassword></ChangePassword>
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
         <QrScanner></QrScanner>
      </TabPanel> */}
    </Box>
  )
}
