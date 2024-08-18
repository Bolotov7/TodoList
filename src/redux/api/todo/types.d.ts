namespace TODO {
  interface IDoto {
    _id: number;
    title: string;
    description: string;
    img: string;
  }

  type GetTodosResponse = IDoto[];
  type GetTodosRequest = void;

  type PostTodoResponse = IDoto[];
  type PostTodoRequest = IDoto;

  type EditTodoResponse = IDoto[];
  type EditTodoRequest = {
    _id: number,
    data: IDoto
  }

  type DeleteTodoResponse = IDoto[];
  type DeleteTodoRequest = number | undefined
}
