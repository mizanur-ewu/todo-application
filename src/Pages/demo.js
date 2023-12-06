

//   //add row for bill details========================================
//   const maxRows = 10;

//   const [billDetails, setBillDetails] = useState([
//     {
//       slNo: 1,
//       billDescription: "",
//       billAmount: null,
//       billDate: new Date().toISOString(),
//       billAttachments: [],
//     },
//   ]);

//   const addRow = () => {
//     if (billDetails.length < maxRows) {
//       setBillDetails((prevBillDetails) => [
//         ...prevBillDetails,
//         {
//           slNo:
//             prevBillDetails.length > 0
//               ? prevBillDetails[prevBillDetails.length - 1].slNo + 1
//               : 1,
//           billDescription: "",
//           billAmount: null,
//           billDate: new Date().toISOString(),
//           billAttachments: [],
//         },
//       ]);
//     }
//   };
//   const [rowsToBeDeleted, setRowsToBeDeleted] = useState([]);

//   const deleteRow = (slNo, rowId) => {
//     setRowsToBeDeleted((prevRowsTobeDeleted) => [
//       ...prevRowsTobeDeleted,
//       rowId,
//     ]);
//     setBillDetails((prevBillDetails) => {
//       const updatedBillDetails = prevBillDetails.filter(
//         (bill) => bill.slNo !== slNo
//       );

//       // Recalculate totalBillAmount
//       const newTotalBillAmount = updatedBillDetails.reduce(
//         (sum, bill) => sum + parseFloat(bill.billAmount || 0),
//         0
//       );
//       setTotalBillAmount(newTotalBillAmount);

//       return updatedBillDetails;
//     });
//   };

//   const handleInputChange = (slNo, field, value) => {
//     setBillDetails((prevBillDetails) => {
//       const updatedBillDetails = prevBillDetails.map((bill) =>
//         bill.slNo === slNo ? { ...bill, [field]: value } : bill
//       );

//       // Recalculate totalBillAmount
//       const newTotalBillAmount = updatedBillDetails.reduce(
//         (sum, bill) => sum + parseFloat(bill.billAmount || 0),
//         0
//       );
//       setTotalBillAmount(newTotalBillAmount);

//       return updatedBillDetails;
//     });
//   };

//   const handleFileChange = (slNo, newFiles) => {
//     setBillDetails((prevBillDetails) =>
//       prevBillDetails.map((bill) =>
//         bill.slNo === slNo
//           ? {
//               ...bill,
//               billAttachments: [...(bill.billAttachments || []), ...newFiles],
//               selectedAttachments: [
//                 ...(bill.selectedAttachments || []),
//                 ...newFiles.map((file) => file.name),
//               ],
//             }
//           : bill
//       )
//     );
//   };
//   console.log(billDetails);
//   const [filesToBeDeleted, setFilesToBeDeleted] = useState([]);

//   const handleDeleteAttachment = (slNo, index) => {
//     setBillDetails((prevBillDetails) => {
//       const updatedBillDetails = prevBillDetails.map((bill) => {
//         // const attachmentsKey = `bills${bill.slNo}`;

//         if (bill.slNo === slNo) {
//           const deletedFileId = bill?.billAttachments[index]?._id;

//           // Update filesToBeDeleted state
//           setFilesToBeDeleted((prevToBeDeleted) => [
//             ...prevToBeDeleted,
//             deletedFileId,
//           ]);

//           // Remove the file from the billAttachments array
//           bill.billAttachments.splice(index, 1);
//         }

//         return bill;
//       });

//       // Recalculate totalBillAmount
//       const newTotalBillAmount = updatedBillDetails.reduce(
//         (sum, bill) => sum + parseFloat(bill.billAmount || 0),
//         0
//       );
//       setTotalBillAmount(newTotalBillAmount);

//       return updatedBillDetails;
//     });
//   };

//   console.log(filesToBeDeleted);
//   console.log(rowsToBeDeleted);

