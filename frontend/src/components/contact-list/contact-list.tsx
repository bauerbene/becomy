import { Box, Button } from "@mui/material";
import { ContactListItem } from "./contact-list-item";
import { useState } from "react";
import { useContactQuery } from "../../query/use-contact-query";
import { EditDialog } from "../edit-dialog/edit-dialog";

export const ContactList = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isLoading, error, data } = useContactQuery();

  return (
    <Box>
      {!isLoading &&
        !error &&
        data?.map((contact) => (
          <ContactListItem
            key={contact.id}
            id={contact.id}
            firstName={contact.first_name ?? "-"}
            lastName={contact.last_name ?? "-"}
            phone={contact.phone ?? "-"}
            email={contact.email ?? "-"}
            birthday={contact.birthday ?? "-"}
            data={contact.additional_data ?? ""}
          />
        ))}
      <Button
        variant="contained"
        style={{ marginTop: 10 }}
        onClick={() => setIsAddDialogOpen(true)}
      >
        Add
      </Button>
      <EditDialog isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} />
    </Box>
  );
};
