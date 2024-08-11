import { Typography } from "@mui/material";
import Plot from 'react-plotly.js';
import { useGraphics } from "./Graphics.hook";
import { Data } from "plotly.js";

export interface IGraphics{
    selectedGraphicId: string | null
}

const Graphics = ({ selectedGraphicId }: IGraphics) => {
    const {
        isMobileScreen,
        dataExample,
        form,
        result
      } = useGraphics()

    if (!selectedGraphicId) {
        return(
          <Typography variant="body2" gutterBottom>Veuillez sélectioner un graphique</Typography>
        );
    }

    return (
        <Plot
          data={result ? result['data'] as Data[] : dataExample[selectedGraphicId] as Data[]}
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


export default Graphics
