import { ChangeEvent } from 'react';


export interface ISearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
}
