import { ChartBar, ChartBarHorizontal, ChartLine, ChartPie, ChartScatter } from "@phosphor-icons/react"
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
    id: "pie",
    label: "Diagramme en Secteurs",
    icon: <ChartPie size={24} />,
    options: {
      type: 'pie',
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
  }
]

const GraphicsTabs = ({selectedButtonId, onHandleClick}: IGraphicsTabs) => {
  const { isOpen } = useSideBar()
  const {cleanForm} = useGraphicFormStore()

  useEffect(() => {
    onHandleClick(graphicsList[0].id)
  }, [])

  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: any) => {
    onHandleClick(value)
    if (["pie", "scatter"].includes(value)) {
      cleanForm()
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
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: 'space-around'
            },
            "& .MuiTabs-indicator": {
              display: 'none'
            },
            "& .Mui-selected":{
              borderBottom: '2px solid'
            }
          }}
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
