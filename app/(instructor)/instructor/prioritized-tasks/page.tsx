"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import Tasks from "../../../../components/tasks/Tasks";

const page = () => {
  const { prioritizedTasks } = useGlobalState();
  return <Tasks title="Prioritized Tasks" tasks={prioritizedTasks} />;
};

export default page;
