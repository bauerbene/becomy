import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContactQuery } from "../query/use-contact-query";
import { ContactListItem } from "./contact-list-item";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { AddDialog } from "./add-dialog";

export const ContactList = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isLoading, error, data } = useContactQuery();

  const tabellentest =
    "| bla | bla | bla |\n|---|---|---|\n| val1 | val2 | val3 |\n| val4 | val5 | val6 |";

  return (
    <Box>
      {!isLoading &&
        !error &&
        data?.map((contact) => (
          <ContactListItem
            key={contact.id}
            name={contact.first_name ?? "-"}
            phone={contact.phone ?? "-"}
            email={contact.email ?? "-"}
            birthday={contact.birthday ?? "-"}
            data={contact.additional_data ?? ""}
          />
        ))}
      <ContactListItem
        key="1234"
        name="fix"
        phone="fix"
        email="fix"
        birthday="fix"
        data={tabellentest}
      />
      <Button
        variant="contained"
        style={{ marginTop: 10 }}
        onClick={() => setIsAddDialogOpen(true)}
      >
        Add
      </Button>
      <AddDialog isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} />
    </Box>
  );
};
