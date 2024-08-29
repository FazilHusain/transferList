import { useState } from "react";
import "./App.css";
import { data } from "./data";
function App() {
  const [leftItemList, setLeftItemList] = useState(data);
  const [rightItemList, setRightItemList] = useState([]);

  const checkList = (list, id, checked) => {
    return list.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          checked: !checked,
        };
      }
      return item;
    });
  };

  const resetItems = (list) => {
    return list.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
  };

  const handleTranferButton = (dir) => {
    if (dir === 'L-To-R') {
      if (leftItemList.length) {
        let copylist = [...leftItemList];
        let checkList = copylist.filter((item) => item.checked);
        let unCheckList = copylist.filter((item) => !item.checked);
        setRightItemList(resetItems([...rightItemList, ...checkList]));
        setLeftItemList(unCheckList);
      }
    } else {
      let copylist = [...rightItemList];
      let checkList = copylist.filter((item) => item.checked);
      let unCheckList = copylist.filter((item) => !item.checked);
      setLeftItemList(resetItems([...leftItemList, ...checkList]));
      setRightItemList(unCheckList);
    }
  };

  const handleClick = (id, checked, dir) => {
    if (dir === "LEFT") {
      let copylist = [...leftItemList];
      copylist = checkList(copylist, id, checked);
      setLeftItemList(copylist);
    } else {
      let copylist = [...rightItemList];
      copylist = checkList(copylist, id, checked);
      setRightItemList(copylist);
    }
  };

  return (
    <div className="container">
      <div className="box">
        {/* leftside */}
        {leftItemList.map(({ title, id, checked }) => (
          <div
          onClick={() => handleClick(id, checked, "LEFT")}
            className={`item ${checked && "checked"}`}
            key={id}
            id={id}  
          >
            {title}
          </div>
        ))}
      </div>
      <div className="actions">
        <button onClick={() => handleTranferButton('L-To-R')}>Left</button>
        <button onClick={() => handleTranferButton('R-To-L')}>Right</button>
      </div>
      <div className="box">
        {/* rightside */}
        {rightItemList.map(({ title, id, checked }) => (
          <div
           onClick={() => handleClick(id, checked, 'RIGHT')}
            className={`item ${checked && "checked"}`}
            key={id}
            id={id}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
