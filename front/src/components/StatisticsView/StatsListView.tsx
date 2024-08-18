
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import StatsTableHead from "./StatsTableHead";
import StatsTableBody from "./StatsTableBody";


const headCells = [
  "Année",
  "Prénom",
  "Genre",
  "Naissances"
]

const rows = [
  [
    1996,
    "Youva",
    "M",
    4534
  ],
  [
    2018,
    "Manon",
    "F",
    6456
  ],
  [
    2018,
    "Miguel",
    "M",
    8756
  ]
]


const StatsListView = () => {

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <StatsTableHead headCells={headCells}/>
          <StatsTableBody rows={rows}/>
        </Table>
      </TableContainer>  
    </Box>
  )
}


export default StatsListView
