import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate, useGetIdentity } from "react-admin";

const IdentityDisplay = () => {
  const { data, isPending, error } = useGetIdentity();

  if (isPending) return <>Loading...</>;
  if (error) return <>Error loading user</>;

  // Una vez cargado, el data object contiene las siguientes propiedades:
  const { id, fullName } = data;

  return (
    <div style={{ padding: '10px', backgroundColor: '#f5f5f5', margin: '10px', borderRadius: '5px' }}>
      <h3>User Identity Info:</h3>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Full Name:</strong> {fullName}</p>
    </div>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout>
    <IdentityDisplay />
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
