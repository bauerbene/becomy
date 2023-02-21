import { Close } from "@mui/icons-material";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  DialogContent,
  Box,
  TextField,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import { AddDialogAppBar } from "./add-dialog-app-bar";
import { AddDialogTextField } from "./add-dialog-text-field";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type TAddDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

type AddContactRequest = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  birthday?: string;
  additional_data?: string;
};

export const AddDialog = (props: TAddDialogProps) => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [additionalData, setAdditionalData] = useState<string>();

  const handleClose = (open: boolean) => {
    if (!open) {
      setFirstName(undefined);
      setLastName(undefined);
      setPhone(undefined);
      setEmail(undefined);
      setBirthday(undefined);
      setAdditionalData(undefined);
    }
    props.setIsOpen(open);
  };

  const handleSave = () => {
    const addRequest: AddContactRequest = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      birthday: birthday,
      additional_data: additionalData,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(addRequest),
    };
    fetch("http://localhost:8080/api/contact/add", requestOptions).then(
      (response) => console.log(response.json())
    );
  };

  return (
    <Dialog open={props.isOpen} fullScreen TransitionComponent={Transition}>
      <AddDialogAppBar setIsOpen={handleClose} handleSave={handleSave} />
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <AddDialogTextField
            label="First Name"
            setContent={(e) => setFirstName(e.target.value)}
          />
          <AddDialogTextField
            label="Last Name"
            setContent={(e) => setLastName(e.target.value)}
          />
          <AddDialogTextField
            label="Phone"
            setContent={(e) => setPhone(e.target.value)}
          />
          <AddDialogTextField
            label="Email"
            setContent={(e) => setEmail(e.target.value)}
          />
          <AddDialogTextField
            label="Birthday"
            setContent={(e) => setBirthday(e.target.value)}
          />

          <TextField
            multiline
            variant="outlined"
            label="Additional data"
            minRows={10}
            style={{ marginTop: 10 }}
            onChange={(e) => setAdditionalData(e.target.value)}
          ></TextField>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
