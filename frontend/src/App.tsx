import { QueryClient, QueryClientProvider } from "react-query";
import { ContactList } from "./components/contact-list";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContactList />
    </QueryClientProvider>
  );
};
