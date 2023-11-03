import React from "react";
import "./BirthdaysLine.css";
import "../BirthdayForm/BirthdayForm.css";
import { useState } from "react";
import moment from "moment";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { lightBlue, pink } from "@mui/material/colors";
import SelectSex from "../SelectSex/SelectSex";
import SelectRelation from "../SelectRelation/SelectRelation";
import SelectDate from "../SelectDate/SelectDate";
import Avatar from "../Avatar/Avatar";
import { Avatar as MyAvatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@mui/material";
import { new_birthday } from "../../redux/reducer/NewBirthday";
import { useSelector } from "react-redux";

export default function BirthdaysLine(props) {
  const data = props.data;
  const avatarUrl = useSelector(new_birthday);
  const [name, setName] = useState(data.name);
  const [date, setDate] = useState(data.date);
  const [relation, setRelation] = useState(data.relationship);
  const [sex, setSex] = useState(data.sex);
  const [onModify, setOnModify] = useState(false);
  const [deleteSnack, setDeleteSnack] = useState(false);
  const [modifySnack, setModifySnack] = useState(false);
  const [openModalAvatar, setOpenModalAvatar] = useState(false);

  const modifyLine = (e) => {
    e.preventDefault();
    setOnModify(!onModify);
    if (onModify) {
      const updateLineData = {
        ...data,
        name: `${name}`,
        date: `${date}`,
        relationship: `${relation}`,
        sex: `${sex}`,
        avatar: `${avatarUrl.avatarUrl}`,
      };
      fetch("https://api.passion-musique.net/birthday_update.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateLineData),
      });
      setModifySnack(true);
      props.setUpdateTable(!props.updateTable);
    }
  };

  const deleteLine = (id) => {
    fetch("https://api.passion-musique.net/birthday_delete.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    setDeleteSnack(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteSnack(false);
    setModifySnack(false);
  };

  return (
    <>
      <TableRow key={data.name} hover="true" selected={onModify ? true : false}>
        <TableCell align="center" padding="none">
          <div className="list-avatar">
            <MyAvatar
              alt={data.name}
              src={data.avatar}
              className={onModify && "modify-avatar"}
              sx={{
                marginInline: "auto",
                height: "65px",
                width: "65px",
              }}
            />
            {onModify && (
              <Tooltip title="Modifier l'avatar">
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModalAvatar(true);
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
            <Modal
              open={openModalAvatar}
              onClose={() => setOpenModalAvatar(false)}
            >
              <div className="modal-avatar">
                <Avatar setOpenModalAvatar={setOpenModalAvatar} />
              </div>
            </Modal>
          </div>
        </TableCell>
        {onModify ? (
          <TableCell align="center" component="th" scope="row">
            <TextField
              sx={{ bgcolor: "white" }}
              id="outlined-basic"
              label="Nom"
              variant="outlined"
              size="small"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </TableCell>
        ) : (
          <TableCell align="center" component="th" scope="row">
            {data.name}
          </TableCell>
        )}
        {onModify ? (
          <TableCell align="center">
            <SelectDate
              date={moment(date).format("YYYY-MM-DD")}
              setDate={setDate}
            />
          </TableCell>
        ) : (
          <TableCell align="center">
            {moment(data.date).format("DD MMMM YYYY")}
          </TableCell>
        )}
        {onModify ? (
          <TableCell align="center">
            <SelectRelation relation={relation} setRelation={setRelation} />
          </TableCell>
        ) : (
          <TableCell align="center">{data.relationship}</TableCell>
        )}
        {onModify ? (
          <TableCell align="center">
            <SelectSex sex={sex} setSex={setSex} />
          </TableCell>
        ) : (
          <TableCell align="center">{data.sex}</TableCell>
        )}
        <TableCell align="center">
          <Tooltip title="Modifier">
            <IconButton onClick={(e) => modifyLine(e)}>
              <EditIcon sx={{ color: lightBlue[500] }} />
            </IconButton>
          </Tooltip>
          <Snackbar
            open={modifySnack}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert color="info" variant="filled">
              Anniversaire modifié !
            </Alert>
          </Snackbar>
          <Tooltip title="Effacer">
            <IconButton onClick={() => deleteLine(data.id)}>
              <DeleteIcon sx={{ color: pink.A400 }} />
            </IconButton>
          </Tooltip>
          <Snackbar
            open={deleteSnack}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert color="error" variant="filled">
              Anniversaire supprimé !
            </Alert>
          </Snackbar>
        </TableCell>
      </TableRow>
    </>
  );
}
