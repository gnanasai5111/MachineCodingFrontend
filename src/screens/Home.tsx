import { Link } from "react-router-dom";
import { filePaths } from "../utilities/filePaths";
import "./home.less";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Machine Coding Challenges</h1>

      <div className="cards-wrapper">
        {filePaths
          .filter((item) => item.path !== "/")
          .map((item, index) => (
            <div key={index} className="card">
              <img src={item.image} alt={item.name} className="card-image" />
              <Link to={item.path} className="card-link">
                {item.name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
