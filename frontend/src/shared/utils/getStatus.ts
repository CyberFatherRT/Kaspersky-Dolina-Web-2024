import { TaskKey, TaskStatus } from "../models";
import { axiosInstanse } from "./axiosInstanse";

const defaultStatus: TaskStatus =  { basic: false, advance: false, secret: false }

export type Status = Record<TaskKey, TaskStatus>

const map: Record<number, TaskKey> = {
  1: 'boots',
  2: 'news',
  3: 'malware',
  4: 'websocket'
}

export const getStatus: () => Promise<Status> = async () => {
  const res = await axiosInstanse.get<any>('/internal/check'); 
  return res.data.tasks.reduce((a: any, c: any) => ({
    ...a, 
    [map[c.num]]: {...defaultStatus, ...c}
  }), {} as Status)
}