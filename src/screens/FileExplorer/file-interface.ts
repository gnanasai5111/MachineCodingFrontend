export interface FolderInterface {
  id: number;
  name: string;
  isFolder: boolean | null;
  children: FolderInterface[];
}
