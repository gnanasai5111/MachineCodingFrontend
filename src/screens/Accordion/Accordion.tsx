import { useState } from "react";
import "./styles.less";

const data = [
  {
    id: "item1",
    heading: "Introduction to JavaScript",
    content:
      "JavaScript is a versatile scripting language used primarily for web development.",
  },
  {
    id: "item2",
    heading: "Understanding React",
    content:
      "React is a JavaScript library for building user interfaces, maintained by Meta.",
  },
  {
    id: "item3",
    heading: "What is Node.js?",
    content:
      "Node.js is a runtime environment that allows JavaScript to run on the server side.",
  },
  {
    id: "item4",
    heading: "Basics of HTML",
    content: "HTML is the standard markup language used to create web pages.",
  },
  {
    id: "item5",
    heading: "CSS Fundamentals",
    content: "CSS is used to style and layout web pages.",
  },
  {
    id: "item6",
    heading: "Intro to Git and GitHub",
    content:
      "Git is a version control system; GitHub is a platform to host and collaborate on Git repositories.",
  },
  {
    id: "item7",
    heading: "REST API Concepts",
    content:
      "REST APIs allow different software applications to communicate over the web using HTTP methods.",
  },
  {
    id: "item8",
    heading: "Understanding MongoDB",
    content:
      "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.",
  },
  {
    id: "item9",
    heading: "Express.js Overview",
    content:
      "Express is a minimal and flexible Node.js web application framework.",
  },
  {
    id: "item10",
    heading: "What is TypeScript?",
    content:
      "TypeScript is a superset of JavaScript that adds static types for better code reliability.",
  },
];

function Accordion() {
  const [activeItem, setActiveItem] = useState("");

  const activeItemHandler = (id: string) => {
    setActiveItem(activeItem === id ? "" : id);
  };
  return (
    <div className="container">
      <h1 className="main-heading">Accordion</h1>
      <div className="accordion-container">
        {data?.map((item) => {
          return (
            <div key={item.id} className="item">
              <div onClick={() => activeItemHandler(item.id)} className="header">
                <h1>{item.heading}</h1>
                <h1>{activeItem === item.id ? "-" : "+"}</h1>
              </div>
              {activeItem === item.id && <p>{item.content}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Accordion;
