import { useEffect, useState } from 'react';
import { extractItems } from '../config';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setTeams(extractItems(data, 'teams')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-4">Loading teams…</p>;
  if (error) return <p className="text-center mt-4 text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mascot</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.mascot ?? '—'}</td>
                <td>
                  {Array.isArray(t.members)
                    ? t.members.map((m) => m.displayName ?? m.username ?? m).join(', ')
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
