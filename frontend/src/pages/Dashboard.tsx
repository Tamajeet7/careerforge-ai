import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Welcome {user?.name}</h2>

      <p>{user?.email}</p>
    </div>
  );
}