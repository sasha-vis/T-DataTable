import { type Moment } from "moment";

export interface TableData {
  key: string;
  name: string;
  date: string;
  value: number;
}

export interface FormValues {
  name: string;
  date: Moment;
  value: number;
}
