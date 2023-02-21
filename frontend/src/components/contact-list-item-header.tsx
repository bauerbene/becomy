import { Paper, Typography } from "@mui/material";

type TContactListItemHeaderProps = {
  field: string;
  value: string;
};

export const ContactListItemHeader = (props: TContactListItemHeaderProps) => {
  return (
    <Paper elevation={0}>
      <Typography variant="overline">{props.field}</Typography>
      <Typography>{props.value}</Typography>
    </Paper>
  );
};
