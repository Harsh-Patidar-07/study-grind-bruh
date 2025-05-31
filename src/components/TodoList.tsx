
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, Sparkles, ArrowDownUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  priority: number; // 1: high, 2: medium, 3: low
  createdAt: Date;
};

// Easter egg messages that appear when completing tasks
const completionMessages = [
  "Finished? You deserve a nap.",
  "OMG, you actually did it?!",
  "One less thing to procrastinate on",
  "Your FBI agent is proud rn",
  "Task checked off, personality still questionable",
  "Assignment done, still no life achievements",
  "Did you actually do it tho? 🤨",
  "Cool, now touch grass maybe?",
  "Rizz level +1 for completing that",
  "Task done. Parents still disappointed.",
];

// Motivational messages when adding new tasks
const addTaskMessages = [
  "New task? As if you'll finish it 💀",
  "Another thing you'll procrastinate on",
  "Bold of you to assume you'll do this",
  "Adding this won't make you productive",
  "Nice task. Delete it later when you give up?",
  "This will look great in your 'abandoned' collection",
  "Another task for future you to stress about",
  "That's ambitious. Love the delusion bestie ✨",
];

// Messages when tasks are overdue
const overdueMessages = [
  "No, but seriously, you're late",
  "Do it already, frfr",
  "Hello? This is still waiting",
  "It's not going to do itself",
  "Procrastination level: Expert",
];

// Priority emojis
const priorityEmojis = ["🔥", "⚡", "🌱"];

const TodoList = () => {
  const { toast } = useToast();
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      const parsedTodos = JSON.parse(saved);
      return parsedTodos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    }
    return [];
  });
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState(2); // Default to medium
  const [sortBy, setSortBy] = useState<'priority' | 'date' | 'alphabetical'>('priority');
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = () => {
    if (newTaskText.trim() === "") return;
    
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
      priority: newTaskPriority,
      createdAt: new Date(),
    };
    
    setTodos([...todos, newTodo]);
    setNewTaskText("");
    setNewTaskPriority(2); // Reset to medium
    
    // Show a toast with a random message
    const message = addTaskMessages[Math.floor(Math.random() * addTaskMessages.length)];
    toast({
      description: message,
    });
  };
  
  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const completed = !todo.completed;
        
        // If task is being completed, show a completion message
        if (completed) {
          const message = completionMessages[Math.floor(Math.random() * completionMessages.length)];
          toast({
            title: "Task Completed",
            description: message,
          });
        }
        
        return { ...todo, completed };
      }
      return todo;
    });
    
    setTodos(updatedTodos);
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    
    toast({
      title: "Task Deleted",
      description: "Gone, reduced to atoms ⚛️",
      variant: "destructive",
    });
  };
  
  const updateTodo = (id: string, text: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ));
  };
  
  const updatePriority = (id: string, priority: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, priority } : todo
    ));
  };
  
  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === 'priority') {
      return a.priority - b.priority;
    } else if (sortBy === 'date') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      return a.text.localeCompare(b.text);
    }
  });
  
  const clearCompleted = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    setTodos(todos.filter(todo => !todo.completed));
    
    toast({
      description: completedCount ? `Cleared ${completedCount} tasks. Achievement unlocked: "Task Eraser" 🏆` : "No completed tasks to clear, bestie 🙄",
    });
  };
  
  const getRandomOverdueMessage = () => {
    return overdueMessages[Math.floor(Math.random() * overdueMessages.length)];
  };
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 7) return `${diff} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-end gap-2 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Add a task... be honest with yourself"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            className="input-genz"
          />
        </div>
        
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          {[1, 2, 3].map((priority) => (
            <button
              key={priority}
              className={cn(
                "px-3 py-2 text-xs transition",
                newTaskPriority === priority 
                  ? "bg-genz-purple text-white" 
                  : "bg-input text-muted-foreground hover:bg-muted"
              )}
              onClick={() => setNewTaskPriority(priority)}
            >
              {priorityEmojis[priority - 1]}
            </button>
          ))}
        </div>
        
        <Button onClick={addTodo} size="icon">
          <Plus size={16} />
        </Button>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs"
            onClick={() => setSortBy('priority')}
          >
            <Sparkles size={14} className={sortBy === 'priority' ? 'text-genz-purple' : ''} />
            <span className={sortBy === 'priority' ? 'text-genz-purple' : ''}>Priority</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs"
            onClick={() => setSortBy('date')}
          >
            <AlertCircle size={14} className={sortBy === 'date' ? 'text-genz-purple' : ''} />
            <span className={sortBy === 'date' ? 'text-genz-purple' : ''}>Date</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs"
            onClick={() => setSortBy('alphabetical')}
          >
            <ArrowDownUp size={14} className={sortBy === 'alphabetical' ? 'text-genz-purple' : ''} />
            <span className={sortBy === 'alphabetical' ? 'text-genz-purple' : ''}>A-Z</span>
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" onClick={clearCompleted} className="text-xs">
          Clear Completed
        </Button>
      </div>

      <div className="space-y-2">
        {sortedTodos.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No tasks yet. So productive! (jk)</p>
            <p className="text-sm">Add something to pretend you're organized</p>
          </div>
        ) : (
          sortedTodos.map(todo => (
            <div 
              key={todo.id} 
              className={cn(
                "flex items-center gap-3 p-3 border rounded-lg transition-all", 
                todo.completed 
                  ? "bg-muted/30 border-muted" 
                  : "bg-card border-border hover:border-primary/30"
              )}
            >
              <div className="flex-shrink-0">
                <Checkbox 
                  checked={todo.completed} 
                  onCheckedChange={() => toggleComplete(todo.id)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <div className={cn("font-medium", todo.completed && "line-through text-muted-foreground")}>
                    <input
                      type="text"
                      value={todo.text}
                      onChange={(e) => updateTodo(todo.id, e.target.value)}
                      className={cn(
                        "bg-transparent w-full outline-none", 
                        todo.completed && "text-muted-foreground"
                      )}
                      disabled={todo.completed}
                    />
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                  <span>{formatDate(todo.createdAt)}</span>
                  {!todo.completed && Math.random() > 0.7 && (
                    <span className="text-genz-pink">{getRandomOverdueMessage()}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                {!todo.completed && (
                  <div className="flex border border-border rounded-md overflow-hidden">
                    {[1, 2, 3].map((priority) => (
                      <button
                        key={priority}
                        className={cn(
                          "w-7 h-7 flex items-center justify-center text-xs",
                          todo.priority === priority 
                            ? "bg-genz-purple text-white" 
                            : "bg-input text-muted-foreground hover:bg-muted"
                        )}
                        onClick={() => updatePriority(todo.id, priority)}
                      >
                        {priorityEmojis[priority - 1]}
                      </button>
                    ))}
                  </div>
                )}
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-destructive" 
                  onClick={() => deleteTodo(todo.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          {todos.filter(todo => todo.completed).length}/{todos.length} completed • 
          {todos.filter(todo => !todo.completed).length} left to procrastinate on
        </p>
      </div>
    </div>
  );
};

export default TodoList;
