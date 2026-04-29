"use client";

import { useState, useEffect } from "react";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Trash2, GripVertical } from "lucide-react";
import { Todo } from "@/lib/models/models.types";

function SortableItem({ id, todo, onToggle, onDelete, onUpdate }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleUpdate = () => {
    if (title.trim() !== todo.title) {
      onUpdate(todo._id, { title: title.trim() });
    }
    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-3 bg-white border rounded-lg shadow-sm mb-2 group">
      <div {...attributes} {...listeners} className="cursor-grab p-1 text-gray-400 hover:text-gray-600">
        <GripVertical size={20} />
      </div>
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={() => onToggle(todo._id, !todo.completed)}
        className="w-5 h-5 cursor-pointer accent-primary rounded border-gray-300"
      />
      
      {isEditing ? (
        <input 
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      ) : (
        <span 
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
          title="Double click to edit"
        >
          {todo.title}
        </span>
      )}
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onDelete(todo._id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos");
      if (res.ok) {
        const data = await res.json();
        setTodos(data.todos);
      }
    } catch (error) {
      console.error("Error fetching todos", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setTodos([...todos, data.todo]);
        setNewTodo("");
      }
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    setTodos(todos.map(t => t._id === id ? { ...t, completed } : t));
    
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
    } catch (error) {
      console.error("Error toggling todo", error);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Todo>) => {
    setTodos(todos.map(t => t._id === id ? { ...t, ...data } : t));
    
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  const handleDelete = async (id: string) => {
    setTodos(todos.filter(t => t._id !== id));
    
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((i) => i._id === active.id);
        const newIndex = items.findIndex((i) => i._id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        let newOrder = 0;
        if (newIndex === 0) {
          newOrder = newItems[1] ? newItems[1].order - 1024 : 1024;
        } else if (newIndex === newItems.length - 1) {
          newOrder = newItems[newItems.length - 2].order + 1024;
        } else {
          newOrder = (newItems[newIndex - 1].order + newItems[newIndex + 1].order) / 2;
        }
        
        newItems[newIndex].order = newOrder;
        
        fetch("/api/todos/reorder", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            items: [{ id: newItems[newIndex]._id, order: newOrder }] 
          }),
        }).catch(console.error);
        
        return newItems;
      });
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="w-full">
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-8">
        <Input 
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-white h-12"
        />
        <Button type="submit" className="h-12 px-6">Add Task</Button>
      </form>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={todos.map(t => t._id)}
          strategy={verticalListSortingStrategy}
        >
          {todos.map((todo) => (
            <SortableItem 
              key={todo._id} 
              id={todo._id} 
              todo={todo} 
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
          {todos.length === 0 && (
            <div className="text-center py-10 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl bg-white">
              No tasks yet. Add one above!
            </div>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
}
