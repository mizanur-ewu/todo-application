import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
  } from "@tanstack/react-query";
  import Todo from "./Todo";
  
  const Todos = () => {
    const { data, isLoading, refetch } = useQuery({
      queryKey: ["todos"],
      queryFn: async () => {
        return await fetch("http://localhost:3004/students").then((res) =>
          res.json()
        );
      },
    });
  
    if (isLoading) return <div>Loading...</div>;
    return (
      <div>
        <h3>Hello</h3>
        <div className="grid grid-cols-3 gap-6">
          {data && data.map((item) => (
            <Todo key={item.id} item={item} refetch={refetch} />
          ))}
        </div>
      </div>
    );
  };
  export default Todos;