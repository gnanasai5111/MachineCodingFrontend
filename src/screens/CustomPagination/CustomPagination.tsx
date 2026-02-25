import Pagination from "../../components/Pagination";
import "./styles.less";

function CustomPagination() {
  return (
    <div className="container">
      <h1 className="main-heading">Pagination</h1>
      <div className="pagination-wrapper">
        <Pagination
          total={200}
          itemsPerPage={5}
          showJumpers={true}
          onPageChange={(value) => console.log(value)}
          delta={2}
        />
      </div>
    </div>
  );
}

export default CustomPagination;
