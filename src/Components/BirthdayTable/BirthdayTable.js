import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { lightBlue } from "@mui/material/colors";
import BirthdaysLine from "../BirthdaysLine/BirthdaysLine";

export default function BirthdayTable() {
  const [birthdays, setBirthdays] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);

  useEffect(() => {
    const fetchBirthday = async () => {
      const results = await fetch(
        "https://api.passion-musique.net/index.php"
      ).then((response) => response.json());
      setBirthdays(results);
    };
    fetchBirthday();
  }, []);

  return (
    <TableContainer
      sx={{
        maxWidth: 1200,
        marginInline: "auto",
        marginBlock: "1rem",
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{ backgroundColor: lightBlue[500], fontWeight: "bold" }}
          >
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Avatar
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Nom
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Date de naissance
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Relation
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Sexe
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Gerer
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {birthdays.map((row, i) => (
            <BirthdaysLine
              data={row}
              key={`birthday-line-${i}`}
              setUpdateTable={setUpdateTable}
              updateTable={updateTable}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
