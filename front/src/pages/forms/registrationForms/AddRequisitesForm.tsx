import { Delete } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { requisite } from "../../../models/dtos/Requisite";

export function AddRequisitesForm({
  onSave,
}: {
  onSave: (requisites: requisite[]) => void;
}) {
  const [requisites, setRequisites] = useState<requisite[]>([]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    onSave(requisites);
    return requisites;
  };

  const onAddRequisite = () => {
    setRequisites([...requisites, { Desc: "", Name: "", PaymentMethod: "" }]);
  };
  const onRemoveRequisite = (index: number) => {
    setRequisites(requisites.filter((_, i) => i !== index));
  };

  return (
    <React.Fragment>
      <Button variant="outlined" fullWidth onClick={handleClickOpen}>
        Добавить реквезиты
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>Укажите реквезиты</DialogTitle>
        <DialogContent>
          {requisites.map((requisite, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              className="gap-4 pt-2"
            >
              <TextField
                label="Название"
                value={requisite.Name}
                onChange={(e) => {
                  const updatedRequisites = [...requisites];
                  updatedRequisites[index].Name = e.target.value;
                  setRequisites(updatedRequisites);
                }}
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Описание"
                value={requisite.Desc}
                onChange={(e) => {
                  const updatedRequisites = [...requisites];
                  updatedRequisites[index].Desc = e.target.value;
                  setRequisites(updatedRequisites);
                }}
                fullWidth
                variant="outlined"
              />

              <Select
                label="Тип платежа"
                fullWidth
                defaultValue={"1"}
                onChange={(e) => {
                  const updatedRequisites = [...requisites];
                  updatedRequisites[index].PaymentMethod = e.target.value;
                  setRequisites(updatedRequisites);
                }}
              >
                <MenuItem value={"1"}>Карта</MenuItem>
                <MenuItem value={"2"}>Наличные</MenuItem>
              </Select>

              <IconButton onClick={() => onRemoveRequisite(index)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
        </DialogContent>
        <Button variant="outlined" onClick={onAddRequisite}>
          Добавить реквезит
        </Button>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button variant="contained" onClick={handleSave}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