//               <br />
//               {billDetails.map((bill, index) => (
//                 <div key={bill.slNo}>
//                   <span className="font-bold">{bill.slNo}</span>
//                   <div className="border p-2 bg-[#EFFBFD] rounded-md">
//                     <div className="flex justify-between items-center">
//                       <TextField
//                         sx={{ minWidth: "45%" }}
//                         label="Description"
//                         variant="standard"
//                         value={bill.billDescription}
//                         style={{ margin: "0 10px 10px 0" }}
//                         onChange={(e) =>
//                           handleInputChange(
//                             bill.slNo,
//                             "billDescription",
//                             e.target.value
//                           )
//                         }
//                       />

//                       <TextField
//                         required
//                         sx={{ minWidth: "45%" }}
//                         label="Bill Amount"
//                         variant="standard"
//                         style={{ margin: "0 10px 10px 0" }}
//                         type="number"
//                         value={bill.billAmount}
//                         onChange={(e) =>
//                           handleInputChange(
//                             bill.slNo,
//                             "billAmount",
//                             e.target.value
//                           )
//                         }
//                       />
//                       <div>
//                         {billDetails.length > 1 && (
//                           <button onClick={() => deleteRow(bill.slNo)}>
//                             <DeleteIcon
//                               fontSize="large"
//                               sx={{ color: "#ef5350" }}
//                             />
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                     <br />

//                     <div className="flex justify-between items-center">
//                       <div className="">
//                         <FormControl sx={{ minWidth: "100%" }} required>
//                           <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DemoContainer components={["DatePicker"]} require>
//                               <DatePicker
//                                 format="DD-MMM-YYYY"
//                                 sx={{ minWidth: "45%" }}
//                                 label="Bill Date"
//                                 value={dayjs(bill.billDate)} // Assuming billDate is a valid date string
//                                 onChange={(newValue) => {
//                                   handleInputChange(
//                                     bill.slNo,
//                                     "billDate",
//                                     newValue ? newValue.toISOString() : ""
//                                   );
//                                 }}
//                               />
//                             </DemoContainer>
//                           </LocalizationProvider>
//                         </FormControl>
//                       </div>

//                       <div>
//                         <input
//                           className="w-[200px]"
//                           type="file"
//                           accept=".jpg, .jpeg, .png"
//                           multiple
//                           onChange={(e) =>
//                             handleFileChange(
//                               bill.slNo,
//                               Array.from(e.target.files)
//                             )
//                           }
//                         />
//                       </div>
//                       <div>
//                         {index === billDetails.length - 1 && (
//                           <button onClick={addRow}>
//                             <AddCircleIcon fontSize="large" color="primary" />
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <br />

//                   <ul>
//                     {bill?.billAttachments?.map((attachment, index) => (
//                       <span key={index} className="mb-2">
//                         <span className="bg-blue-300 p-1 rounded-md">
//                           {" "}
//                           {console.log(attachment?.name)}
//                           {`${index + 1}.${attachment.name}`}{" "}
//                         </span>
//                         <Tooltip title="delete">
//                           <button
//                             onClick={() =>
//                               handleDeleteAttachment(bill.slNo, index)
//                             }
//                           >
//                             <CloseIcon
//                               sx={{ fontSize: 25, color: "#ED725E" }}
//                             />
//                           </button>
//                         </Tooltip>
//                         {","}
//                       </span>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               color="info"
//               variant="contained"
//               onClick={() => {
//                 setStatus("Draft");
//                 handleVerify();
//               }}
//             >
//               Save As Draft
//             </Button>
//             <Button
//               color="warning"
//               variant="contained"
//               onClick={() => {
//                 setStatus("In Signing");
//                 handleVerify();
//               }}
//             >
//               Save and send for approval
//             </Button>
//             <Button
//               color="inherit"
//               variant="contained"
//               onClick={handleAddCancel}
//             >
//               Cancel
//             </Button>
//             <>
//               <Dialog
//                 fullScreen={fullScreen}
//                 open={openAddPopOver}
//                 onClose={() => setOpenAddPopOver(false)}
//               >
//                 <DialogTitle>Are you sure you want to add?</DialogTitle>
//                 <DialogActions>
//                   <Button
//                     onClick={() => {
//                       setOpenAddPopOver(false);
//                       handleAddOk();
//                     }}
//                   >
//                     Yes
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       setOpenAddPopOver(false);
//                     }}
//                   >
//                     No
//                   </Button>
//                 </DialogActions>
//               </Dialog>
//             </>
//           </DialogActions>
//         </form>
//       </Dialog>
//     );
//   };


