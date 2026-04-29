import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Todo } from "@/lib/models";
import { getSession } from "@/lib/auth/auth";

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { items } = await request.json(); // Array of { id, order }
    
    await connectDB();

    const bulkOps = items.map((item: { id: string; order: number }) => ({
      updateOne: {
        filter: { _id: item.id, userId: session.user.id },
        update: { $set: { order: item.order } },
      },
    }));

    if (bulkOps.length > 0) {
      await Todo.bulkWrite(bulkOps);
    }

    return NextResponse.json({ message: "Reordered successfully" });
  } catch (error) {
    console.error("[PUT /api/todos/reorder] failed", error);
    return NextResponse.json(
      { message: "Failed to reorder todos" },
      { status: 500 }
    );
  }
}
