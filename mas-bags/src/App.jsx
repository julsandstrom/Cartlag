import "./App.css";

import { useState, useEffect } from "react";
import Check from "./Cartlag.svg?react";

function App() {
  const [selectedPart, setSelectedPart] = useState(null);
  const [bodyParts, setBodyParts] = useState({
    Head: { value: "", unit: "mm" },
    Neck: { value: "", unit: "mm" },
    Chest: { value: "", unit: "mm" },
    Shoulder: { value: "", unit: "mm" },
    Arms: { value: "", unit: "mm" },
    Hands: { value: "", unit: "mm" },
    Waist: { value: "", unit: "mm" },
    Hip: { value: "", unit: "mm" },
    Thigh: { value: "", unit: "mm" },
    Legs: { value: "", unit: "mm" },
    Feet: { value: "", unit: "mm" },
  });
  const [inputValue, setInputValue] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("mm");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".cartlag-doll") &&
        !event.target.closest(".data-form")
      ) {
        removeHighlight();
        setSelectedPart(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const removeHighlight = () => {
    document.querySelectorAll(".highlight").forEach((el) => {
      el.classList.remove("highlight");
    });
  };

  const handleClick = (event) => {
    const part = event.target.id;

    if (selectedPart !== part) {
      setSelectedPart(part);
    }

    setSelectedPart(part);

    document.querySelectorAll(".highlight").forEach((el) => {
      el.classList.remove("highlight");
    });

    if (part) {
      event.target.classList.add("highlight");
    }

    setInputValue(bodyParts[part]?.value || "");
    setSelectedUnit(bodyParts[part]?.unit || "mm");
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (selectedPart) {
      setBodyParts((prev) => ({
        ...prev,
        [selectedPart]: { value: inputValue, unit: selectedUnit },
      }));
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h1>
          CART<span className="lag-color">LAG</span>
        </h1>
      </nav>
      <section className="main-layout">
        <h2 className="instruction">
          Select body parts to add your measurement
        </h2>

        <Check
          onClick={handleClick}
          style={{
            cursor: "pointer",
            width: "600px",
            height: "600px",
          }}
          className="cartlag-doll"
        />
        <form onSubmit={handleSave} className="data-form">
          <label className="selected-part">
            {selectedPart ? selectedPart : "Select a body part"}
          </label>
          <div className="selected-form">
            <input
              type="text"
              placeholder="Enter a value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="value-input"
            />
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="inches">inches</option>
            </select>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
        <ul className="data-summary">
          <div className="name-input">
            <h3 className="name-title">Name:</h3>
            <input
              type="text"
              placeholder="enter a name"
              className="name-input"
            ></input>
          </div>

          {Object.entries(bodyParts).map(([part, data]) => (
            <li key={part} className="list-data">
              {part}: {data.value ? `${data.value} ${data.unit}` : ""}
            </li>
          ))}
        </ul>
      </section>
      <img
        src="src\background.jpg"
        alt="image of waste"
        className="main-image"
      />
      <h3 className="slogan-text">One measurement is better than guessing</h3>

      <h4>Project by Julian Sandstrom</h4>
    </div>
  );
}

export default App;

// const AboutMe = () => {
//   return <div>Frontend Developer with deep knowledge about React.</div>;
// };

// const images = [
//   "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
//   "https://images.unsplash.com/photo-1546842931-886c185b4c8c",
//   "https://images.unsplash.com/photo-1520763185298-1b434c919102",
//   "https://images.unsplash.com/photo-1442458017215-285b83f65851",
//   "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
//   "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
// ];
// return <MemoryGame images={[...images, ...images]} />;
// }

// const MemoryGame = ({ images }) => {
// const [cards] = useState(images);
// const [flipped, setFlipped] = useState([]);
// const [matched, setMatched] = useState([]);

// const handleClick = (index) => {
//   if (
//     flipped.length === 2 ||
//     matched.includes(index) ||
//     flipped.includes(index)
//   ) {
//     return;
//   }
//   console.log(index);
//   setFlipped([...flipped, index]);
// };

// useEffect(() => {
//   if (flipped.length === 2) {
//     const [first, second] = flipped;
//     console.log("run");
//     if (cards[first] === cards[second]) {
//       setMatched([...matched, first, second]);
//     }

//     setTimeout(() => setFlipped([]), 1000);
//   }
// }, [flipped]);

// return (
//   <div>
//     {cards.map((item, idx) => (
//       <div key={idx} onClick={() => handleClick(idx)}>
//         {flipped.includes(idx) || matched.includes(idx) ? (
//           <img src={item} alt="stock" height={"300px"} />
//         ) : (
//           "?"
//         )}
//       </div>
//     ))}
//   </div>
// );
// };
