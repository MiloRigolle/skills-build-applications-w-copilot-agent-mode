import { useEffect, useState } from 'react';
import { API_BASE, extractItems } from '../config';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/workouts/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setWorkouts(extractItems(data, 'workouts')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-4">Loading workouts…</p>;
  if (error) return <p className="text-center mt-4 text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Difficulty</th>
              <th>Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((w) => (
              <tr key={w._id}>
                <td>{w.title}</td>
                <td>{w.description ?? '—'}</td>
                <td>{w.difficulty ?? '—'}</td>
                <td>{w.duration ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
