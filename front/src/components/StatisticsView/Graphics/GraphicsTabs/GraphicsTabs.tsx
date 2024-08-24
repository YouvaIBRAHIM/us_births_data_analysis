import { ChartBar, ChartBarHorizontal, ChartLine, ChartPie, ChartScatter, ProhibitInset } from "@phosphor-icons/react"
import { IGraphicsTabsItem, IGraphicsTabs } from '@components/StatisticsView/Graphics/GraphicsTabs/IGraphicsTabs'
import { Box, Tab, Tabs } from "@mui/material"
import { useEffect } from "react"
import { useFormStore } from "@components/StatisticsView/form/Form.store";

export const graphicsList: IGraphicsTabsItem[] = [
  {
    id: null,
    label: "Aucun graphique",
    icon: <ProhibitInset size={24} />,
    options: {
      type: null,
    }
  },
  {
    id: "bar",
    label: "Diagramme en Barres",
    icon: <ChartBar size={24} />,
    options: {
      type: 'bar',
    }
  },
  {
    id: "h-bar",
    label: "Diagramme en Barres Horizontales",
    icon: <ChartBarHorizontal size={24} />,
    options: {
      type: 'bar',
      orientation: 'h'
    }
  },
  {
    id: "line",
    label: "Diagramme en Lignes",
    icon: <ChartLine size={24} />,
    options: {
      type: 'line',
    }
  },
  {
    id: "scatter",
    label: "Diagramme de Dispersion",
    icon: <ChartScatter size={24} />,
    options: {
      type: 'scatter',
      mode: 'markers',
    }
  }, 
  {
    id: "pie",
    label: "Diagramme en Secteurs",
    icon: <ChartPie size={24} />,
    options: {
      type: 'pie',
    }
  },
]

const GraphicsTabs = ({selectedButtonId, onHandleClick}: IGraphicsTabs) => {
  const {onFormUpdate} = useFormStore()

  useEffect(() => {
    onHandleClick(graphicsList[0].id)
    onFormUpdate('chartType', graphicsList[0].options.type)
  }, [])

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
