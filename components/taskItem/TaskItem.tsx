"use client";

import FormatDate from "@/lib/formatDate";
import styled from "styled-components";
import { edit, trash } from "@/lib/icons";
import { useGlobalState } from "@/app/context/globalProvider";
import { Trash } from "lucide-react";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

// This function
function TaskItem({ title, description, date, isCompleted, id }: Props) {
  const { theme, deleteTask, updateTask, todoData } = useGlobalState();
  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{FormatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
          >
            Incomplete
          </button>
        )}

        <button
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          <Trash />
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.colorPurple};

  width: 10vw;
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    gap: 1.2rem;
    align-items: center;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .delete {
      margin-left: auto;

      &:hover {
        color: ${(props) => props.theme.colorDanger};
      }
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark};
    }
  }
`;

export default TaskItem;
