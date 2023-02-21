import { TextField } from "@mui/material";

type TEditDialogTextField = {
  label: string;
  value?: string;
  setContent: (e: any) => void;
};

export const EditDialogTextField = (props: TEditDialogTextField) => {
  return (
    <TextField
      variant="outlined"
      label={props.label}
      style={{ marginTop: 10 }}
      onChange={props.setContent}
      value={props.value ?? ""}
    />
  );
};
