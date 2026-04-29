import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Todo } from "@/lib/models";
import { getSession } from "@/lib/auth/auth";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const todos = await Todo.find({ userId: session.user.id })
      .sort({ order: 1 })
      .lean();

    return NextResponse.json({ todos });
  } catch (error) {
    console.error("[GET /api/todos] failed", error);
    return NextResponse.json(
      { message: "Failed to load todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title } = await request.json();
    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    await connectDB();
    
    // Get max order
    const lastTodo = await Todo.findOne({ userId: session.user.id }).sort({ order: -1 }).lean();
    const order = lastTodo ? lastTodo.order + 1024 : 1024;

    const todo = await Todo.create({
      title,
      completed: false,
      userId: session.user.id,
      order,
    });

    return NextResponse.json({ todo });
  } catch (error) {
    console.error("[POST /api/todos] failed", error);
    return NextResponse.json(
      { message: "Failed to create todo" },
      { status: 500 }
    );
  }
}
