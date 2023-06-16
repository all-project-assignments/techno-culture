import {useState} from 'react';
import data from './data/data.json';

// based on ids
const initialValues = {
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
  18: 0,
  19: 0,
  20: 0,
  21: 0,
  22: 0,
  23: 0,
  24: 0,
  25: 0,
};

function App() {
  const [state, setState] = useState([0, 0, 0, 0]);
  const [values, setValues] = useState(initialValues);

  const base = data.columns.slice(0, 4);
  // console.log(base)
  // console.log(data.columns);

  const handleChange = (e, id) => {
    // console.log("id", id)
    // console.log(e.target.value)
    // changing state
    const data = [...state];
    data[id] = e.target.value;
    setState((prev) => {
      const data = [...prev];
      data[id] = e.target.value;
      return [...data];
    });
    updateValues(data);
  };

  const updateValues = (data) => {
    // changing dependent fields
    // calculating rate/sqft
    console.log('state', data[3], data[2]);
    const updatedRatePerSqft = (data[3] / data[2]).toFixed(1);
    console.log('updateRatePerSqft', updatedRatePerSqft);
    const updatedRoadFactors = ((data[1] * 1.25) / 20).toFixed(2);
    const builtupPerDecimal = (data[2] * updatedRoadFactors).toFixed(2);
    const landAreaPerSqft = (data[2] * data[4]).toFixed(2);
    // builtUpPerDecimal/landArea (Dec)
    const builtUpArea = (data[2] * updatedRoadFactors * data[4]).toFixed(2);
    const landPrice1Year = (data[3] * data[4]).toFixed(2);
    const landPrice2Year = (data[3] * data[4]*1.15).toFixed(2);
    const landPrice3Year = (data[3] * data[4]*1.35).toFixed(2);
    const landPrice4Year = (data[3] * data[4]*1.6).toFixed(2);
    const constCost = (builtUpArea*1600).toFixed(2);
    const otherCost = (builtUpArea*200).toFixed(2);
    const totalConstPrice1Year = ((builtUpArea*1600)+(builtUpArea*200)).toFixed(2)
    const totalConstPrice2Year = Math.floor(totalConstPrice1Year*1.1)
    const totalConstPrice3Year = Math.floor(totalConstPrice1Year*1.2)
    const totalConstPrice4Year = Math.floor(totalConstPrice1Year*1.3)
    // + infront parses string to number 
    const totalAmount1Year = +landPrice1Year + +totalConstPrice1Year
    const totalAmount2Year = +landPrice2Year + +totalConstPrice2Year
    const totalAmount3Year = +landPrice3Year + +totalConstPrice3Year
    const totalAmount4Year = +landPrice4Year + +totalConstPrice4Year
    const landOwnerRatio1Year = ((+landPrice1Year*100)/totalAmount1Year).toFixed(2)
    const landOwnerRatio2Year = ((+landPrice2Year*100)/totalAmount2Year).toFixed(2)
    const landOwnerRatio3Year = ((+landPrice3Year*100)/totalAmount3Year).toFixed(2)
    const landOwnerRatio4Year = ((+landPrice4Year*100)/totalAmount4Year).toFixed(2)
    setValues((prev) => ({
      ...prev,
      5: updatedRatePerSqft,
      6: updatedRoadFactors,
      7: builtupPerDecimal,
      8: landAreaPerSqft,
      9: builtUpArea,
      10: landPrice1Year,
      11: landPrice2Year,
      12: landPrice3Year,
      13: landPrice4Year,
      14: constCost,
      15: otherCost,
      16: totalConstPrice1Year,
      17: totalConstPrice2Year,
      18: totalConstPrice3Year,
      19: totalConstPrice4Year,
      20: totalAmount1Year,
      21: totalAmount2Year,
      22: totalAmount3Year,
      23: totalAmount4Year,
      24: landOwnerRatio1Year,
      25: landOwnerRatio2Year,
      26: landOwnerRatio3Year,
      27: landOwnerRatio4Year,
    }));
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 shadow-lg">
          {base.map((col) => {
            return (
              <div
                className="flex justify-between px-4 py-2 items-center"
                key={col.id}
              >
                <label className="text-slate-300 text-sm" htmlFor={col.label}>
                  {col.label}:
                </label>
                <input
                  type="number"
                  min={0}
                  id={col.label}
                  value={state[col.id]}
                  onChange={(e) => {
                    handleChange(e, col.id);
                  }}
                />
              </div>
            );
          })}
          <hr />
          <hr />
          {data.columns.slice(4).map((col) => {
            return (
              <div
                className="flex justify-between px-4 py-2 items-center"
                key={col.id}
              >
                <label className="text-slate-300 text-sm" htmlFor={col.label}>
                  {col.label}:
                </label>
                <input value={values[col.id]} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
