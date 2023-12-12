import { IoAddCircleSharp } from "react-icons/io5";

import { MdDelete } from "react-icons/md";

import { useState } from "react";
import ShowBills from "./ShowBills";

const Bills = () => {
  const [showBillDetails, setShowBillDetails] = useState(false);
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
  const handleInputChange = (slNo, field, value) => {
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
        bill.slNo === slNo
          ? { ...bill, billAttachments: [...bill.billAttachments, ...files] }
          : bill
      )
    );
  };
  console.log(billDetails);
  return (
    <div>
      <h2 className="text-3xl font-semibold  flex justify-center">Bills</h2>
      <div className="flex">
        <div className="max-w-2xl">
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
                      handleInputChange(
                        bill.slNo,
                        "billDescription",
                        e.target.value
                      )
                    }
                    className="text-xl border p-1 rounded-md"
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
                      handleInputChange(bill.slNo, "billAmount", e.target.value)
                    }
                    className="text-xl border p-1 rounded-md"
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
                      handleInputChange(bill.slNo, "billDate", e.target.value)
                    }
                    className="text-xl border p-1 rounded-md w-full"
                    placeholder="Enter Date"
                  />
                </div>
                <div className="flex-row justify-between ">
                  <label htmlFor="" className="text-xl font-semibold">
                    Attachments:
                  </label>
                  <br />
                  <input
                    className="text-xl border p-1 rounded-md w-1/2"
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
              {bill?.billAttachments?.map((attachment, index) => (
                <span key={index}>
                  <span className="bg-fuchsia-800 mr-2 px-1 rounded-md inline-block	mt-2">{`${index+1}. ${attachment.name}`}</span>
                </span>
              ))}
            </div>
          ))}
          <div
            className="flex justify-center border-2 bg-blue-500 rounded-md hover:bg-blue-800 py-2 text-white font-semibold"
            onClick={() => setShowBillDetails((prev) => !prev)}
          >
            <button className="">{showBillDetails ? "Hide" : "Show"}</button>
          </div>
        </div>
        {console.log(showBillDetails)}

        <div className="">
          {showBillDetails && <ShowBills billDetails={billDetails} />}
        </div>
      </div>
    </div>
  );
};

export default Bills;
