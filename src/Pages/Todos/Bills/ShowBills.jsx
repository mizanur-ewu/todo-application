import React from "react";

const ShowBills = ({ billDetails, setBillDetails }) => {
  console.log(billDetails);
  //slNo
  //billDescription
  //billAmount
  //billDate
  //attachments
  const { slNo, billDescription, billAmount, billDate } = billDetails;
  return (
    <div className="w-full">
      {billDetails?.map((bill) => (
        <div key={bill.slNo} className="border">
          <div className="flex justify-between">
            <p>{bill?.slNo}</p>
            <p>{bill?.billDescription}</p>
          </div>
          <div className="flex justify-between">
            <p>{bill?.billAmount}</p>
            <p>{bill?.billDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowBills;
