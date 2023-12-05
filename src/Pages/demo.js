// import React from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { Header } from "../../../components";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import CloseIcon from "@mui/icons-material/Close";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import EditIcon from "@mui/icons-material/Edit";

// import dayjs from "dayjs";
// import {
//   useAxiosPrivateFormData,
//   useAxiosPrivate,
// } from "../../../hooks/useAxiosPrivate";
// import { toast } from "react-hot-toast";
// import {
//   Box,
//   Button,
//   Chip,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Tooltip,
// } from "@mui/material";
// import { MaterialReactTable } from "material-react-table";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import TokenIcon from "@mui/icons-material/Token";
// import TextFieldSearch from "../../../utilsMUITable/TextFieldSearch";
// import FormControlFilter from "../../../utilsMUITable/FormControlFilter";
// import { Helmet } from "react-helmet-async";
// import { MuiFileInput } from "mui-file-input";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

// const MyBill = () => {
//   const axiosPrivateFormData = useAxiosPrivateFormData();
//   const axiosPrivate = useAxiosPrivate();
//   const [initialData, setInitialData] = useState([]);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const [loading, setLoading] = useState(true);
//   //get my bill data from backend=======================================>
//   useEffect(() => {
//     setLoading(true);
//     axiosPrivate
//       .get(`/expense-bill/my-bills`)
//       // Handle the response from backend here
//       .then((res) => {
//         console.log(res?.data);
//         var temp = res?.data?.map((valueObj) => {
//           return {
//             ...valueObj,
//             createdDate: new Date(valueObj.createdAt).toLocaleDateString(
//               "en-GB",
//               {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//               }
//             ),
//           };
//         });
//         setInitialData(temp);
//         setLoading(false);
//       })
//       // Catch errors if any
//       .catch((err) => {
//         toast.error((t) => (
//           <span>
//             Error:{" "}
//             {err?.response?.data?.message
//               ? err?.response?.data?.message
//               : "Something went wrong"}
//             <button
//               className="text-red-600 ml-1"
//               onClick={() => toast.dismiss(t.id)}
//             >
//               Close
//             </button>
//           </span>
//         ));
//         setLoading(false);
//       });
//   }, []);

//   //Table data based on query parameter ========================================>
//   const [searchData, setSearchData] = useState({
//     advanceReqNo: "",
//     expenseBillNo: "",
//     requisitioner: "",
//     company: "",
//     unit: "",
//     department: "",
//     partner: "",
//     agreementNo: "",
//     expenseType: "",
//     expenseCategory: "",
//     createdDate: "",
//     status: [],
//   });
//   const [filterData, setFilterData] = useState([]);

//   useEffect(() => {
//     setSearchData((prevObj) => ({
//       ...prevObj,
//       advanceReqNo: params.get("advanceReqNo")
//         ? params.get("advanceReqNo")
//         : "",
//       expenseBillNo: params.get("expenseBillNo")
//         ? params.get("expenseBillNo")
//         : "",
//       requisitioner: params.get("requisitioner")
//         ? params.get("requisitioner")
//         : "",
//       company: params.get("company") ? params.get("company") : "",
//       unit: params.get("unit") ? params.get("unit") : "",
//       department: params.get("department") ? params.get("department") : "",
//       partner: params.get("partner") ? params.get("partner") : "",
//       agreementNo: params.get("agreementNo") ? params.get("agreementNo") : "",
//       expenseType: params.get("expenseType") ? params.get("expenseType") : "",
//       expenseCategory: params.get("expenseCategory")
//         ? params.get("expenseCategory")
//         : "",
//       createdDate: params.get("createdDate") ? params.get("createdDate") : "",
//       //DropDown
//       status: JSON.parse(params.get("status")) || [],
//     }));
//   }, [location.search]);

//   //Modify data based on query ----->
//   useEffect(() => {
//     let temp = initialData?.filter((value) => {
//       return (
//         (value?.advanceReqNo || "")
//           ?.toLowerCase()
//           ?.includes((params.get("advanceReqNo") || "")?.toLowerCase()) &&
//         (value?.expenseBillNo || "")
//           ?.toLowerCase()
//           ?.includes((params.get("expenseBillNo") || "")?.toLowerCase()) &&
//         (value?.requisitioner?.name || "")
//           ?.toLowerCase()
//           ?.includes((params.get("requisitioner") || "")?.toLowerCase()) &&
//         (value?.agreementNo || "")
//           ?.toLowerCase()
//           ?.includes((params.get("agreementNo") || "")?.toLowerCase()) &&
//         (value?.expenseType?.name || "")
//           ?.toLowerCase()
//           ?.includes((params.get("expenseType") || "")?.toLowerCase()) &&
//         (value?.expenseCategory?.name || "")
//           ?.toLowerCase()
//           ?.includes((params.get("expenseCategory") || "")?.toLowerCase()) &&
//         (value?.createdDate || "")
//           ?.toLowerCase()
//           ?.includes((params.get("createdDate") || "")?.toLowerCase()) &&
//         (JSON.parse(params.get("status")) || [value?.status]).includes(
//           value?.status
//         )
//       );
//     });
//     setFilterData(temp);
//   }, [searchData, initialData, location.search]);
//   //Common declare for add and edit modal
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

//   //add modal start===============================================>
//   const [openAddPopOver, setOpenAddPopOver] = React.useState(false);
//   const [addModal, setAddModal] = React.useState(false);

//   const [status, setStatus] = useState("Draft");

//   const [totalBillAmount, setTotalBillAmount] = useState(0);

//   //start==============================================================>
//   const [companyUnitDepartment, setCompanyUnitDepartment] = useState([]);
//   const [selectCompaniesData, setSelectCompaniesData] = useState([]);
//   const [selectUnitsData, setSelectUnitsData] = useState([]);
//   const [selectDepartmentData, setSelectDepartmentData] = useState([]);
//   const [partners, setPartners] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);

//   const [typesData, setTypesData] = useState([]);
//   // const [selectedType, setSelectedType] = useState(null);

//   const [addDataObj, setAddDataObj] = React.useState({
//     company: null,
//     unit: null,
//     department: null,
//     expenseCategory: null,
//     expenseType: null,
//     partner: null,
//     isClientPayable: false,

//     noExternalPerson: null,
//     noInternalPerson: null,
//     totalBillAmount: null,
//     expenseDate: dayjs(new Date()?.toISOString()),
//     expenseDescription: "",
//     allocatedAmount: null,
//     allocationType: "",
//     // status: "",
//   });
//   const [sendData, setSendData] = useState({
//     company: null,
//     unit: null,
//     department: null,
//     expenseCategory: null,
//     expenseType: null,
//     partner: null,
//   });
//   const [budgetExceed, setBudgetExceed] = useState(false);
//   const [maxAmount, setMaxAmount] = useState(0);

