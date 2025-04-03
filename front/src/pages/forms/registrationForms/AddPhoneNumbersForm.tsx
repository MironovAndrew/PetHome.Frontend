import { Delete } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";

export function AddPhoneNumbersForm({
  onSave,
}: {
  onSave: (numbers: { phone: string }[]) => void;
}) {
  const [phoneNumbers, setPhoneNumbers] = useState([{ phone: "" }]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    onSave(phoneNumbers);
    return phoneNumbers;
  };

  const onAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { phone: "" }]);
  };
  const onRemovePhoneNumber = (index: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
  };
  const onChangePhoneNumbers = (index: number, value: string) => {
    const updatedPhoneNumbers = phoneNumbers.map((phone, i) =>
      i === index ? { ...phone, ["phone"]: value } : phone
    );
    setPhoneNumbers(updatedPhoneNumbers);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" className="w-full" onClick={handleClickOpen}>
        Добавить номера телефонов
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
        <DialogTitle>Укажите номера телефонов</DialogTitle>
        <DialogContent>
          {phoneNumbers.map((phone, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
              <TextField
                label="Номер телефона"
                value={phone["phone"]}
                onChange={(e) => onChangePhoneNumbers(index, e.target.value)}
                fullWidth
                variant="outlined"
              />

              <IconButton onClick={() => onRemovePhoneNumber(index)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
        </DialogContent>
        <Button variant="outlined" onClick={onAddPhoneNumber}>
          Добавить номер телефона
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
