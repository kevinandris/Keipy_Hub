"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "@/components/button/Button";
import { plus } from "@/lib/icons";

function CreateContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const { theme, allTasks, closeModal } = useGlobalState();

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (!res.data.error) {
        toast.success("Task Created successfully");
        allTasks();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          value={title}
          type="text"
          id="title"
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g, Learn Next.js"
        />
      </div>

      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          id="description"
          name="description"
          rows={4}
          onChange={handleChange("description")}
          placeholder="e.g, You should learn Next.js to build a website."
        ></textarea>
      </div>

      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          value={date}
          id="date"
          type="date"
          name="date"
          onChange={handleChange("date")}
        />
      </div>

      <div className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          value={completed.toString()}
          id="completed"
          type="checkbox"
          name="completed"
          onChange={handleChange("completed")}
        />
      </div>

      <div className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          value={important.toString()}
          id="important"
          type="checkbox"
          name="important"
          onChange={handleChange("important")}
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Create Task"
          icon={plus}
          padding={"0.8rem 2.4rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          color={theme.colorGrey1}
          background={theme.colorPurple1}
        />
      </div>
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    input,
    textarea {
      width: 100%;
      border: none;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;
    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background-color: ${(props) => props.theme.colorPurple} !important;
      color: ${(props) => props.theme.colorPurple1} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent;
