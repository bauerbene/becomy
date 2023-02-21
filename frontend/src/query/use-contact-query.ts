import { useQuery } from "react-query";

type TContactsResponse = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
};

export const useContactQuery = () => {
  const { isLoading, error, data } = useQuery<TContactsResponse[]>(
    "contactQuery",
    () => fetch("http://localhost:8080/api/contact").then((res) => res.json())
  );

  return { isLoading, error, data };
};
