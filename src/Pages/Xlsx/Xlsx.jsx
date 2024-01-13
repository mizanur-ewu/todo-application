import React, { useCallback, useState } from "react";

import { useEffect } from "react";
import { read, utils, writeFile, writeFileXLSX } from "xlsx";

const Xlsx = () => {
  const [pres, setPres] = useState([]);
  //form to object  ===================================================>>>>>>>>>
  useEffect(() => {
    (async () => {
      /* Download from https://sheetjs.com/pres.numbers */
      const f = await fetch("https://sheetjs.com/pres.numbers");
      //   console.log(typeof f)
      const ab = await f.arrayBuffer();

      /* parse */
      const wb = read(ab);
      console.log(wb);

      /* generate array of objects from first worksheet */
      const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
      const data = utils.sheet_to_json(ws); // generate objects

      /* update state */
      setPres(data); // update state
    })();
  }, []);
  // Exporting object to sheet  ========================================>>>>>>>>>
  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(pres);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "SheetJSReactAoO.xlsx");
  }, [pres]);
  return (
    <div className="text-center">
      <h5>XLSX</h5>
      <div>
        {" "}
        <table>
          {/* The `thead` section includes the table header row */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Index</th>
            </tr>
          </thead>
          {/* The `tbody` section includes the data rows */}
          <tbody>
            {/* generate row (TR) for each president */}
            {pres.map((row) => (
              <tr key={row?.index}>
                {/* Generate cell (TD) for name / index */}
                <td>{row.Name}</td>
                <td>{row.Index}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <h4 className="font-bold">Object to EXCEL</h4>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Index</th>
            </tr>
          </thead>
          <tbody>
            {
              /* generate row for each president */
              pres.map((pres) => (
                <tr key={pres.index}>
                  <td>{pres.Name}</td>
                  <td>{pres.Index}</td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <td colSpan={2}>
              <button className="bg-blue-400 rounded-md px-2" onClick={exportFile}>Export XLSX</button>
            </td>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Xlsx;
