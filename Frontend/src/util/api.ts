import axios from "axios";
import { IAnalyzeImagePayload } from "@/ts/interfaces/payload";

export const analyzeImage = (payload: IAnalyzeImagePayload) =>
  axios.post(`/api/v1/process/file`, payload);
