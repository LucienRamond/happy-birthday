import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectRelation(props) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120, margin: "0" }} size="small">
      <InputLabel label="Relation" id="select-relation">
        Relation
      </InputLabel>
      <Select
        sx={{ bgcolor: "white" }}
        labelId="select-relation"
        id="select-sex"
        value={props.relation}
        label="Relation"
        onChange={(e) => props.setRelation(e.target.value)}
      >
        <MenuItem value={"moi"}>Moi</MenuItem>
        <MenuItem value={"papa"}>Papa</MenuItem>
        <MenuItem value={"maman"}>Maman</MenuItem>
        <MenuItem value={"frere"}>Frère</MenuItem>
        <MenuItem value={"soeur"}>Soeur</MenuItem>
        <MenuItem value={"papy"}>Papy</MenuItem>
        <MenuItem value={"mamie"}>Mamie</MenuItem>
        <MenuItem value={"tonton"}>Tonton</MenuItem>
        <MenuItem value={"tatie"}>Tatie</MenuItem>
        <MenuItem value={"cousin"}>Cousin</MenuItem>
        <MenuItem value={"cousine"}>Cousine</MenuItem>
        <MenuItem value={"copain"}>Copain</MenuItem>
        <MenuItem value={"copine"}>Copine</MenuItem>
      </Select>
    </FormControl>
  );
}
