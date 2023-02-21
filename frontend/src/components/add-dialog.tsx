import { Dialog, DialogContent, Box, TextField, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
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
  id?: number;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  birthday?: string;
  additional_data?: string;
};

type AddContactRequest = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  birthday?: string;
  additional_data?: string;
};

type UpdateContactRequest = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  birthday?: string;
  additional_data?: string;
};

export const AddDialog = (props: TAddDialogProps) => {
  const [firstName, setFirstName] = useState(props.first_name);
  const [lastName, setLastName] = useState(props.last_name);
  const [phone, setPhone] = useState(props.phone);
  const [email, setEmail] = useState(props.email);
  const [birthday, setBirthday] = useState(props.birthday);
  const [additionalData, setAdditionalData] = useState(props.additional_data);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

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
    const api_path = props.id
      ? `/api/contact/update/${props.id}`
      : "/api/contact/add";
    const request: AddContactRequest | UpdateContactRequest = props.id
      ? ({
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          email: email,
          birthday: birthday,
          additional_data: additionalData,
        } as UpdateContactRequest)
      : ({
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          email: email,
          birthday: birthday,
          additional_data: additionalData,
        } as AddContactRequest);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(request),
    };
    fetch(`http://localhost:8080${api_path}`, requestOptions)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["contactQuery"] });
        handleClose(false);
        enqueueSnackbar("Saved contact", {
          variant: "success",
          autoHideDuration: 3000,
        });
      })
      .catch(() => {
        handleClose(false);
        enqueueSnackbar("An error occured saving the contact", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <Dialog open={props.isOpen} fullScreen TransitionComponent={Transition}>
      <AddDialogAppBar setIsOpen={handleClose} handleSave={handleSave} />
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <AddDialogTextField
            label="First Name"
            setContent={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <AddDialogTextField
            label="Last Name"
            setContent={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <AddDialogTextField
            label="Phone"
            setContent={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <AddDialogTextField
            label="Email"
            setContent={(e) => setEmail(e.target.value)}
            value={email}
          />
          <AddDialogTextField
            label="Birthday"
            setContent={(e) => setBirthday(e.target.value)}
            value={birthday}
          />

          <TextField
            multiline
            variant="outlined"
            label="Additional data"
            minRows={10}
            style={{ marginTop: 10 }}
            onChange={(e) => setAdditionalData(e.target.value)}
            value={additionalData}
          ></TextField>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
