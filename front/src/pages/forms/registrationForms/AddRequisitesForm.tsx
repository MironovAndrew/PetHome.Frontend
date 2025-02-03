import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormEvent, useState } from "react";

export function addRequisitesForm({
  onSave,
}: {
  onSave: (socials: { link: string }[]) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [socialNetworks, setSocialNetworks] = useState([{ link: "" }]);

  const handleClose = () => {
    setOpen(false);
  };
  function onSubmitAddRequisites(event: FormEvent<HTMLButtonElement>): void {
    console.log(socialNetworks);
    onSave(socialNetworks);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" className="w-full" onClick={handleClickOpen}>
        Добавить реквезиты
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Укажите реквезиты</DialogTitle>
        <DialogContent>
          <TextField
            // autoFocus
            required
            // margin="dense"
            id="phone"
            name="phone"
            label="Номер телефона"
            // type="num"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="submit" onSubmit={onSubmitAddRequisites}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
