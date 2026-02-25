import React from "react";
import FolderItem from "./FolderItem";
import type { FolderInterface } from "../../screens/FileExplorer/file-interface";

interface FileExplorerSidePanel {
  fileTree: FolderInterface[];
  setFileTree: React.Dispatch<React.SetStateAction<FolderInterface[]>>;
}

function FileExplorerSidePanel({
  fileTree,
  setFileTree,
}: FileExplorerSidePanel) {
  const addFolderHandler = (
    value: string,
    parentId: number,
    isFolder: boolean | null
  ) => {
    function addApplyRecursively(tree: FolderInterface[]): FolderInterface[] {
      return tree.map((node) => {
        if (node.id === parentId) {
          const duplicate = node.children.find(
            (child) => child.name.toLowerCase() === value.toLowerCase()
          );

          if (duplicate) return node;
          const newItem = {
            id: Date.now(),
            name: value,
            isFolder: isFolder,
            children: [],
          };
          return {
            ...node,
            children: [newItem, ...node.children],
          };
        } else if (node.isFolder) {
          return {
            ...node,
            children: addApplyRecursively(node.children),
          };
        }
        return node;
      });
    }

    const updatedList = addApplyRecursively(fileTree);
    setFileTree(updatedList);
  };

  const findParent = (
    fileTree: FolderInterface[],
    id: number
  ): FolderInterface | null => {
    for (const node of fileTree) {
      if (node.children.some((child) => child.id === id)) {
        return node;
      }

      const found: FolderInterface | null = findParent(node.children, id);
      if (found) {
        return found;
      }
    }
    return null;
  };

  const editFolderHandler = (value: string, id: number) => {
    function addApplyRecursively(tree: FolderInterface[]): FolderInterface[] {
      return tree.map((node) => {
        if (node.id === id) {
          const parent = findParent(fileTree, id);
          if (
            parent?.children.some(
              (child) =>
                child.name.toLowerCase() === value.toLowerCase() &&
                child.id !== id
            )
          ) {
            return node;
          }
          return {
            ...node,
            name: value,
          };
        } else if (node.isFolder) {
          return {
            ...node,
            children: addApplyRecursively(node.children),
          };
        }
        return node;
      });
    }

    const updatedList = addApplyRecursively(fileTree);
    setFileTree(updatedList);
  };

  const deleteFolderHandler = (id: number) => {
    function addApplyRecursively(tree: FolderInterface[]): FolderInterface[] {
      return tree
        .filter((node) => node.id !== id)
        .map((node) => {
          if (node.isFolder) {
            return {
              ...node,
              children: addApplyRecursively(node.children),
            };
          }
          return node;
        });
    }

    const updatedList = addApplyRecursively(fileTree);
    setFileTree(updatedList);
  };

  return (
    <div className="file-explorer">
      {fileTree.map((item) => {
        return (
          <FolderItem
            key={item.id}
            item={item}
            addFolderHandler={addFolderHandler}
            editFolderHandler={editFolderHandler}
            deleteFolderHandler={deleteFolderHandler}
          />
        );
      })}
    </div>
  );
}

export default FileExplorerSidePanel;
