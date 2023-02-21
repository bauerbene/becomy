import { Delete, Edit } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Box,
  Grid,
  AccordionDetails,
  Divider,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useQueryClient } from "react-query";
import remarkGfm from "remark-gfm";
import { AddDialog } from "./add-dialog";
import { ContactListItemHeader } from "./contact-list-item-header";

type TContactListItemProps = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthday: string;
  data: string;
};

export const ContactListItem = (props: TContactListItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDelete = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch(
      `http://localhost:8080/api/contact/delete/${props.id}`,
      requestOptions
    )
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["contactQuery"] });
        enqueueSnackbar("Successfully deleted the contact", {
          variant: "success",
          autoHideDuration: 3000,
        });
      })
      .catch(() => {
        enqueueSnackbar("Failed to delete the contact", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <Box>
      <Accordion>
        <AccordionSummary>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 1, sm: 2, md: 4 }}
            >
              <Grid item xs={1} sm={1} md={1}>
                <ContactListItemHeader
                  field="Name"
                  value={`${props.firstName} ${props.lastName}`}
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <ContactListItemHeader field="Phone" value={props.phone} />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <ContactListItemHeader field="Email" value={props.email} />
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <ContactListItemHeader
                  field="Birthday"
                  value={props.birthday}
                />
              </Grid>
            </Grid>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Box marginTop={1} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => setIsEditDialogOpen(true)}
              endIcon={<Edit />}
            >
              edit
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              variant="contained"
              color="error"
              endIcon={<Delete />}
              onClick={() => handleDelete()}
            >
              delete
            </Button>
          </Box>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {props.data}
          </ReactMarkdown>
        </AccordionDetails>
      </Accordion>
      <AddDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        first_name={props.firstName}
        last_name={props.lastName}
        phone={props.phone}
        email={props.email}
        birthday={props.birthday}
        additional_data={props.data}
        id={props.id}
      />
    </Box>
  );
};