//   useEffect(() => {
//     setLoading(true);
//     axiosPrivate
//       .get("/user/company-unit-department")
//       .then((res) => {
//         setCompanyUnitDepartment(res.data);
//         let tempData = res.data.map((company) => {
//           return { name: company.name, id: company.id };
//         });
//         setSelectCompaniesData(tempData);
//         // After setting the company data, set the initial values for setAddDataObj
//         setAddDataObj((prv) => ({
//           ...prv,
//           company: res?.data.length > 0 ? res?.data[0]?.id : null,
//         }));
//         setSendData((prv) => ({
//           ...prv,
//           company: res?.data.length > 0 ? res?.data[0]?.id : null,
//         }));
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error(
//           `Error fetching company unit department data: ${error.message}`
//         );
//         setLoading(false);
//       });
//     //expense Type
//     axiosPrivate
//       .get("/expense-category/expense-categories-with-types")
//       .then((res) => {
//         setCategoryData(res.data);

//         // Set the initial selected category
//         // setSelectedCategory(res.data.length > 0 ? res.data[0].id : null);
//         setAddDataObj((prevData) => ({
//           ...prevData,
//           expenseCategory: res?.data[0]?.id, // Set the initial company
//         }));
//         setSendData((prevData) => ({
//           ...prevData,
//           expenseCategory: res?.data[0]?.id, // Set the initial company
//         }));
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error(`Error fetching expense Type: ${error.message}`);
//         setLoading(false);
//       });
//     //partners
//     axiosPrivate
//       .get("/partner/partners")
//       .then((res) => {
//         setPartners(res.data);

//         setAddDataObj((prevData) => ({
//           ...prevData,
//           partner: res.data.length > 0 ? res.data[0].id : null,
//         }));
//         setSendData((prevData) => ({
//           ...prevData,
//           partner: res.data.length > 0 ? res.data[0].id : null,
//         }));
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error(`Error fetching expense Type: ${error.message}`);
//         setLoading(false);
//       });
//   }, []);

//   //auto set unit based of company
//   useEffect(() => {
//     if (addDataObj.company) {
//       const selectedCompany = companyUnitDepartment.find(
//         (company) => company.id === addDataObj.company
//       );
//       if (selectedCompany) {
//         setSelectUnitsData(selectedCompany.units);
//       }
//       setAddDataObj((prv) => ({
//         ...prv,
//         unit:
//           selectedCompany?.units.length > 0
//             ? selectedCompany?.units[0].id
//             : null,
//       }));
//       setSendData((prv) => ({
//         ...prv,
//         unit:
//           selectedCompany?.units.length > 0
//             ? selectedCompany?.units[0].id
//             : null,
//       }));
//     }
//   }, [addDataObj.company]);

//   useEffect(() => {
//     if (addDataObj.unit) {
//       const selectedUnit = selectUnitsData.find(
//         (unit) => unit.id === addDataObj.unit
//       );
//       if (selectedUnit) {
//         setSelectDepartmentData(selectedUnit.departments);
//       }
//       setAddDataObj((prv) => ({
//         ...prv,
//         department: selectedUnit?.departments[0]?.id,
//       }));
//       setSendData((prv) => ({
//         ...prv,
//         department: selectedUnit?.departments[0]?.id,
//       }));
//     }
//   }, [addDataObj.unit]);
//   // Set type data based on the selected category
//   useEffect(() => {
//     if (addDataObj.expenseCategory) {
//       // Find the selected category object
//       const selectedCategoryObj = categoryData.find(
//         (category) => category.id === addDataObj.expenseCategory
//       );

//       // Set the types based on the selected category
//       if (selectedCategoryObj) {
//         setTypesData(selectedCategoryObj?.types || []);

//         // Set the initial selected type in addDataObj
//         setAddDataObj((prevData) => ({
//           ...prevData,
//           expenseType: selectedCategoryObj?.types[0]?.id || null,
//           allocationType: selectedCategoryObj?.types[0]?.allocationType || null,
//           allocatedAmount:
//             selectedCategoryObj?.types[0]?.allocatedAmount || null,
//         }));
//         setSendData((prevData) => ({
//           ...prevData,
//           expenseType: selectedCategoryObj?.types[0]?.id || null,
//           allocationType: selectedCategoryObj?.types[0]?.allocationType || null,
//           allocatedAmount:
//             selectedCategoryObj?.types[0]?.allocatedAmount || null,
//         }));
//       }
//     }
//   }, [addDataObj.expenseCategory]);

//   //end ===============================================================>
//   const handleAddOk = () => {
//     const totalBillAmount = billDetails.reduce(
//       (sum, bill) => sum + parseFloat(bill.billAmount || 0),
//       0
//     );
//     //start append advance req================================================================
//     const formData = new FormData();
//     formData.append("company", addDataObj?.company);
//     formData.append("unit", addDataObj?.unit);
//     formData.append("department", addDataObj?.department);
//     formData.append("isClientPayable", addDataObj?.isClientPayable);
//     formData.append("expenseCategory", addDataObj?.expenseCategory);
//     formData.append("expenseType", addDataObj?.expenseType);
//     formData.append("partner", addDataObj?.partner);

//     // formData.append("noExternalPerson", addDataObj?.noExternalPerson || 0);
//     formData.append(
//       "noInternalPerson",
//       addDataObj?.allocationType === "N/A"
//         ? 0
//         : addDataObj?.noInternalPerson || 0
//     );
//     formData.append(
//       "noExternalPerson",
//       addDataObj?.allocationType === "N/A"
//         ? 0
//         : addDataObj?.noExternalPerson || 0
//     );
//     formData.append("expenseDate", addDataObj?.expenseDate);
//     // formData.append("allocatedAmount", addDataObj?.allocatedAmount || 0);
//     formData.append("allocationType", addDataObj?.allocationType);
//     formData.append(
//       "expenseDescription",
//       addDataObj?.expenseDescription ? addDataObj?.expenseDescription : ""
//     );
//     formData.append("status", status);

//     //end append advance req================================================================
//     // formData.append("advanceExpense", editDataObj?._id);
//     formData.append("totalBillAmount", totalBillAmount);
//     formData.append("status", status || "");

//     let tempBillDetails = billDetails?.map((value) => {
//       return { ...value, slNo: `bills${value.slNo}` };
//     });

//     formData.append("billDetails", JSON.stringify(tempBillDetails));

//     // Append files
//     billDetails.forEach((bill) => {
//       const attachmentsKey = `bills${bill.slNo}`;
//       bill.billAttachments?.forEach((file, index) => {
//         formData.append(`${attachmentsKey}`, file);
//       });
//     });

//     axiosPrivateFormData
//       .post("/expense-bill/create-bill", formData)
//       .then((res) => {
//         // Handle the response from the server
//         setInitialData((value) => [
//           ...value,
//           {
//             ...res?.data,
//             billDate: new Date(res?.data?.billDate).toLocaleDateString(
//               "en-GB",
//               {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//               }
//             ),
//             expenseDate: new Date(res?.data?.expenseDate).toLocaleDateString(
//               "en-GB",
//               {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//               }
//             ),
//           },
//         ]);
//         toast.success("Expense Bill created successfully");
//       })
//       .catch((err) => {
//         // Handle errors
//         console.error("Error creating expense:", err);
//         setFilesToBeDeleted([]);
//         setRowsToBeDeleted;
//       });
//     setAddDataObj({
//       company: sendData?.company,
//       unit: sendData?.unit,
//       department: sendData?.department,
//       isClientPayable: false,
//       expenseCategory: sendData?.expenseCategory,
//       expenseType: sendData?.expenseType,
//       partner: sendData?.partner,
//       expenseDate: dayjs(new Date().toISOString()),
//     });

//     setBillDetails([
//       {
//         slNo: 1,
//         billDescription: "",
//         billAmount: null,
//         billDate: new Date().toISOString(),
//         billAttachments: [],
//       },
//     ]);
//     setBudgetExceed(false);

//     setAddModal(false);
//   };

//   const handleAddCancel = () => {
//     setAddDataObj({
//       company: sendData?.company,
//       unit: sendData?.unit,
//       department: sendData?.department,
//       isClientPayable: false,
//       expenseCategory: sendData?.expenseCategory,
//       expenseType: sendData?.expenseType,
//       partner: sendData?.partner,
//       expenseDate: dayjs(new Date().toISOString()),
//     });
//     setBillDetails([
//       {
//         slNo: 1,
//         billDescription: "",
//         billAmount: null,
//         billDate: new Date().toISOString(),
//         billAttachments: [],
//       },
//     ]);
//     setAddModal(false);
//     setFilesToBeDeleted([]);
//     setRowsToBeDeleted([]);
//   };
//   const handleVerify = () => {
//     // Check if all required fields are filled
//     billDetails.forEach((value) => {
//       const requiredKeys = [
//         "slNo",
//         "billDescription",
//         "billAmount",
//         "billDate",
//         "billAttachments",
//       ];

//       const missingKeys = requiredKeys.filter((key) => !value[key]);

//       if (missingKeys.length > 0) {
//         // Display an error toast and return without opening AddPopOver
//         toast.error(` ${missingKeys.join(", ")} missing in billDetails.`);
//         return;
//       }
//       // Open AddPopOver only if there are no missing keys
//       else setOpenAddPopOver(true);
//     });
//     if (
//       addDataObj?.company &&
//       addDataObj?.unit &&
//       addDataObj?.department &&
//       addDataObj?.expenseCategory &&
//       addDataObj?.expenseType &&
//       addDataObj?.partner &&
//       // addDataObj.noInternalPerson &&
//       // addDataObj.noExternalPerson &&
//       addDataObj?.allocationType &&
//       totalBillAmount &&
//       addDataObj?.expenseDate &&
//       (!budgetExceed || (budgetExceed && addDataObj?.expenseDescription))
//     ) {
//       setOpenAddPopOver(true);
//     } else {
//       toast.error(
//         budgetExceed && !addDataObj?.expenseDescription
//           ? "Budget exceeds. Description is mandatory."
//           : "Please fill in all the required fields"
//       );
//     }
//   };

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

//   //==============================
//   useEffect(() => {
//     const selectedType = typesData.find(
//       (item) => item.id === addDataObj?.expenseType
//     );

//     if (selectedType) {
//       const maxBudgetPerPerson = selectedType?.allocatedAmount;
//       const totalNoPerson =
//         parseInt(addDataObj?.noInternalPerson || 0, 10) +
//         parseInt(addDataObj?.noExternalPerson || 0, 10);

//       setMaxAmount((prevAmount) => totalNoPerson * maxBudgetPerPerson);

//       // Now, setBudgetExceed will use the updated maxAmount
//       setBudgetExceed(
//         parseFloat(totalBillAmount) > totalNoPerson * maxBudgetPerPerson
//       );
//     }
//   }, [
//     addDataObj?.expenseType,
//     addDataObj?.noInternalPerson,
//     addDataObj?.noExternalPerson,
//     totalBillAmount,
//   ]);
 
//   const addModalUI = () => {
//     return (
//       <Dialog
//         open={addModal}
//         onClose={handleAddCancel}
//         fullWidth={true}
//         maxWidth="false" //Set maxWidth to false to prevent Material-UI from applying predefined values
//         PaperProps={{
//           style: {
//             maxWidth: "700px", // Set your desired maximum width here
//           },
//         }}
//         aria-labelledby="responsive-dialog-title"
//       >
//         <DialogTitle id="responsive-dialog-title">My bILL</DialogTitle>
//         <form>
//           <DialogContent>
//             <div style={{}}>
//               <div className="flex justify-between px-1 py-4 bg-[#EFFBFD] rounded ">
//                 <div className="w-2/5 m-1">
//                   <FormControl fullWidth variant="standard">
//                     <InputLabel id="demo-simple-select-label">
//                       Company
//                     </InputLabel>
//                     <Select
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       label="Company"
//                       value={addDataObj?.company || ""}
//                       onChange={(e) => {
//                         if (e.target.value) {
//                           setAddDataObj((prevData) => ({
//                             ...prevData,
//                             company: e.target.value,
//                           }));
//                         } else {
//                           setSelectUnitsData([]);
//                         }
//                       }}
//                     >
//                       {selectCompaniesData?.map((value) => {
//                         return (
//                           <MenuItem key={value.id} value={value.id}>
//                             {value.name}
//                           </MenuItem>
//                         );
//                       })}
//                     </Select>
//                   </FormControl>
//                 </div>

//                 <div className="w-2/5 m-1">
//                   <FormControl fullWidth variant="standard">
//                     <InputLabel id="demo-simple-select-label">Units</InputLabel>
//                     <Select
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       label="Units"
//                       value={addDataObj?.unit || ""}
//                       onChange={(e) => {
//                         if (e.target.value) {
//                           setAddDataObj((prevData) => ({
//                             ...prevData,
//                             unit: e.target.value,
//                           }));
//                         }
//                       }}
//                     >
//                       {selectUnitsData?.map((value) => {
//                         return (
//                           <MenuItem key={value.id} value={value.id}>
//                             {value.name}
//                           </MenuItem>
//                         );
//                       })}
//                     </Select>
//                   </FormControl>
//                 </div>
//               </div>
//               <div className="bg-[#EFFBFD]">
//                 <FormControl fullWidth variant="standard">
//                   <InputLabel id="demo-simple-select-label">
//                     Departments
//                   </InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     label="Units"
//                     value={addDataObj?.department || ""}
//                     onChange={(e) => {
//                       if (e.target.value) {
//                         setAddDataObj((prevData) => ({
//                           ...prevData,
//                           department: e.target.value,
//                         }));
//                       }
//                     }}
//                   >
//                     {selectDepartmentData?.map((value) => {
//                       return (
//                         <MenuItem key={value.id} value={value.id}>
//                           {value.name}
//                         </MenuItem>
//                       );
//                     })}
//                   </Select>
//                 </FormControl>
//               </div>
//               <br />
//               <FormControl variant="standard" sx={{ minWidth: "100%" }}>
//                 <InputLabel id="demo-simple-select-label">
//                   Client Payable:
//                 </InputLabel>
//                 <Select
//                   label="Client Payable"
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   value={addDataObj.isClientPayable}
//                   onChange={(e) => {
//                     setAddDataObj((prevData) => ({
//                       ...prevData,
//                       isClientPayable: e.target.value,
//                     }));
//                   }}
//                   // input={<OutlinedInput label="Tag" />}
//                 >
//                   <MenuItem value={true}>Yes</MenuItem>
//                   <MenuItem value={false}>No</MenuItem>
//                 </Select>
//               </FormControl>
//               <br />

//               <br />
//               <FormControl fullWidth variant="standard">
//                 <InputLabel id="category-select-label">Category</InputLabel>
//                 <Select
//                   labelId="category-select-label"
//                   id="category-select"
//                   label="Category"
//                   value={addDataObj?.expenseCategory || ""}
//                   onChange={(e) =>
//                     setAddDataObj((prevData) => ({
//                       ...prevData,
//                       expenseCategory: e.target.value,
//                     }))
//                   }
//                 >
//                   {categoryData.map((category) => (
//                     <MenuItem key={category.id} value={category.id}>
//                       {category.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <br />
//               <FormControl fullWidth variant="standard">
//                 <InputLabel id="type-select-label">Type</InputLabel>
//                 <Select
//                   labelId="type-select-label"
//                   id="type-select"
//                   label="Type"
//                   value={addDataObj?.expenseType || ""}
//                   onChange={(e) => {
//                     const selectedType = typesData.find(
//                       (type) => type.id === e.target.value
//                     );

//                     setAddDataObj((prevData) => ({
//                       ...prevData,
//                       expenseType: e.target.value,
//                       allocatedAmount: selectedType?.allocatedAmount || 0,
//                       allocationType: selectedType?.allocationType || "",
//                     }));
//                   }}
//                 >
//                   {typesData.map((type) => (
//                     <MenuItem key={type.id} value={type.id}>
//                       {type.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <br />
//               <br />
//               {console.log(totalBillAmount)}
//               <FormControl fullWidth variant="standard">
//                 <InputLabel id="demo-simple-select-label">
//                   Select Partner
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   label="Select Partner"
//                   value={addDataObj?.partner || ""}
//                   onChange={(e) => {
//                     if (e.target.value) {
//                       setAddDataObj((prevData) => ({
//                         ...prevData,
//                         partner: e.target.value,
//                       }));
//                     }
//                   }}
//                 >
//                   {partners?.map((value) => {
//                     return (
//                       <MenuItem key={value.id} value={value.id}>
//                         {value.name}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//               <br />

//               <br />
//               <div className="flex justify-between">
//                 <div className="w-2/5 m-1">
//                   <TextField
//                     sx={{ minWidth: "100%" }}
//                     type="number"
//                     disabled={
//                       !!(addDataObj?.allocationType === "N/A") ||
//                       !!(addDataObj?.allocationType === "Aggregate")
//                     }
//                     label="No Internal Person"
//                     variant="standard"
//                     style={{ margin: "0 10px 10px 0" }}
//                     onChange={(e) =>
//                       setAddDataObj((prevObj) => ({
//                         ...prevObj,
//                         noInternalPerson: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>

//                 <div className="w-2/5 m-1">
//                   <TextField
//                     sx={{ minWidth: "100%" }}
//                     type="number"
//                     disabled={
//                       !!(addDataObj?.allocationType === "N/A") ||
//                       !!(addDataObj?.allocationType === "Aggregate")
//                     }
//                     label="No External Person"
//                     variant="standard"
//                     style={{ margin: "0 10px 10px 0" }}
//                     onChange={(e) =>
//                       setAddDataObj((prevObj) => ({
//                         ...prevObj,
//                         noExternalPerson: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//               </div>
//               {addDataObj?.allocationType === "Aggregate" && (
//                 <div>
//                   <p className="text-xl text-blue-700">
//                     {`The maximum allocated amount is ${addDataObj?.allocatedAmount}`}
//                   </p>
//                 </div>
//               )}
//               {addDataObj?.allocationType === "Person Wise" && (
//                 <div>
//                   <h1
//                     className={`text-lg my-2 ${
//                       budgetExceed ? "text-red-500" : "text-blue-600"
//                     }`}
//                   >{`Total No of person ${
//                     Number(addDataObj?.noInternalPerson || 0) +
//                     Number(addDataObj?.noExternalPerson || 0)
//                   }. The maximum allocated amount is ${maxAmount || 0}`}</h1>
//                 </div>
//               )}

//               <br />
//               <FormControl sx={{ minWidth: "100%" }}>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DemoContainer components={["DatePicker"]} require>
//                     <DatePicker
//                       format="DD-MMM-YYYY"
//                       sx={{ width: "100%" }}
//                       label="Expense Date"
//                       value={dayjs(addDataObj?.expenseDate)}
//                       onChange={(newValue) => {
//                         setAddDataObj((prevObj) => ({
//                           ...prevObj,
//                           expenseDate:
//                             new Date(newValue?.$d).toString() === "Invalid Date"
//                               ? new Date()?.toISOString()
//                               : new Date(newValue?.$d)?.toISOString(),
//                         }));
//                       }}
//                     />
//                   </DemoContainer>
//                 </LocalizationProvider>
//               </FormControl>
//               <TextField
//                 sx={{ minWidth: "100%" }}
//                 type="text"
//                 label="Description"
//                 variant="standard"
//                 style={{ margin: "0 10px 10px 0" }}
//                 onChange={(e) =>
//                   setAddDataObj((prevObj) => ({
//                     ...prevObj,
//                     expenseDescription: e.target.value,
//                   }))
//                 }
//               />
//               <hr />

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

//   // add modal end

//   //start edit modal===============================================>
//   const [editModal, setEditModal] = useState(false);
//   const [editData, setEditData] = useState();

//   const [openEditPopOver, setOpenEditPopOver] = useState(false);
//   const [statusEdited, setStatusEdited] = React.useState();

//   const [editDataObj, setEditDataObj] = useState({
//     company: null,
//     unit: null,
//     department: null,
//     expenseCategory: null,
//     expenseType: null,
//     partner: null,

//     noExternalPerson: null,
//     noInternalPerson: null,
//     expenseDate: dayjs(new Date().toISOString()),
//     expenseDescription: "",
//     // status: "",
//   });
//   const handleEditOk = () => {
//     const formDataEdited = new FormData();
//     formDataEdited.append("company", editDataObj?.company?.id);
//     formDataEdited.append("unit", editDataObj?.unit?.id);
//     formDataEdited.append("department", editDataObj?.department?.id);
//     formDataEdited.append("isClientPayable", editDataObj?.isClientPayable);
//     formDataEdited.append("expenseCategory", editDataObj?.expenseCategory?.id);
//     formDataEdited.append("expenseType ", editDataObj?.expenseType?.id);
//     formDataEdited.append("partner", editDataObj?.partner?.id);
//     formDataEdited.append("rowsToBeDeleted", rowsToBeDeleted);
//     formDataEdited.append("filesToBeDeleted", filesToBeDeleted);
//     formDataEdited.append(
//       "noInternalPerson",
//       editDataObj?.allocationType === "N/A"
//         ? 0
//         : editDataObj?.noInternalPerson || 0
//     );
//     formDataEdited.append(
//       "noExternalPerson",
//       editDataObj?.allocationType === "N/A"
//         ? 0
//         : editDataObj?.noExternalPerson || 0
//     );
//     formDataEdited.append("expenseDate", editDataObj?.expenseDate);
//     formDataEdited.append(
//       "allocatedAmount ",
//       editDataObj?.allocatedAmount || 0
//     );
//     formDataEdited.append("allocationType", editDataObj?.allocationType);
//     formDataEdited.append(
//       "expenseDescription",
//       editDataObj?.expenseDescription ? editDataObj?.expenseDescription : ""
//     );
//     formDataEdited.append("status", statusEdited);

//     let tempBillDetails = billDetails?.map((value) => {
//       return { ...value, slNo: `bills${value.slNo}` };
//     });

//     formDataEdited.append("billDetails", JSON.stringify(tempBillDetails));

//     // Append files
//     billDetails.forEach((bill) => {
//       const attachmentsKey = `bills${bill.slNo}`;
//       bill.billAttachments?.forEach((file, index) => {
//         formDataEdited.append(`${attachmentsKey}`, file);
//       });
//     });

//     axiosPrivateFormData
//       .patch(`/expense-bill/edit-bill/${editData.id}`, formDataEdited)
//       .then((res) => {
//         // Handle the response from the server
//         let tempData = initialData.map((obj) => {
//           return res.data.id === obj.id
//             ? {
//                 ...res?.data,
//                 expenseDate: new Date(
//                   res?.data?.expenseDate
//                 ).toLocaleDateString("en-GB", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 }),
//               }
//             : obj;
//         });
//         setInitialData(tempData);
//         setLoading(false);
//         toast.success("Advance Requisition updated successfully!!");
//       })
//       .catch((err) => {
//         setLoading(false);
//         console.error("Error creating expense:", err?.response?.data?.message);
//         toast.error("Already saved for approval. Cannot be edited.");
//       })
//       .finally(() => {
//         setOpenBackdrop(false);
//       });

//     setEditDataObj((prevObj) => ({ ...prevObj, ...editData }));
//     setEditModal(false);
//     setFilesToBeDeleted([]);
//     setRowsToBeDeleted([]);
//     setBudgetExceed(false);
//     setBillDetails([
//       {
//         slNo: 1,
//         billDescription: "",
//         billAmount: null,
//         billDate: new Date().toISOString(),
//         billAttachments: [],
//       },
//     ]);
//   };

//   const handleEditCancel = () => {
//     // setEditDataObj((prevObj) => ({ ...prevObj, ...editData }));
//     setEditModal(false);
//     setFilesToBeDeleted([]);
//     setRowsToBeDeleted([]);
//     setBudgetExceed(false);
//     // setEditData({});
//     setEditData([
//       {
//         slNo: 1,
//         billDescription: "",
//         billAmount: "",
//         billDate: "",
//         billAttachments: [],
//       },
//     ]);
//   };

//   // auto Units based on Company by default
//   useEffect(() => {
//     if (editDataObj?.company?.id) {
//       const selectedCompany = companyUnitDepartment.find(
//         (company) => company?.id === editDataObj?.company?.id
//       );
//       if (selectedCompany) {
//         setSelectUnitsData(selectedCompany.units);
//       }
//     }
//   }, [editDataObj?.company?.id]);

//   // auto set Departments based on Unit by default
//   useEffect(() => {
//     if (editDataObj?.unit?.id && selectUnitsData.length > 0) {
//       const selectedUnit = selectUnitsData.find(
//         (unit) => unit.id === editDataObj?.unit?.id
//       );
//       if (selectedUnit) {
//         setSelectDepartmentData(selectedUnit.departments);
//       }
//     }
//   }, [editDataObj?.unit?.id, selectUnitsData]);
//   // auto set end by default --------------------------------
//   // Setting Units and Departments based on Company and Unit
//   useEffect(() => {
//     // auto Units based on Company by default
//     if (editDataObj?.company?.id) {
//       const selectedCompany = companyUnitDepartment.find(
//         (company) => company?.id === editDataObj?.company?.id
//       );
//       if (selectedCompany) {
//         setSelectUnitsData(selectedCompany.units);
//         if (selectedCompany.units.length > 0) {
//           setEditDataObj((prev) => ({
//             ...prev,
//             unit: { id: selectedCompany.units[0].id },
//           }));
//           if (selectedCompany.units[0].departments.length > 0) {
//             setSelectDepartmentData(selectedCompany.units[0].departments);
//             setEditDataObj((prev) => ({
//               ...prev,
//               department: { id: selectedCompany.units[0].departments[0].id },
//             }));
//           }
//         }
//       }
//     }
//   }, [editDataObj?.company?.id]);

//   // auto set Departments based on Unit by default
//   useEffect(() => {
//     if (editDataObj?.unit?.id && selectUnitsData.length > 0) {
//       const selectedUnit = selectUnitsData.find(
//         (unit) => unit.id === editDataObj?.unit?.id
//       );
//       if (selectedUnit) {
//         setSelectDepartmentData(selectedUnit.departments);
//         if (selectedUnit.departments.length > 0) {
//           setEditDataObj((prev) => ({
//             ...prev,
//             department: { id: selectedUnit?.departments[0]?.id },
//           }));
//         }
//       }
//     }
//   }, [editDataObj?.unit?.id, selectUnitsData]);

//   // Set types based on category by default
//   useEffect(() => {
//     if (editDataObj?.expenseCategory?.id) {
//       const selectedCategory = categoryData.find(
//         (category) => category.id === editDataObj?.expenseCategory?.id
//       );

//       if (selectedCategory) {
//         setTypesData(selectedCategory?.types || []);

//         if (selectedCategory.types.length > 0) {
//           setEditDataObj((prev) => ({
//             ...prev,
//             expenseType: {
//               id: selectedCategory?.types[0]?.id,
//             },
//           }));
//         }
//       }
//     }
//   }, [editDataObj?.expenseCategory?.id]);

//   // Set types based on category when category changes
//   useEffect(() => {
//     if (editDataObj?.expenseCategory?.id) {
//       const selectedCategory = categoryData.find(
//         (category) => category.id === editDataObj?.expenseCategory?.id
//       );

//       if (selectedCategory) {
//         setTypesData(selectedCategory?.types);

//         if (selectedCategory.types.length > 0) {
//           setEditDataObj((prev) => ({
//             ...prev,
//             expenseType: {
//               id: selectedCategory?.types[0]?.id,
//             },
//           }));
//         }
//       }
//     }
//   }, [editDataObj?.expenseCategory?.id]);

//   useEffect(() => {
//     const selectedType = typesData.find(
//       (item) => item.id === editDataObj?.expenseType?.id
//     );

//     if (selectedType) {
//       const maxBudgetPerPerson = selectedType.allocatedAmount;
//       const totalNoPerson =
//         parseInt(editDataObj.noInternalPerson || 0, 10) +
//         parseInt(editDataObj.noExternalPerson || 0, 10);

//       setMaxAmount((prevAmount) => totalNoPerson * maxBudgetPerPerson);

//       // Now, setBudgetExceed will use the updated maxAmount
//       setBudgetExceed(
//         parseFloat(totalBillAmount) > totalNoPerson * maxBudgetPerPerson
//       );
//     }
//   }, [
//     editDataObj?.expenseType,
//     editDataObj.noInternalPerson,
//     editDataObj.noExternalPerson,
//     totalBillAmount,
//   ]);

//   useEffect(() => {
//     setEditDataObj((prevEditDataObj) => ({ ...prevEditDataObj, ...editData }));
//   }, [editData]);

//   useEffect(() => {
//     if (editData?.billDetails) {
//       setBillDetails(
//         editData.billDetails.map((bill, index) => ({
//           id: bill.id || "",
//           slNo: index + 1,
//           billDescription: bill.billDescription || "",
//           billAmount: bill.billAmount || 0,
//           billDate: bill.billDate || dayjs().toISOString(),
//           billAttachments: bill.billAttachments || [],
//         }))
//       );
//     } else {
//       // If there's no billDetails, set initial state (e.g., one empty row)
//       setBillDetails([
//         {
//           slNo: 1,
//           billDescription: "",
//           billAmount: "",
//           billDate: dayjs().toISOString(),
//           billAttachments: [],
//         },
//       ]);
//     }
//   }, [editData]);
//   console.log(editDataObj?.billDetails);

//   const editModalUI = () => {
//     return (
//       <Dialog
//         fullScreen={fullScreen}
//         open={editModal}
//         onClose={handleEditCancel}
//         aria-labelledby="responsive-dialog-title"
//       >
//         <DialogTitle id="responsive-dialog-title">Modify Bill</DialogTitle>
//         <DialogContent>
//           <div className="flex justify-between px-1 py-4 bg-[#EFFBFD] rounded ">
//             <div className="w-2/5 m-1">
//               <FormControl fullWidth variant="standard">
//                 <InputLabel id="demo-simple-select-label">Company</InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   label="Company"
//                   value={editDataObj?.company?.id || "dd"}
//                   onChange={(e) => {
//                     if (e.target.value) {
//                       setEditDataObj((prevData) => ({
//                         ...prevData,
//                         company: { id: e.target.value },
//                       }));
//                     } else {
//                       setSelectUnitsData([]);
//                     }
//                   }}
//                 >
//                   {selectCompaniesData?.map((value) => {
//                     return (
//                       <MenuItem key={value.id} value={value.id}>
//                         {value.name}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//             </div>

//             <div className="w-2/5 m-1">
//               <FormControl fullWidth variant="standard">
//                 <InputLabel id="demo-simple-select-label">Units</InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   label="Units"
//                   value={editDataObj?.unit?.id || "dd"}
//                   onChange={(e) => {
//                     if (e.target.value) {
//                       setEditDataObj((prevData) => ({
//                         ...prevData,
//                         unit: { id: e.target.value },
//                       }));
//                     }
//                   }}
//                 >
//                   {selectUnitsData?.map((value) => {
//                     return (
//                       <MenuItem key={value.id} value={value.id}>
//                         {value.name}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//             </div>
//           </div>
//           <div className="bg-[#EFFBFD]">
//             <FormControl fullWidth variant="standard">
//               <InputLabel id="demo-simple-select-label">Departments</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 label="Units"
//                 value={editDataObj?.department?.id || "dd"}
//                 onChange={(e) => {
//                   if (e.target.value) {
//                     setEditDataObj((prevData) => ({
//                       ...prevData,
//                       department: { id: e.target.value },
//                     }));
//                   }
//                 }}
//               >
//                 {selectDepartmentData?.map((value) => {
//                   return (
//                     <MenuItem key={value.id} value={value.id}>
//                       {value.name}
//                     </MenuItem>
//                   );
//                 })}
//               </Select>
//             </FormControl>
//           </div>
//           <br />
//           <FormControl variant="standard" sx={{ minWidth: "100%" }}>
//             <InputLabel id="demo-simple-select-label">
//               Client Payable:
//             </InputLabel>
//             <Select
//               label="Client Payable"
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={editData?.isClientPayable}
//               onChange={(e) => {
//                 setEditDataObj((prevData) => ({
//                   ...prevData,
//                   isClientPayable: e.target.value,
//                 }));
//               }}
//               // input={<OutlinedInput label="Tag" />}
//             >
//               <MenuItem value={true}>Yes</MenuItem>
//               <MenuItem value={false}>No</MenuItem>
//             </Select>
//           </FormControl>
//           <br />
//           <br />
//           <FormControl fullWidth variant="standard">
//             <InputLabel id="category-select-label">Category</InputLabel>
//             <Select
//               labelId="category-select-label"
//               id="category-select"
//               label="Category"
//               value={editDataObj?.expenseCategory?.id || ""}
//               onChange={(e) =>
//                 setEditDataObj((prevData) => ({
//                   ...prevData,
//                   expenseCategory: { id: e.target.value },
//                 }))
//               }
//             >
//               {categoryData.map((category) => (
//                 <MenuItem key={category.id} value={category.id}>
//                   {category.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <br />
//           <br />
//           <FormControl fullWidth variant="standard">
//             <InputLabel id="type-select-label">Type</InputLabel>
//             <Select
//               labelId="type-select-label"
//               id="type-select"
//               label="Type"
//               value={editDataObj?.expenseType?.id || ""}
//               onChange={(e) => {
//                 const selectedType = typesData.find(
//                   (type) => type.id === e.target.value
//                 );

//                 setEditDataObj((prevData) => ({
//                   ...prevData,
//                   expenseType: {
//                     id: e.target.value,
//                     allocatedAmount: selectedType?.allocatedAmount || 0,
//                     allocationType: selectedType?.allocationType || "",
//                   },
//                 }));
//               }}
//             >
//               {typesData.map((type) => (
//                 <MenuItem key={type.id} value={type.id}>
//                   {type.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <br />
//           <FormControl fullWidth variant="standard">
//             <InputLabel id="demo-simple-select-label">
//               Select Partner
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               label="Select Partner"
//               value={editDataObj?.partner?.id || ""}
//               onChange={(e) => {
//                 if (e.target.value) {
//                   setEditDataObj((prevData) => ({
//                     ...prevData,
//                     partner: { id: e.target.value },
//                   }));
//                 }
//               }}
//             >
//               {partners?.map((value) => {
//                 return (
//                   <MenuItem key={value.id} value={value.id}>
//                     {value.name}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>
//           <br />

//           <br />
//           <div className="flex justify-between">
//             <div className="w-2/5 m-1">
//               <TextField
//                 sx={{ minWidth: "100%" }}
//                 type="number"
//                 disabled={
//                   !!(editDataObj?.expenseType?.allocationType === "N/A") ||
//                   !!(editDataObj?.expenseType?.allocationType === "Aggregate")
//                 }
//                 label="No Internal Person"
//                 variant="standard"
//                 style={{ margin: "0 10px 10px 0" }}
//                 value={editDataObj?.noInternalPerson || ""}
//                 onChange={(e) =>
//                   setEditDataObj((prevObj) => ({
//                     ...prevObj,
//                     noInternalPerson: e.target.value,
//                   }))
//                 }
//               />
//             </div>

//             <div className="w-2/5 m-1">
//               <TextField
//                 sx={{ minWidth: "100%" }}
//                 type="number"
//                 disabled={
//                   !!(editDataObj?.expenseType?.allocationType === "N/A") ||
//                   !!(editDataObj?.expenseType?.allocationType === "Aggregate")
//                 }
//                 label="No External Person"
//                 variant="standard"
//                 style={{ margin: "0 10px 10px 0" }}
//                 value={editDataObj?.noExternalPerson || ""}
//                 onChange={(e) =>
//                   setEditDataObj((prevObj) => ({
//                     ...prevObj,
//                     noExternalPerson: e.target.value,
//                   }))
//                 }
//               />
//             </div>
//           </div>
//           {editDataObj?.expenseType?.allocationType === "Aggregate" && (
//             <div>
//               <p className="text-xl text-blue-700">
//                 {`The maximum allocated amount is ${editData?.expenseType?.allocatedAmount}`}
//               </p>
//             </div>
//           )}
//           {editData?.expenseType?.allocationType === "Person Wise" && (
//             <div>
//               <h1
//                 className={`text-lg my-2 ${
//                   budgetExceed ? "text-red-500" : "text-blue-600"
//                 }`}
//               >{`Total No of person ${
//                 Number(editDataObj?.noInternalPerson || 0) +
//                 Number(editDataObj?.noExternalPerson || 0)
//               }. The maximum allocated amount is ${maxAmount || 0}`}</h1>
//             </div>
//           )}

//           <br />
//           <FormControl sx={{ minWidth: "100%" }} required>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["DatePicker"]} require>
//                 <DatePicker
//                   format="DD-MMM-YYYY"
//                   sx={{ width: "100%" }}
//                   label="Expense Date"
//                   value={dayjs(editDataObj?.expenseDate)}
//                   onChange={(newValue) => {
//                     setEditDataObj((prevObj) => ({
//                       ...prevObj,
//                       expenseDate:
//                         new Date(newValue?.$d).toString() === "Invalid Date"
//                           ? new Date()?.toISOString()
//                           : new Date(newValue?.$d)?.toISOString(),
//                     }));
//                   }}
//                 />
//               </DemoContainer>
//             </LocalizationProvider>
//           </FormControl>
//           <TextField
//             sx={{ minWidth: "100%" }}
//             required
//             type="text"
//             label="Description"
//             variant="standard"
//             style={{ margin: "0 10px 10px 0" }}
//             value={editDataObj?.expenseDescription || ""}
//             onChange={(e) =>
//               setEditDataObj((prevObj) => ({
//                 ...prevObj,
//                 expenseDescription: e.target.value,
//               }))
//             }
//           />
//           <br />
//           <div className="border-t border-gray-500 my-4"></div>

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
//         </DialogContent>
//         <DialogActions>
//           <Button
//             color="info"
//             variant="contained"
//             onClick={() => {
//               setOpenEditPopOver(true);
//               setStatusEdited("Draft");
//             }}
//           >
//             Save as draft
//           </Button>
//           <Button
//             color="warning"
//             variant="contained"
//             onClick={() => {
//               setOpenEditPopOver(true);
//               setStatusEdited("In Signing");
//             }}
//           >
//             Send for approval
//           </Button>
//           <Button
//             color="inherit"
//             variant="contained"
//             onClick={handleEditCancel}
//           >
//             Cancel
//           </Button>
//           <>
//             <Dialog
//               fullScreen={fullScreen}
//               open={openEditPopOver}
//               onClose={() => setOpenEditPopOver(false)}
//             >
//               <DialogContent>
//                 {" "}
//                 Are you sure you want to Edit?
//                 <br />
//               </DialogContent>

//               <DialogActions>
//                 <Button
//                   onClick={() => {
//                     setOpenEditPopOver(false);
//                     handleEditOk();
//                   }}
//                 >
//                   Yes
//                 </Button>
//                 <Button
//                   onClick={() => {
//                     setOpenEditPopOver(false);
//                   }}
//                 >
//                   No
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </>
//         </DialogActions>
//       </Dialog>
//     );
//   };

//   //end edit modal ===============================================>
//   //start delete modal ===============================================>
//   const [deleteModal, setDeleteModal] = React.useState(false);
//   const [deleteData, setDeleteData] = React.useState();
//   const handleDeleteOk = () => {
//     axiosPrivateFormData
//       .delete(`/expense-bill/delete-bill/${deleteData.id}`)
//       .then((res) => {
//         let tempData = initialData.filter((obj) => {
//           return obj.id !== deleteData.id;
//         });
//         setInitialData(tempData);
//         toast.success("Deleted Successfully");
//       })
//       .catch((err) => {
//         toast.error(err?.response?.data?.message);
//         console.error("Error creating expense:", err?.response?.data?.message);
//       });

//     setDeleteModal(false);
//   };
//   const handleDeleteCancel = () => {
//     setDeleteModal(false);
//   };

//   const deleteModalUI = () => {
//     return (
//       <Dialog
//         fullScreen={fullScreen}
//         open={deleteModal}
//         onClose={() => setDeleteModal(false)}
//       >
//         <DialogContent>Are you sure you want to delete?</DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => {
//               setDeleteModal(false);
//               handleDeleteOk();
//             }}
//           >
//             Yes
//           </Button>
//           <Button onClick={handleDeleteCancel}>No</Button>
//         </DialogActions>
//       </Dialog>
//     );
//   };
//   //Specify Column
//   const columns = [
//     {
//       accessorKey: "advanceReqNo",
//       header: "AdvanceReqNo",
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"advanceReqNo"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
    
//     {
//       accessorKey: "expenseBillNo",
//       header: "Expense BillNo",
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"expenseBillNo"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
//     {
//       accessorKey: "isClientPayable",
//       header: "Client Payable",
//       Cell: ({ renderedCellValue }) => (
//         <div style={{ textAlign: "left" }}>
//           {renderedCellValue ? "Yes" : "No"}
//         </div>
//       ),
//       size: 100,
//     },
//     {
//       accessorKey: "company.name",
//       header: "Company",
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"company"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
//     {
//       accessorKey: "unit.name",
//       header: "Unit",
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"unit"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
//     {
//       accessorKey: "department.name",
//       header: "Department",
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"department"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
//     {
//       accessorKey: "expenseCategory.name",
//       header: "ExpenseCategory",
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"expenseCategory"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
//     {
//       accessorKey: "expenseType.name",
//       header: "ExpenseType",
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"expenseType"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
//     {
//       accessorKey: "partner.name",
//       header: "Partner",
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"partner"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },

