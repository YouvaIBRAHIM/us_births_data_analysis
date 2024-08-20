
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import StatsTableHead from "./StatsTableHead";
import StatsTableBody from "./StatsTableBody";
import { useFormStore } from "./form/Form.store";

const StatsListView = () => {
  const { result } = useFormStore()
  return (
    <Box sx={{ width: "100%" }}>
      {
        result && 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <StatsTableHead headCells={result.cells}/>
            <StatsTableBody rows={result.rows}/>
          </Table>
        </TableContainer>  
      }
    </Box>
  )
}


export default StatsListView
