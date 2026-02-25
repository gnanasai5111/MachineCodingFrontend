import { useState } from "react";
import "./folder-item.less";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import type { FolderInterface } from "../../screens/FileExplorer/file-interface";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

interface FolderItemInterface {
  item: FolderInterface;
  addFolderHandler: (
    value: string,
    parentId: number,
    isFolder: boolean | null
  ) => void;
  editFolderHandler: (value: string, id: number) => void;
  deleteFolderHandler: (id: number) => void;
}

function FolderItem({
  item,
  addFolderHandler,
  editFolderHandler,
  deleteFolderHandler,
}: FolderItemInterface) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showInput, setShowInput] = useState<{
    visible: boolean;
    isFolder: boolean | null;
  }>({
    visible: false,
    isFolder: null,
  });
  const [showEditInput, setShowEditInput] = useState<{
    visible: boolean;
    isFolder: boolean | null;
  }>({
    visible: false,
    isFolder: null,
  });
  const expandHandler = () => {
    setIsExpanded(!isExpanded);
  };

  const addNewFolder = (e: React.MouseEvent<SVGElement>, isFolder: boolean) => {
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const editFolder = (e: React.MouseEvent<SVGElement>, isFolder: boolean) => {
    e.stopPropagation();
    setShowEditInput({
      visible: true,
      isFolder,
    });
  };

  const deleteFolder = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    deleteFolderHandler(item.id);
  };

  const renderRowItem = (isFolder: boolean) => {
    if (showEditInput.visible) {
      return (
        <div>
          {isFolder ? "📁" : "📄"}
          <input
            type="text"
            autoFocus
            onKeyDown={(e) => {
              const value = (e.target as HTMLInputElement).value.trim();
              if (e.key === "Enter" && value) {
                editFolderHandler(value, item.id);
                setShowEditInput({ visible: false, isFolder: null });
              }
            }}
            onBlur={(e) => {
              const value = e.target.value.trim();
              if (value) {
                editFolderHandler(value, item.id);
              }
              setShowEditInput({ visible: false, isFolder: null });
            }}
          />
        </div>
      );
    } else {
      if (isFolder) {
        return <div>📁 {item.name}</div>;
      }
      return <div>📄 {item.name}</div>;
    }
  };

  if (item.isFolder) {
    return (
      <div className="folder-item">
        <div className="folder-row" onClick={() => expandHandler()}>
          <div className="accordion">
            {isExpanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
            {renderRowItem(true)}
          </div>
          <div className="icon-row">
            <VscNewFolder
              onClick={(e: React.MouseEvent<SVGElement>) =>
                addNewFolder(e, true)
              }
            />
            <VscNewFile
              onClick={(e: React.MouseEvent<SVGElement>) =>
                addNewFolder(e, false)
              }
            />
            <MdOutlineEdit
              onClick={(e: React.MouseEvent<SVGElement>) => editFolder(e, true)}
            />
            <MdOutlineDelete
              onClick={(e: React.MouseEvent<SVGElement>) => deleteFolder(e)}
            />
          </div>
        </div>
        {showInput.visible && (
          <div style={{ marginLeft: "10px" }}>
            {showInput.isFolder ? "📁" : "📄"}
            <input
              type="text"
              autoFocus
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                const value = (e.target as HTMLInputElement).value.trim();
                if (e.key === "Enter" && value) {
                  setIsExpanded(true);
                  addFolderHandler(value, item.id, showInput.isFolder);
                  setShowInput({ visible: false, isFolder: null });
                }
              }}
              onBlur={(e) => {
                const value = e.target.value.trim();
                if (value) {
                  setIsExpanded(true);
                  addFolderHandler(value, item.id, showInput.isFolder);
                }
                setShowInput({ visible: false, isFolder: null });
              }}
            />
          </div>
        )}

        {isExpanded &&
          item.children.map((i) => {
            return (
              <FolderItem
                key={i.id}
                item={i}
                addFolderHandler={addFolderHandler}
                editFolderHandler={editFolderHandler}
                deleteFolderHandler={deleteFolderHandler}
              />
            );
          })}
      </div>
    );
  }

  return (
    <div className="folder-item">
      <div className="file-item">
        {renderRowItem(false)}
        <div className="icon-row">
          <MdOutlineEdit
            onClick={(e: React.MouseEvent<SVGElement>) => editFolder(e, true)}
          />
          <MdOutlineDelete
            onClick={(e: React.MouseEvent<SVGElement>) => deleteFolder(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default FolderItem;
