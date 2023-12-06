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
    setBillDetails((prevBillDetails) => {
      const updateBillDetails = prevBillDetails.filter(
        (bill) => bill.slNo !== slNo
      );
      return updateBillDetails;
    });
  };
  const handleChange = (slNo, field, value) => {
    setBillDetails((prevBillDetails) => {
      const updateBillDetails = prevBillDetails.map((bill) =>
        bill.slNo === slNo ? { ...bill, [field]: value } : bill
      );
      return updateBillDetails;
    });
  };
  const handleFileChange = (slNo, files) => {
    setBillDetails((prevBillDetails) =>
      prevBillDetails.map((bill) =>
        bill.slNo === slNo ? { ...bill, billAttachments: files } : bill
      )
    );
  };
  console.log(billDetails);
  return (
    <div>
      <h2 className="text-3xl font-semibold  flex justify-center">Bills</h2>
      <div>
        <div className="w-1/2">
          {billDetails.map((bill) => (
            <div key={bill.slNo} className="border p-3 bg-teal-600">
              {bill.slNo}
              <div className="flex justify-between items-center">
                <div>
                  <label htmlFor="" className="text-xl font-semibold">
                    Description:
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      handleChange(bill.slNo, "billDescription", e.target.value)
                    }
                    className="text-xl ml-3 border p-1 rounded-md"
                    placeholder="Enter Description"
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xl font-semibold">
                    Amount:
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      handleChange(bill.slNo, "billAmount", e.target.value)
                    }
                    className="text-xl ml-3 border p-1 rounded-md"
                    placeholder="Enter Amount"
                  />
                </div>
                <div className="mb-3">
                  <MdDelete
                    size={30}
                    color="red"
                    onClick={() => deleteRow(bill.slNo)}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <label htmlFor="" className="text-xl font-semibold">
                    Date:
                  </label>
                  <input
                    type="date"
                    onChange={(e) =>
                      handleChange(bill.slNo, "billDate", e.target.value)
                    }
                    className="text-xl ml-3 border p-1 rounded-md"
                    placeholder="Enter Date"
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xl font-semibold">
                    Attachments:
                  </label>
                  <input
                    className="text-xl ml-3 border p-1 rounded-md"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={(e) =>
                      handleFileChange(bill.slNo, Array.from(e.target.files))
                    }
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
