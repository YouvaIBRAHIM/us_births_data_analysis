import { ChartBar, ChartBarHorizontal, ChartLine, ChartPie, ChartScatter, SquaresFour } from "@phosphor-icons/react"
import { IGraphicsTabsItem, IGraphicsTabs } from '@src/components/Graphics/GraphicsTabs/IGraphicsTabs'
import { Box, Tab, Tabs } from "@mui/material"
import { useSideBar } from "@src/stores/sidebar.store"
import { sideBarConst } from "@src/services/constants.service"
import { useEffect } from "react"
import { useGraphicFormStore } from "@components/Graphics/GraphicsForm/GraphicForm.store";

export const graphicsList: IGraphicsTabsItem[] = [
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
  {
    id: "heat",
    label: "Graphique thermique",
    icon: <SquaresFour size={24} />,
    options: {
      type: 'heat',
    }
  },
]

const GraphicsTabs = ({selectedButtonId, onHandleClick}: IGraphicsTabs) => {
  const { isOpen } = useSideBar()
  const {onFormUpdate, removeKeyForm} = useGraphicFormStore()

  useEffect(() => {
    onHandleClick(graphicsList[0].id)
    onFormUpdate('type', graphicsList[0].options.type)
  }, [])

  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: any) => {
    onHandleClick(value)
    
    const chart = graphicsList.find(graph => graph.id === value)
    if(chart){
      onFormUpdate('type', chart.options.type)
      if(chart.options.orientation){
        onFormUpdate('orientation', chart.options.orientation)
      }else{
        removeKeyForm('orientation')
      }
    }
  }


  return (
    <Box sx={{ 
      bgcolor: 'background.paper', 
      maxWidth: {
        xs: `calc(100vw - ${isOpen ? sideBarConst.openedWidth : sideBarConst.closedWidth}px)`
      }
    }}>
      {
        selectedButtonId &&
        <Tabs
          value={selectedButtonId}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={(theme) => ({
            "& .MuiTabs-flexContainer": {
              justifyContent: 'space-around'
            },
            "& .MuiTabs-indicator": {
              display: 'none'
            },
            "& .Mui-selected":{
              borderBottom: '2px solid',
              color: theme.palette.secondary.main
            }
          })}
        >
        {
          graphicsList.map((button, i) => (
            <Tab key={i} value={button.id} label={button.label} icon={button.icon} />
          ))
        }
        </Tabs>
      }
    </Box>
  )
}


export default GraphicsTabs
