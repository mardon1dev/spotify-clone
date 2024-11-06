import axios from "axios";
import { HTTP_URL } from "./useEnv";

export const useAxios = () => axios.create({baseURL: HTTP_URL})