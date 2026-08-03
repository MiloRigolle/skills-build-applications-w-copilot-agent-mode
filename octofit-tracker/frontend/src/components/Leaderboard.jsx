import { useEffect, useState } from 'react';
import { API_BASE, extractItems } from '../config';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setEntries(extractItems(data, 'leaderboard')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-4">Loading leaderboard…</p>;
  if (error) return <p className="text-center mt-4 text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <p>No leaderboard data found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e._id}>
                <td>{e.rank}</td>
                <td>{e.user?.displayName ?? e.user?.username ?? '—'}</td>
                <td>{e.team?.name ?? '—'}</td>
                <td>{e.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
