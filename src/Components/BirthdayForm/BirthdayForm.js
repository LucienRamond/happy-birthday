import * as React from "react";
import "./BirthdayForm.css";
import Accordion from "@mui/material/Accordion";
import { Modal } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import { lightBlue } from "@mui/material/colors";
import SelectRelation from "../SelectRelation/SelectRelation";
import SelectDate from "../SelectDate/SelectDate";
import SelectSex from "../SelectSex/SelectSex";
import Avatar from "../Avatar/Avatar";
import Button from "@mui/material/Button";
import { new_birthday } from "../../redux/reducer/NewBirthday";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function BasicAccordion() {
  const user = useSelector(new_birthday);
  const [openModalAvatar, setOpenModalAvatar] = useState(false);
  const [name, setName] = useState(user.name);
  const [date, setDate] = useState(user.birth);
  const [relation, setRelation] = useState(user.relationship);
  const [sex, setSex] = useState(user.sex);
  const [openSnack, setOpenSnack] = useState(false);

  const addNewBirthday = (e) => {
    e.preventDefault();
    const data = {
      ...user,
      name: `${name}`,
      birth: `${date}`,
      relationship: `${relation}`,
      sex: `${sex}`,
    };

    fetch("https://api.passion-musique.net/birthday_insert.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
      mode: "no-cors",
    });
    setOpenSnack(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        marginInline: "auto",
        marginBlock: "1rem",
      }}
    >
      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: lightBlue[500],
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: "600" }}>
            Ajouter un anniversaire
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="b-form">
          <div>
            <div className="b-avatar">
              <img src={user.avatarUrl} alt="avatar" />
            </div>
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setOpenModalAvatar(true);
              }}
            >
              Modifier mon avatar
            </Button>
          </div>
          <div>
            <TextField
              label="Nom"
              variant="outlined"
              size="small"
              onChange={(e) => setName(e.target.value)}
            ></TextField>
            <SelectRelation relation={relation} setRelation={setRelation} />
            <div>
              <p>Date de naissance :</p>
              <SelectDate
                date={moment(date).format("YYYY-MM-DD")}
                setDate={setDate}
              />
            </div>

            <SelectSex sex={sex} setSex={setSex} />
            <Button variant="contained" onClick={addNewBirthday}>
              Ajouter à mes anniversaires
            </Button>
          </div>

          <Modal
            open={openModalAvatar}
            onClose={() => setOpenModalAvatar(false)}
          >
            <div className="modal-avatar">
              <Avatar setOpenModalAvatar={setOpenModalAvatar} />
            </div>
          </Modal>
        </AccordionDetails>
      </Accordion>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled">Anniversaire ajouté avec succés !</Alert>
      </Snackbar>
    </div>
  );
}
