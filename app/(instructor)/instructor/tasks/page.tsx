"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import styled from "styled-components";
import CreateContent from "@/components/modals/CreateContent";
import TaskItem from "@/components/taskItem/TaskItem";
import { plus } from "@/lib/icons";
import Modal from "@/components/modals/ModalLayout";

function Tasks() {
  const { theme, isLoading, openModal, modal, tasks } = useGlobalState();
  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>All Tasks</h1>
      <div className="tasks">
        {tasks.map((task) => {
          return (
            <div className="task" key={task._id}>
              <TaskItem
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                isCompleted={task.isCompleted}
                id={task.id}
              />
            </div>
          );
        })}

        <button className="create-task" onClick={openModal}>
          {plus}
          Add New Task
        </button>
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  width: 100%;
  height: 100%;
  padding: 2rem;
  /* background-color: ${(props) => props.theme.colorBg2}; */
  /* border: 2px solid ${(props) => props.theme.borderColor2}; */
  /* border-radius: 1rem; */

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    margin: 2rem 0;
    display: flex;
    gap: 2rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 800;
    position: relative;

    /* This is the GREEN LINE below h1*/
    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 10%;
      height: 3px;
      background-color: ${(props) => props.theme.colorBg4};
      border-radius: 0%.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 10vw;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
