import React, { useState, useEffect } from 'react'
import { getStats } from '../../services/stats';
import {
  BookOpen,
  BookMarked,
  BookCheck,
  Star,
  FileText,
  Calendar,
} from "lucide-react";
import StatCard from '../../Components/Profile/StatCard';
import AuthorsBreakdown from '../../Components/Profile/AuthorsBreakdown';

function Stats() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {

        const data = await getStats();
        setStats(data);

      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchStats()

  }, [])

  if (!stats) {
    return <div>Loading stats...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          title="Total Books"
          value={stats?.totalBooks ?? 0}
          icon={BookOpen}
          color="#B08DFF"
        />

        <StatCard
          title="Want To Read"
          value={stats?.wantToRead ?? 0}
          icon={BookMarked}
          color="#F6B6D1"
        />

        <StatCard
          title="Finished"
          value={stats?.finished ?? 0}
          icon={BookCheck}
          color="#E7C66D"
        />

        <StatCard
          title="Pages Read"
          value={stats?.totalPagesRead ?? 0}
          icon={FileText}
          color="#A78BFA"
        />

        <StatCard
          title="Average Rating"
          value={stats?.avgRating?.toFixed(1) ?? "0.0"}
          icon={Star}
          color="#FBBF24"
        />

        <StatCard
          title="Finished This Year"
          value={stats?.booksFinishedThisYear ?? 0}
          icon={Calendar}
          color="#C084FC"
        />

      </div>

      <div className="mt-8 sm:mt-10">
        <AuthorsBreakdown authors={stats.authorsBreakdown} />
      </div>
    </div>
  )
}

export default Stats