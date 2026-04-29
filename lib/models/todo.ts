import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  userId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);
