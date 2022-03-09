import { orange, purple } from "@material-ui/core/colors";
import React, { useState } from "react";



const Dropdown: React.FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState<String>();

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return(
    <div className="list-choice">
      <div className="list-choice-title">Month</div>
            <div className="list-choice-objects">
    <label>
      <input type="radio" name="month"/>                         <span>January</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>February</span>
    </label>
   
  </div>
</div>


  );
  };



//   return (
//     <div className="droplist">
//       <select onChange={selectChange} >
     
//               <option selected disabled>
//                 Display by:
//               </option>
//               <div className="dropmenu">
//                     <option value="Recently Added Notices">Recently Added</option>
//                     <option value="All Notices">All</option>
//               </div>
             
//       </select>
//       {selectedOption && <h2 style={styles.result}>{selectedOption}</h2>} 
//     </div>
//   );
//};

export default Dropdown;


// Just some styles
// const styles: { [name: string]: React.CSSProperties } = {
//   container: {

//   marginTop: 50,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   background: "$P3",
//   border: "none",
//   padding: 10,
// //   font: "Foco", sans-serif,
// //   font-size:  13px,
// //   font-weight: 200,
// //   cursor: "pointer",
// //   outline: "inherit",
// //   width: 150px,
//  //border-radius:10,
// //   align-self: "center",
// },

// select: {
//   padding: 10,
//   width: 250,
//   height: 50,
//   background: purple,

// },
// result: {
//   marginTop: 20,
// },
// };