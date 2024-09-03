
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import StatsTableHead from "./StatsTableHead";
import StatsTableBody from "./StatsTableBody";
import { useFormStore } from "./form/Form.store";
import { Button, TableCell, TableHead, TableRow } from "@mui/material";
import { FileCsv } from "@phosphor-icons/react";

const StatsListView = () => {
  const { result, form } = useFormStore()

  const downloadCsvFile = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    if (result?.cells && result.rows) {
      let cells = result.cells.join(",");
      csvContent += cells + "\r\n";

      result.rows.forEach(function(rowArray) {
          let row = rowArray.join(",");
          csvContent += row + "\r\n";
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${form.title.replaceAll(' ', '_')}.csv`);
    document.body.appendChild(link);

    link.click();
  }
  
  return (
    <Box sx={{ width: "100%" }}>
      {
        result && 
        <TableContainer component={Paper}>
          <Table aria-label="Stats table">
            <TableHead>
              <TableRow>
                <TableCell 
                  size="small" 
                  colSpan={result.cells.length}
                  align="right"
                >
                  <Button 
                    onClick={() => downloadCsvFile()}
                    variant="contained" 
                    endIcon={<FileCsv size={24} />}
                  >
                    Télécharger
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <StatsTableHead headCells={result.cells}/>
            <StatsTableBody rows={result.rows}/>
          </Table>
        </TableContainer>  
      }
    </Box>
  )
}


export default StatsListView
