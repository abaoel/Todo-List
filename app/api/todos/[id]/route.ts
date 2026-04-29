import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Todo } from "@/lib/models";
import { getSession } from "@/lib/auth/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    
    await connectDB();

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: body },
      { new: true }
    );

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ todo });
  } catch (error) {
    console.error("[PATCH /api/todos/:id] failed", error);
    return NextResponse.json(
      { message: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    await connectDB();

    const todo = await Todo.findOneAndDelete({ _id: id, userId: session.user.id });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("[DELETE /api/todos/:id] failed", error);
    return NextResponse.json(
      { message: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
