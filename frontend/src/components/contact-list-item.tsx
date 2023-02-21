import {
  Accordion,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Typography,
  AccordionDetails,
  Divider,
  Button,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ContactListItemHeader } from "./contact-list-item-header";

type TContactListItemProps = {
  name: string;
  phone: string;
  email: string;
  birthday: string;
  data: string;
};

export const ContactListItem = (props: TContactListItemProps) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 2, md: 4 }}
          >
            <Grid item xs={1} sm={1} md={1}>
              <ContactListItemHeader field="Name" value={props.name} />
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <ContactListItemHeader field="Phone" value={props.phone} />
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <ContactListItemHeader field="Email" value={props.email} />
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <ContactListItemHeader field="Birthday" value={props.birthday} />
            </Grid>
          </Grid>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Divider />
        <Box marginTop={1} display="flex" justifyContent="flex-end">
          <Button variant="contained">edit</Button>
        </Box>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{props.data}</ReactMarkdown>
      </AccordionDetails>
    </Accordion>
  );
};
