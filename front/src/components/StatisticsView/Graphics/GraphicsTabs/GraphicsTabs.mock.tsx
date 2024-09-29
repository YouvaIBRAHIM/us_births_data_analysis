import { ChartBar, ChartBarHorizontal, ChartLine, ChartPie, ChartScatter, ProhibitInset, SquaresFour } from "@phosphor-icons/react"
import { IGraphicsTabsItem } from '@components/StatisticsView/Graphics/GraphicsTabs/IGraphicsTabs'


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
  {
    id: "heat",
    label: "Heatmap",
    icon: <SquaresFour size={24} />,
    options: {
      type: 'heat',
    }
  },
]

