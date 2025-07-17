import React from "react";

const activities = [
  { id: 1, time: "9:30 AM", action: "Quotation #2356 approved by client." },
  { id: 2, time: "10:00 AM", action: "Site visit scheduled for Project A." },
  { id: 3, time: "11:15 AM", action: "Structural drawing updated by Engineer K." },
  { id: 4, time: "1:45 PM", action: "New material purchase order raised." },
];

const ActivityFeed = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 max-w-xl mx-auto my-6">
      <h2 className="text-xl font-bold mb-4 text-center">Activity Feed</h2>
      <ul className="space-y-3 max-h-60 overflow-y-auto">
        {activities.map((activity) => (
          <li key={activity.id} className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
            <p className="text-gray-800 dark:text-white">{activity.action}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
