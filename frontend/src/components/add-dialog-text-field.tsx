import { TextField } from "@mui/material";

type TAddDialogTextField = {
  label: string;
  setContent: (e: any) => void;
};

export const AddDialogTextField = (props: TAddDialogTextField) => {
  return (
    <TextField
      variant="outlined"
      label={props.label}
      style={{ marginTop: 10 }}
      onChange={props.setContent}
    ></TextField>
  );
};
