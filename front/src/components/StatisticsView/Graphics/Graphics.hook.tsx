import { Theme, useMediaQuery } from "@mui/material";
import { colors } from "@src/services/constants.service";
import { useColorMode } from "@src/stores/theme.store";
import { graphicsList } from "@components/Graphics/GraphicsTabs/GraphicsTabs";
import { useFormStore } from "@components/StatisticsView/form/Form.store";
import { useState } from "react";

export const useGraphics = () => {
  const {form, result} = useFormStore()
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null)

  const onSelectedButtonId = (id: string | null) => {
    setSelectedButtonId(id)
  }

  const isMobileScreen = useMediaQuery((theme: Theme) =>
      theme.breakpoints.down("sm"),
      )

  const {colorMode} = useColorMode()

  const findGraphicsListIndex = (id: string) => {
      return graphicsList.findIndex(graph => graph.id === id)
  }

  const dataExample: {[key: string]: unknown} = {
      'bar': [
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            marker: {color: colors[colorMode].primary.main},
            ...(graphicsList[findGraphicsListIndex('bar')]?.options ?? {})
          }
      ],
      'h-bar': [
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            marker: {color: colors[colorMode].primary.main},
            ...(graphicsList[findGraphicsListIndex('h-bar')]?.options ?? {})
          }
      ],
      'line': [
          {
            x: [1, 2, 3, 4],
            y: [2, 6, 3, 4],
            mode: 'lines',
            marker: {color: colors[colorMode].primary.main},
            ...(graphicsList[findGraphicsListIndex('line')]?.options ?? {})
          },
          {
            x: [1, 2, 3, 4],
            y: [3, 7, 2, 5],
            mode: 'lines',
            marker: {color: colors[colorMode].secondary.main},
            ...(graphicsList[findGraphicsListIndex('line')]?.options ?? {})
          }
      ],
      'scatter': [
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            marker: {color: colors[colorMode].primary.main},
            ...(graphicsList[findGraphicsListIndex('scatter')]?.options ?? {})
          },
          {
              x: [4, 7, 9],
              y: [5, 1, 4],
              marker: {color: colors[colorMode].secondary.main},
              ...(graphicsList[findGraphicsListIndex('scatter')]?.options ?? {})
          }
      ],
      'pie': [
          {
            values: [19, 26, 55],
            labels: ['Prop 1', 'Prop 2', 'Prop 3'],
            ...(graphicsList[findGraphicsListIndex('pie')]?.options ?? {})
          }
      ],
  }

  return {
    isMobileScreen,
    dataExample,
    form,
    result,
    selectedButtonId,
    onSelectedButtonId
  }
}

