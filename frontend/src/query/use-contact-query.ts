import { useQuery } from "react-query";

export type TContactsResponse = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  birthday: string;
  additional_data: string;
};

export const useContactQuery = () => {
  const { isLoading, error, data } = useQuery<TContactsResponse[]>(
    "contactQuery",
    () => fetch("http://localhost:8080/api/contact").then((res) => res.json())
  );

  return { isLoading, error, data };
};
