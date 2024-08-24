import { Stack } from "@mui/material";
import Plot from 'react-plotly.js';
import { useGraphics } from "./Graphics.hook";
import { Data } from "plotly.js";
import GraphicsTabs from "@components/StatisticsView/Graphics/GraphicsTabs/GraphicsTabs";

export interface IGraphics{
    selectedGraphicId: string | null
}

const Graphics = () => {
    const {
        isMobileScreen,
        dataExample,
        form,
        result,
        selectedButtonId,
        onSelectedButtonId
      } = useGraphics()

    return (
      <Stack
        width="100%"
        flexDirection='column'
        gap={2}
      >
        <GraphicsTabs selectedButtonId={selectedButtonId} onHandleClick={onSelectedButtonId} />
        {
          selectedButtonId && (
            <Plot
              data={result ? result['data'] as Data[] : dataExample[selectedButtonId] as Data[]}
              layout={ 
                { 
                  width: isMobileScreen ? 300 : 0, 
                  title: form.title,
                  ...(result && result['layout'])
                } as Partial<Plotly.Layout>
              }
            />
          )
        }
      </Stack>
      )
}


export default Graphics
