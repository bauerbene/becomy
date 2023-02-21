import { Close } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";

type TAddDialogAppBarProps = {
  setIsOpen: (open: boolean) => void;
  handleSave: () => void;
};

export const AddDialogAppBar = (props: TAddDialogAppBarProps) => {
  return (
    <AppBar sx={{ position: "relative" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={() => props.setIsOpen(false)}
        >
          <Close />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Add Contact
        </Typography>
        <Button
          autoFocus
          color="inherit"
          variant="outlined"
          onClick={() => props.handleSave()}
        >
          save
        </Button>
      </Toolbar>
    </AppBar>
  );
};
