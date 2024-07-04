"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import Tasks from "../../../../components/tasks/Tasks";

const page = () => {
  const { incompleteTasks } = useGlobalState();
  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
};

export default page;
