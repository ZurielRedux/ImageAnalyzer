export interface IForm {
  file: File | null;
  tags: string[];
}

export const initialAnalyzeFormState: IForm = {
  file: new File([], ""), // Empty File object
  tags: [], // Empty array for tags
};
