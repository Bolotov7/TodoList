"use client";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "@/redux/api/todo";
import Image from "next/image";
import React, { useState } from "react";
import "./TodoList.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadFileMutation } from "@/redux/api/file";

interface IFormInput {
  title: string;
  description: string;
  file: string[];
}

const TodoList = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const { data } = useGetTodosQuery();
  const [editTodoMutation] = useEditTodoMutation();
  const [uploadFileMutation] = useUploadFileMutation();
  const [deleteItem] = useDeleteTodoMutation();
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);

    const { data: responseImage } = await uploadFileMutation(formData);

    const updateData = {
      title: data.title,
      description: data.description,
      img: responseImage?.url!,
    };
    await editTodoMutation({ _id: editId!, data: updateData });
    setEditId(null);
  };


  const handleDelete = async (_id: number) => {
    try {
      await deleteItem(_id).unwrap();
      console.log(`Item with id ${_id} deleted`);
    } catch (error) {
      console.error("Failed to delete the item: ", error);
    }
  };

  return (
    <div className="content">
      <h1>TodoList</h1>
      {data?.map((item) => (
        <div key={item._id}>
          {item._id === editId ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)} action="">
                <input
                  placeholder="edit title"
                  type="text"
                  {...register("title", { required: true })}
                />
                <input
                  placeholder="edit description"
                  type="text"
                  {...register("description", { required: true })}
                />
                <input type="file" {...register("file")} />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditId(null)}>Cancel</button>
              </form>
            </>
          ) : (
            <>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <Image width={700} height={500} src={item.img} alt="photo" />
              <button onClick={() => handleDelete(item._id)}>Delete</button>
              <button
                onClick={() => {
                  setEditId(item._id);
                  setValue("title", item.title);
                  setValue("description", item.description);
                }}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;

