import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSex(props) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120, margin: "0" }} size="small">
      <InputLabel id="select-small-label">Sexe</InputLabel>
      <Select
        sx={{ bgcolor: "white" }}
        labelId="select-small-label"
        id="select-sex"
        value={props.sex}
        label="Sexe"
        onChange={(e) => props.setSex(e.target.value)}
      >
        <MenuItem value={"F"}>Fille</MenuItem>
        <MenuItem value={"M"}>Garçon</MenuItem>
      </Select>
    </FormControl>
  );
}
