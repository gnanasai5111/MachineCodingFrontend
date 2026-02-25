import Table from "../../components/Table";
import "./styles.less";

function CustomTable() {
  const data = [
    {
      id: 1,
      name: "Virat Kohli",
      runs: 12350,
      mostHundreds: 46,
      type: "Batsman",
      country: "India",
      age: 35,
      isActive: true,
      battingStyle: "Right-handed",
    },
    {
      id: 100,
      name: "Virat Kohli",
      runs: 1235,
      mostHundreds: 46,
      type: "Batsman",
      country: "India",
      age: 35,
      isActive: true,
      battingStyle: "Right-handed",

    },
    {
      id: 2,
      name: "Ben Stokes",
      runs: 7850,
      mostHundreds: 15,
      type: "Allrounder",
      country: "England",
      age: 33,
      isActive: true,
      battingStyle: "Left-handed",
    },
    {
      id: 3,
      name: "Jasprit Bumrah",
      runs: 450,
      mostHundreds: 0,
      type: "Bowler",
      country: "India",
      age: 30,
      isActive: true,
      battingStyle: "Right-handed",
    },
    {
      id: 4,
      name: "Jos Buttler",
      runs: 6900,
      mostHundreds: 11,
      type: "Wicketkeeper",
      country: "England",
      age: 34,
      isActive: false,
      battingStyle: "Right-handed",
    },
  ];

  const columns = [
    {
      key: "name",
      title: "Cricketer Name",
      sortable: true,
      searchable: true,
      dropdownOptions: [
        "Virat Kohli",
        "Ben Stokes",
        "Jasprit Bumrah",
        "Jos Buttler",
      ],
    },
    {
      key: "runs",
      title: "Runs",
      sortable: true,
      searchable: false,
    },
    {
      key: "mostHundreds",
      title: "Most 100s",
      sortable: true,
      searchable: false,
    },
    {
      key: "type",
      title: "Type",
      sortable: true,
      searchable: false,
      type: "dropdown",
      dropdownOptions: ["Batsman", "Bowler", "Allrounder", "Wicketkeeper"],
    },
    {
      key: "country",
      title: "Country",
      sortable: true,
      searchable: true,
      type: "dropdown",
      dropdownOptions: ["India", "England", "Australia", "South Africa"],
    },
    {
      key: "age",
      title: "Age",
      sortable: true,
    },
    {
      key: "isActive",
      title: "Currently Active",
      type: "checkbox",
    },
    {
      key: "battingStyle",
      title: "Batting Style",
      type: "radio",
      radioOptions: ["Right-handed", "Left-handed"],
    },
  ];

  return (
    <div className="container">
      <h1 className="main-heading">Custom Table</h1>
      <div className="table-wrapper">
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
}

export default CustomTable;
