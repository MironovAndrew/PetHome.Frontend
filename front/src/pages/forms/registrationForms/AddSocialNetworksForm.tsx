import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormEvent, useState } from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";

export function addSocialNetworksForm({
  onSave,
}: {
  onSave: (socials: { link: string }[]) => void;
}) {
  const [socialNetworks, setSocialNetworks] = useState([{ link: "" }]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    onSave(socialNetworks);
    return socialNetworks;
  };

  const onAddSocialNetwork = () => {
    setSocialNetworks([...socialNetworks, { link: "" }]);
  };
  const onRemoveSocialNetwork = (index: number) => {
    setSocialNetworks(socialNetworks.filter((_, i) => i !== index));
  };
  const onChangeSocialNetwork = (index: number, value: string) => {
    const updatedSocialNetwork = socialNetworks.map((social, i) =>
      i === index ? { ...social, ["link"]: value } : social
    );
    setSocialNetworks(updatedSocialNetwork);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" className="w-full" onClick={handleClickOpen}>
        Добавить социальные сети
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
        <DialogTitle>Укажите социальные сети</DialogTitle>
        <DialogContent>
          {socialNetworks.map((social, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
              <TextField
                label="Url"
                value={social["link"]}
                onChange={(e) => onChangeSocialNetwork(index, e.target.value)}
                fullWidth
                variant="outlined"
              />

              <IconButton onClick={() => onRemoveSocialNetwork(index)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
        </DialogContent>
        <Button variant="outlined" onClick={onAddSocialNetwork}>
          Добавить социальную сеть
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
