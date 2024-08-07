import { Typography } from "@mui/material";
import Plot from 'react-plotly.js';
import { useGraphics } from "./Graphics.hook";

export interface IGraphics{
    selectedGraphicId: string | null
}

const Graphics = ({ selectedGraphicId }: IGraphics) => {
    const {
        isMobileScreen,
        dataExample,
        form
      } = useGraphics()

    if (!selectedGraphicId) {
        return(
          <Typography variant="body2" gutterBottom>Veuillez sélectioner un graphique</Typography>
        );
    }

    return (
        <Plot
          data={dataExample[selectedGraphicId]}
          layout={ {width: isMobileScreen ? 300 : 0, title: form.title} as Partial<Plotly.Layout> }
        />
      )
}


export default Graphics
