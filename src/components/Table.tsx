import { useEffect, useState } from "react";
import { GoSortAsc, GoSortDesc } from "react-icons/go";

interface TableData {
  id: number;
  name: string;
  runs: number;
  mostHundreds: number;
  type: string;
  country: string;
  age: number;
  isActive: boolean;
  battingStyle: string;
}

interface TableColumns {
  key: string;
  title: string;
  sortable?: boolean;
  searchable?: boolean;
  type?: string;
  dropdownOptions?: string[] | undefined;
  radioOptions?: string[] | undefined;
}

function Table({
  data,
  columns,
}: {
  data: TableData[];
  columns: TableColumns[];
}) {
  const originalData: TableData[] = data;
  const [tableData, setTableData] = useState<TableData[]>(data);
  const [filters, setFilters] = useState({
    search: {},
    sort: {
      key: "",
      order: "",
    },
  });

  const handleChange = (id: number, key: string, value: unknown) => {
    setTableData((prev: TableData[]) =>
      prev.map((row) => (row.id === id ? { ...row, [key]: value } : row))
    );
  };
  const renderRow = (item: TableData) => {
    return columns.map((column: TableColumns) => {
      const value = item[column.key as keyof TableData];
      switch (column.type) {
        case "checkbox":
          return (
            <td key={column.key}>
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) =>
                  handleChange(item.id, column.key, e.target.checked)
                }
              />
            </td>
          );
        case "radio":
          return (
            <td key={column.key}>
              {column.radioOptions?.map((opt: string, i: number) => (
                <label key={i}>
                  <input
                    type="radio"
                    value={opt}
                    checked={value === opt}
                    onChange={(e) =>
                      handleChange(item.id, column.key, e.target.value)
                    }
                  />
                  {opt}
                </label>
              ))}
            </td>
          );
        case "dropdown":
          return (
            <td key={column.key}>
              {" "}
              <select
                value={String(item[column.key as keyof TableData] ?? "")}
                onChange={(e) =>
                  handleChange(item.id, column.key, e.target.value)
                }
              >
                {column?.dropdownOptions?.map((item: string, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </td>
          );
        default:
          return <td key={column.key}>{value}</td>;
      }
    });
  };

  const sortHandler = (key: string) => {
    setFilters((prev) => {
      const newOrder =
        prev.sort.key !== key
          ? "ASC"
          : prev.sort.order === "ASC"
          ? "DSC"
          : "ASC";

      return {
        ...prev,
        sort: {
          key: key,
          order: newOrder,
        },
      };
    });
  };

  const selectHandler = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: { ...prev.search, [key]: value },
    }));
  };

  useEffect(() => {
    let filtered = [...originalData];

    if (filters.search) {
      Object.entries(filters.search).forEach((item) => {
        const [key, value] = item;
        if (value) {
          filtered = filtered.filter((row) =>
            row[key as keyof TableData]
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase())
          );
        }
      });
    }

    if (filters.sort.key) {
      const order = filters.sort.order;
      const key = filters.sort.key;
      filtered.sort((a, b) => {
        const v1 = a[key as keyof TableData];
        const v2 = b[key as keyof TableData];

        if (typeof v1 === "number" && typeof v2 === "number") {
          return order === "ASC" ? v1 - v2 : v2 - v1;
        }

        return order === "ASC"
          ? String(v1).localeCompare(String(v2))
          : String(v2).localeCompare(String(v1));
      });
    }

    setTableData(filtered);
  }, [filters, originalData]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column, columnIndex) => {
              return (
                <th key={columnIndex}>
                  <div className="table-header">
                    <div className="sort-row">
                      <p>{column.title}</p>{" "}
                      {column.sortable && (
                        <span className="icon-container">
                          {filters.sort.key === column.key &&
                          filters.sort.order === "DSC" ? (
                            <GoSortDesc
                              size={16}
                              onClick={() => sortHandler(column.key)}
                            />
                          ) : (
                            <GoSortAsc
                              size={16}
                              onClick={() => sortHandler(column.key)}
                            />
                          )}
                        </span>
                      )}
                    </div>
                    {column.searchable && (
                      <div className="filter-row">
                        <select
                          onChange={(e) =>
                            selectHandler(column.key, e.target.value)
                          }
                        >
                          <option value="" disabled selected hidden>
                            Select Value
                          </option>
                          {column?.dropdownOptions?.map(
                            (item: string, index) => {
                              return (
                                <option value={item} key={index}>
                                  {item}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </div>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => {
            return <tr key={item.id}>{renderRow(item)}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