//     {
//       accessorKey: "allocatedAmount",
//       header: "Allocated Amount",
//       Cell: ({ renderedCellValue, row }) => {
//         return new Intl.NumberFormat("en-US").format(renderedCellValue);
//       },
//       muiTableHeadCellProps: {
//         align: "right",
//       },
//       muiTableBodyCellProps: {
//         align: "right",
//       },
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"allocatedAmount"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
//     {
//       accessorKey: "totalBillAmount",
//       header: "Total Bill Amount",
//       Cell: ({ renderedCellValue, row }) => {
//         return new Intl.NumberFormat("en-US").format(renderedCellValue);
//       },
//       muiTableHeadCellProps: {
//         align: "right",
//       },
//       muiTableBodyCellProps: {
//         align: "right",
//       },
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"totalBillAmount"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
//     {
//       accessorKey: "expenseDate",
//       header: "Expense Date",
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"expenseDate"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },

//     {
//       accessorKey: "noInternalPerson",
//       header: "InternalPerson",

//       muiTableBodyCellProps: {
//         align: "center",
//       },
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"noInternalPerson"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
//     {
//       accessorKey: "noExternalPerson",
//       header: "ExternalPerson",
//       muiTableBodyCellProps: {
//         align: "center",
//       },
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"noExternalPerson"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       Filter: () => (
//         <FormControlFilter
//           filterData={["Draft", "In Signing", "Approved", "Returned"]}
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"status"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//       Cell: (cellObj) => {
//         if (cellObj.renderedCellValue === "Cancelled") {
//           return (
//             <span style={{ color: "red" }}>{cellObj.renderedCellValue}</span>
//           );
//         } else if (cellObj.renderedCellValue === "Send") {
//           return (
//             <span style={{ color: "green" }}>{cellObj.renderedCellValue}</span>
//           );
//         } else {
//           return cellObj.renderedCellValue;
//         }
//       },
//     },

//     {
//       accessorKey: "createdDate",
//       header: "Created at",
//       Filter: () => (
//         <TextFieldSearch
//           searchData={searchData}
//           setSearchData={setSearchData}
//           objKey={"createdDate"}
//           paramAddress={"/expense/myBill"}
//         />
//       ),
//     },
//   ];

//   return (
//     <>
//       <Helmet>
//         <title>RMS |My Bill</title>
//       </Helmet>
//       <Header category="Page" title="My Bill" />

//       <div style={{ marginTop: "16px" }}>
//         <MaterialReactTable
//           columns={columns}
//           data={filterData}
//           enableColumnResizing
//           enableGrouping
//           enableStickyHeader
//           enableStickyFooter
//           enableRowActions
//           enablePinning
//           enableColumnOrdering
//           enableGlobalFilter={false}
//           initialState={{
//             filterFn: "fuzzy",
//             density: "comfortable",
//             expanded: false,
//             pagination: { pageIndex: 0, pageSize: 25 },
//             showColumnFilters: false,
//           }}
//           state={{
//             isLoading: loading,
//           }}
//           renderTopToolbarCustomActions={({ table }) => (
//             <Box sx={{ display: "flex", gap: "1rem", p: "10px" }}>
//               <Button
//                 variant="contained"
//                 sx={{
//                   display: "flex",
//                   gap: "4px",
//                   backgroundColor: "#0096FF	",
//                 }}
//                 onClick={() => {
//                   setAddModal(true);
//                 }}
//                 color="error"
//               >
//                 Reimbursement
//               </Button>
//             </Box>
//           )}
//           renderRowActions={({ row, table }) => {
//             return (
//               <Box
//                 sx={{
//                   marginLeft: "10px",
//                   display: "flex",
//                   justifyContent: "center",
//                 }}
//               >
//                 {(row.original.status === "Draft" ||
//                   row.original.state === "Returned") && (
//                   <Tooltip arrow title="Edit" placement="top">
//                     <IconButton
//                       color="primary"
//                       key={1}
//                       onClick={() => {
//                         setEditModal(true);
//                         setEditData(row.original);
//                       }}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                   </Tooltip>
//                 )}
//                 <Tooltip arrow title="View word-order" placement="top">
//                   <IconButton
//                     color="primary"
//                     key={2}
//                     onClick={() => {
//                       navigate(`/expense/myBill/${row.original.id}`);
//                     }}
//                   >
//                     <VisibilityIcon />
//                   </IconButton>
//                 </Tooltip>
//                 {row.original?.status === "Draft" && (
//                   <Tooltip arrow title="Delete" placement="top">
//                     <IconButton
//                       color="error"
//                       key={2}
//                       onClick={() => {
//                         setDeleteModal(true);
//                         setDeleteData(row.original);
//                       }}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </Tooltip>
//                 )}
//               </Box>
//             );
//           }}
//           muiToolbarAlertBannerChipProps={{ color: "primary" }}
//           displayColumnDefOptions={{
//             "mrt-row-actions": {
//               muiTableHeadCellProps: {
//                 align: "center",
//               },

//               size: 150,
//             },
//           }}
//           muiTableContainerProps={{
//             sx: { maxHeight: 700 },
//           }}
//           muiTableHeadCellProps={{
//             sx: (theme) => ({
//               background: "#ceeaf5",
//               color: "#000000",
//               fontWeight: "semi-bold",
//             }),
//           }}
//         />
//       </div>
//       {/* Add Modal UI*/}
//       <>{addModalUI()}</>
//       {/* edit Modal UI*/}
//       <>{editModalUI()}</>
//       <>{deleteModalUI()}</>
//     </>
//   );
// };

// export default MyBill;
