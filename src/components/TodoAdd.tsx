"use client";
import { useUploadFileMutation } from "@/redux/api/file";
import { usePostTodoMutation } from "@/redux/api/todo";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./TodoAdd.css"

const TodoAdd = () => {
  const [postTodoMutation] = usePostTodoMutation();
  const [uploadFileMutation] = useUploadFileMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);
    const { data: responseImage } = await uploadFileMutation(formData);
    const newData = {
      title: data.title,
      description: data.description,
      img: responseImage?.url!,
    };
    await postTodoMutation(newData);
  };

  return (
    <div>
      <h1>TodoAdd</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="title"
          type="text"
          {...register("title", { required: true })}
        />
        <input
          placeholder="description"
          type="text"
          {...register("description", { required: true })}
        />
        <input type="file" {...register("file", { required: true })} />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default TodoAdd;
