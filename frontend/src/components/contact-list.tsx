import { Box } from "@mui/material";
import { useContactQuery } from "../query/use-contact-query";
import { ContactListItem } from "./contact-list-item";

export const ContactList = () => {
  const test = "# Hello markdown\n\n---\n\nbal\n1. bal\n2. bla";

  const { isLoading, error, data } = useContactQuery();

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
            birthday="-"
            data={test}
          />
        ))}
    </Box>
  );
};
