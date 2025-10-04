import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: { type: String },
  slogan: { type: String },
});

export const CompanyModel =
  mongoose.models.CompanyModel || mongoose.model("CompanyModel", CompanySchema);
