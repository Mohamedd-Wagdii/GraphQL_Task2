import DataLoader from "dataloader";
import mongoose from "mongoose";
import { Company, User } from "../models/index.js";

// Loader for Companies
export const loadCompanies = new DataLoader(async (keys) => {
  const ids = keys.map(({ id }) => id);

  const validIds = ids.filter((val) => mongoose.isValidObjectId(val));

  // Build projection object dynamically
  const fields = keys.reduce((proj, { selectionsField }) => {
    if (selectionsField && typeof selectionsField === "object") {
      for (const field of Object.keys(selectionsField)) {
        proj[field] = 1;
      }
    }
    return proj;
  }, {});

  let companyQuery = Company.find({ _id: { $in: validIds.length ? validIds : ids } });
  if (Object.keys(fields).length > 0) {
    companyQuery = companyQuery.select(fields);
  }

  const result = await companyQuery.exec();

  return ids.map((id) => result.find((c) => c._id.toString() === String(id)) || null);
});

// Loader for Users grouped by company
export const loadUsersByCompany = new DataLoader(async (ids) => {
  const okIds = ids.filter((x) => mongoose.isValidObjectId(x));
  const fetchedUsers = await User.find({ companyId: { $in: okIds.length ? okIds : ids } }).exec();

  return ids.map((companyId) =>
    fetchedUsers.filter((user) => String(user.companyId) === String(companyId))
  );
});
