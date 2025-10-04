import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: false },
    age: { type: Number, required: false },
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.UserModel || mongoose.model("User", UserSchema);
