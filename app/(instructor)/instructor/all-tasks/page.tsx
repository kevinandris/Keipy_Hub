"use client";
import Tasks from "@/components/tasks/Tasks";
import { useGlobalState } from "@/app/context/globalProvider";

const AllTasks = () => {
  const { tasks } = useGlobalState();
  return <Tasks title="Your Tasks" tasks={tasks} />;
};

export default AllTasks;
