import { useEffect, useState } from 'react';
import { API_BASE, extractItems } from '../config';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/users/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setUsers(extractItems(data, 'users')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-4">Loading users…</p>;
  if (error) return <p className="text-center mt-4 text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Display Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.displayName}</td>
                <td>{u.username}</td>
                <td>{u.email ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
