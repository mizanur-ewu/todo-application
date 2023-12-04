import React, { useState } from "react";

const Bills = () => {
  const [billDetails, setBillDetails] = useState([
    {
      slNo: 1,
      billDescription: "",
      billDate: new Date().toDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      billAmount: 0,
      attachments: [],
    },
  ]);
  const addRow = () => {
    setBillDetails((prevBillDetails) => [
      ...prevBillDetails,
      {
        slNo:
          prevBillDetails.length > 0
            ? prevBillDetails[prevBillDetails.length - 1].slNo + 1
            : 1,
        billDescription: "",
        billDate: null,
        billAmount: 0,
      },
    ]);
  };
  const handleInputChange = (slNo, field, value) => {
    setBillDetails((prevBillDetails) =>
      prevBillDetails.map((bill) =>
        bill.slNo === slNo ? { ...bill, [field]: value } : ""
      )
    );
  };
  console.log(billDetails)

  return (
    <div>
      <h4 className="text-2xl">Bills Page</h4>
      <p onClick={addRow}>Add Row</p>
      {billDetails.map((bill) => (
        <div key={bill.slNo}>
          <span>{bill.slNo}</span>
          <div>
            <div className="bg-gray-300">
              <label htmlFor="">billDescription:</label>
              <input
                type="text"
                className="border border-red-600"
                placeholder="Description"
                onChange={(e) =>
                  handleInputChange(
                    bill.slNo,
                    "billDescription",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bills;
