import prisma from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div style={{ padding: "50px" }}>
      <h1>Users from Database</h1>
      {users.length === 0 ? (
        <p>No users yet. The database is empty!</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.name} ({u.email})</li>
          ))}
        </ul>
      )}
    </div>
  );
}