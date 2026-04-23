import Report from "../models/Report.js";
import { forwardToGovt } from "../services/agentService.js";

export const submitReport = async (req, res) => {
  try {
    const { name, email, location, description } = req.body;
    const newReport = await Report.create({ name, email, location, description });

    await forwardToGovt(newReport);

    res.status(201).json({ message: "Report submitted and forwarded successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