//           <div className="border p-3 rounded-md">
//             {billDetails.map((bill, index) => (
//               <div key={bill.slNo}>
//                 <snap className="font-bold">{bill.slNo}</snap>
//                 <div className="border p-2 bg-[#bee5eb] rounded-md">
//                   <div className="flex justify-between items-center">
//                     <TextField
//                       sx={{ minWidth: "45%" }}
//                       label="Description"
//                       variant="standard"
//                       value={bill.billDescription}
//                       style={{ margin: "0 10px 10px 0" }}
//                       onChange={(e) =>
//                         handleInputChange(
//                           bill.slNo,
//                           "billDescription",
//                           e.target.value
//                         )
//                       }
//                     />

//                     <TextField
//                       required
//                       sx={{ minWidth: "45%" }}
//                       label="Bill Amount"
//                       variant="standard"
//                       style={{ margin: "0 10px 10px 0" }}
//                       type="number"
//                       value={bill.billAmount}
//                       onChange={(e) =>
//                         handleInputChange(
//                           bill.slNo,
//                           "billAmount",
//                           e.target.value
//                         )
//                       }
//                     />
//                     <div>
//                       {billDetails.length > 1 && (
//                         <button onClick={() => deleteRow(bill.slNo, bill?.id)}>
//                           <DeleteIcon
//                             fontSize="large"
//                             sx={{ color: "#ef5350" }}
//                           />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                   <br />

//                   <div className="flex justify-between items-center">
//                     <div className="">
//                       <FormControl sx={{ minWidth: "100%" }} required>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                           <DemoContainer components={["DatePicker"]} require>
//                             <DatePicker
//                               format="DD-MMM-YYYY"
//                               sx={{ minWidth: "45%" }}
//                               label="Bill Date"
//                               value={dayjs(bill.billDate)} // Assuming billDate is a valid date string
//                               onChange={(newValue) => {
//                                 handleInputChange(
//                                   bill.slNo,
//                                   "billDate",
//                                   newValue ? newValue.toISOString() : ""
//                                 );
//                               }}
//                             />
//                           </DemoContainer>
//                         </LocalizationProvider>
//                       </FormControl>
//                     </div>

//                     {/* Render file input for editing attachments */}
//                     <div>
//                       <input
//                         className="w-[200px]"
//                         type="file"
//                         accept=".jpg, .jpeg, .png"
//                         multiple
//                         onChange={(e) =>
//                           handleFileChange(
//                             bill.slNo,
//                             Array.from(e.target.files)
//                           )
//                         }
//                       />
//                     </div>
//                     <div>
//                       {index === billDetails.length - 1 && (
//                         <button onClick={addRow}>
//                           <AddCircleIcon fontSize="large" color="primary" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <br />

//                 {/* Render the list of attachments for editing */}
//                 <ul>
//                   {bill?.billAttachments?.map((attachment, index) => (
//                     <span key={index} className="">
//                       <span className="bg-blue-300 p-1 rounded-md">
//                         {" "}
//                         {/* {`${index + 1}.${attachment?.name}`}{" "} */}
//                         {`${index + 1}.${
//                           attachment?.name === undefined
//                             ? attachment?.fileName
//                             : attachment?.name
//                         }`}{" "}
//                       </span>
//                       <Tooltip title="delete">
//                         <button
//                           onClick={() =>
//                             handleDeleteAttachment(bill.slNo, index)
//                           }
//                         >
//                           <CloseIcon sx={{ fontSize: 25, color: "#ED725E" }} />
//                         </button>
//                       </Tooltip>
//                       {","}
//                     </span>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
