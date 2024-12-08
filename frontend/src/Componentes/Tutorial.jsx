import React, { useState, useEffect } from "react";
import axios from "axios";
import './Tutorial.css';

function Tutorial() {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/tutorial')
      .then(response => {
        setTutorials(response.data);
      })
      .catch(error => {
        console.error("Erro ao obter os tutoriais:", error);
      });
  }, []);

  const handleToggle = (id) => {
    setTutorials(prevTutorials =>
      prevTutorials.map(tutorial =>
        tutorial.id === id ? { ...tutorial, expanded: !tutorial.expanded } : tutorial
      )
    );
  };

  return (
    <div className="tutorial-container">
      {tutorials.map((tutorial) => (
        <div
          key={tutorial.id}
          className={`tutorial-item ${tutorial.expanded ? "expanded" : ""}`}
          onClick={() => handleToggle(tutorial.id)}
        >
          <div className="tutorial-title">
            {}
            {tutorial.icon && (
              <img
                src={`/${tutorial.icon}`}  
                alt={tutorial.title}
                className="tutorial-icon"
              />
            )}
            {tutorial.title}
          </div>

          {}
          {tutorial.expanded && (
            <div className="tutorial-description">
              <p>{tutorial.description}</p>
              {}
              {tutorial.icon && (
                <div className="tutorial-image-container">
                  <img
                    src={`/${tutorial.icon}`}
                    alt={tutorial.title}
                    className="tutorial-image"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Tutorial;
