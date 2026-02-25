import { useState } from "react";
import FileExplorerSidePanel from "../../components/FileTree/FileExplorerSidePanel";
import type { FolderInterface } from "./file-interface";
import "./styles.less";

const fileStructure: FolderInterface[] = [
  {
    id: 1,
    name: "Root",
    isFolder: true,
    children: [
      {
        id: 2,
        name: "src",
        isFolder: true,
        children: [
          {
            id: 3,
            name: "components",
            isFolder: true,
            children: [
              {
                id: 4,
                name: "Header.js",
                isFolder: false,
                children: [],
              },
              {
                id: 5,
                name: "Footer.js",
                isFolder: false,
                children: [],
              },
            ],
          },
          {
            id: 6,
            name: "App.js",
            isFolder: false,
            children: [],
          },
          {
            id: 7,
            name: "index.js",
            isFolder: false,
            children: [],
          },
        ],
      },
      {
        id: 8,
        name: "public",
        isFolder: true,
        children: [
          {
            id: 9,
            name: "index.html",
            isFolder: false,
            children: [],
          },
        ],
      },
      {
        id: 10,
        name: "package.json",
        isFolder: false,
        children: [],
      },
      {
        id: 11,
        name: "README.md",
        isFolder: false,
        children: [],
      },
    ],
  },
];

function FileExplorer() {
  const [fileTree, setFileTree] = useState(fileStructure);
  return (
    <div className="container">
      <h1 className="main-heading">FileExplorer</h1>
      <div className="explorer-wrapper">
        <FileExplorerSidePanel fileTree={fileTree} setFileTree={setFileTree} />
      </div>
    </div>
  );
}

export default FileExplorer;
