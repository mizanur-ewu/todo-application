import { IoAddCircleSharp } from "react-icons/io5";

import { MdDelete } from "react-icons/md";

import React, { useState } from "react";

const Bills = () => {
  const [billDetails, setBillDetails] = useState([
    {
      slNo: 1,
      billDescription: "",
      billAmount: null,
      billDate: new Date().toISOString(),
      billAttachments: [],
    },
  ]);
  // const addRow = () => {
  //  setBillDetails((prevBillDetails)=>[...prevBillDetails,
  // {
  //   slNo: prevBillDetails.length+1,
  //   billDescription: "",
  //   billAmount: null,
  //   billDate: new Date().toISOString(),
  //   billAttachments: [],
  // }
  // ])
  // };
  const maxRows = 5;
  const addRow = () => {
    if (billDetails.length < maxRows) {
      setBillDetails((prevBillDetails) => [
        ...prevBillDetails,
        {
          slNo:
            prevBillDetails.length > 0
              ? prevBillDetails[prevBillDetails.length - 1].slNo + 1
              : 1,
          billDescription: "",
          billAmount: null,
          billDate: new Date().toISOString(),
          billAttachments: [],
        },
      ]);
    }
  };
  // const deleteRow=(slNo)=>{
  //   setBillDetails((prevBillDetails)=>prevBillDetails.filter((bill)=>bill.slNo!=slNo))
  // }
  const deleteRow = (slNo) => {
    setBillDetails((prevBillDetails)=>{
      const update
    })
  }
  return (
    <div>
      <h2 className="text-3xl font-semibold  flex justify-center">Bills</h2>
      <div>
        <div className="w-1/2">
          {billDetails.map((bill) => (
            <div key={bill.slNo} className="border p-3">
              {bill.slNo}
              <div className="flex justify-between">
                <div>
                  <label htmlFor="">Description:</label>
                  <input type="text" placeholder="Enter Description" />
                </div>
                <div>
                  <label htmlFor="">Amount:</label>
                  <input type="text" placeholder="Enter Amount" />
                </div>
                <div className="mb-3">
                  <MdDelete size={30} color="red" onClick={()=>deleteRow(bill.slNo)}/>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <label htmlFor="">Date:</label>
                  <input type="date" placeholder="Enter Date" />
                </div>
                <div>
                  <label htmlFor="">Attachments:</label>
                  <input
                    type="file"
                    accept={"jpg"}
                    placeholder="Enter Attachments"
                  />
                </div>
                <div>
                  <IoAddCircleSharp size={30} color="blue" onClick={addRow} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bills;
