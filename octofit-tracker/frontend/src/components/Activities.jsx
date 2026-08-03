import { useEffect, useState } from 'react';
import { extractItems } from '../config';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setActivities(extractItems(data, 'activities')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-4">Loading activities…</p>;
  if (error) return <p className="text-center mt-4 text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Team</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a) => (
              <tr key={a._id}>
                <td>{a.user?.displayName ?? a.user?.username ?? '—'}</td>
                <td>{a.team?.name ?? '—'}</td>
                <td>{a.activityType}</td>
                <td>{a.duration}</td>
                <td>{a.caloriesBurned ?? '—'}</td>
                <td>{a.completedAt ? new Date(a.completedAt).toLocaleDateString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
