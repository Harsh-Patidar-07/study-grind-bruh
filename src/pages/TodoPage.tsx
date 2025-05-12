
import TodoList from '@/components/TodoList';
import { ListTodo } from 'lucide-react';

const TodoPage = () => {
  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3 text-glow">To-Do List</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Add tasks, pretend you'll do them, repeat. The eternal cycle of student life.
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-px bg-border flex-1 max-w-[100px]"></div>
          <ListTodo className="text-muted-foreground" size={14} />
          <div className="h-px bg-border flex-1 max-w-[100px]"></div>
        </div>
      </div>
      
      <div className="card-genz">
        <TodoList />
      </div>
    </div>
  );
};

export default TodoPage;
