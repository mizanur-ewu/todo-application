import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const Todo = ({ item }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      const newData = (prevData) => prevData.filter((todo) => todo.id !== id);
      queryClient.setQueryData(["todos"], newData);
      const res = await fetch(`http://localhost:3004/students/${id}`, {
        method: "DELETE",
      });
      const data = await res.json(); // Add 'await' here
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isPending) {
    return <p>{"Deleting..."}</p>;
  }

  const handleDelete = (id) => {
    console.log(id);
    mutate(id);
  };

  return (
    <div className="flex justify-between items-center border">
      <div>{item?.id}</div>
      <div>{item?.name}</div>
      <div>{item?.designation}</div>
      <div
        className="bg-blue-400 rounded-sm p-2 hover:bg-blue-600"
        onClick={() => handleDelete(item.id)}
      >
        Delete
      </div>
    </div>
  );
};

export default Todo;
