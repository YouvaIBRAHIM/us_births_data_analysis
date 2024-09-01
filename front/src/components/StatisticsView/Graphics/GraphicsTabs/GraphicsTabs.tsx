import { IGraphicsTabs } from '@components/StatisticsView/Graphics/GraphicsTabs/IGraphicsTabs'
import { Box, Tab, Tabs } from "@mui/material"
import { useEffect } from "react"
import { useFormStore } from "@components/StatisticsView/form/Form.store";
import { graphicsList } from "@components/StatisticsView/Graphics/GraphicsTabs/GraphicsTabs.mock.tsx";


const GraphicsTabs = ({selectedButtonId, onHandleClick}: IGraphicsTabs) => {
  const {form, onFormUpdate} = useFormStore()

  useEffect(() => {
    onHandleClick(graphicsList[0].id)
    onFormUpdate('chartType', graphicsList[0].options.type)
  }, [])

  useEffect(() => {
    if (form.chartType == 'bar' && form.chartOrientation == 'h') {
      onHandleClick('h-bar')
    }else{
      const chartId = graphicsList.find(graph => graph.options.type === form.chartType)?.id
      onHandleClick(chartId ?? null)
    }
  }, [form.chartType])

  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: any) => {    
    const chart = graphicsList.find(graph => graph.id === value)
    onHandleClick(value)
    if(chart){
      onFormUpdate('chartType', chart.options.type)
      onFormUpdate('chartOrientation', chart.options.orientation ?? 'v')
    }
  }

  return (
    <Box sx={{ 
      bgcolor: 'background.paper', 
    }}>
      <Tabs
        value={selectedButtonId}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{
          "& .MuiTabs-flexContainer": {
            justifyContent: 'space-around'
          },
          "& .MuiTabs-indicator": {
            display: 'none'
          },
          "& .Mui-selected":{
            borderBottom: '2px solid',
          }
        }}
        textColor="secondary"
      >
      {
        graphicsList.map((button, i) => (
          <Tab key={i} value={button.id} label={button.label} icon={button.icon} />
        ))
      }
      </Tabs>
    </Box>
  )
}


export default GraphicsTabs
