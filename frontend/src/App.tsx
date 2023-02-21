import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContactList } from "./components/contact-list/contact-list";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <ContactList />
      </SnackbarProvider>
    </QueryClientProvider>
  );
};
