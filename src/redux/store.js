import { configureStore } from "@reduxjs/toolkit";
import loanBeneficiary from "./slices/loanBeneficiarySlice";
import salaryReducer from "./slices/salariesSlice";
import floorsReducer from "./slices/floorSlice";
import businessProfileReducer from "./slices/BusinessProfileSlice";
import brandsReducer from "./slices/brandsSlice";
import phoneReducers from "./slices/phoneSlice";
import employeeReducers from "./slices/employeeSlice";
import ownerReducers from "./slices/ownerBeneficiarySlice";
import attendanceReducers from "./slices/AttendanceSlice";
import applabelReducer from "./slices/AppLabelSlice";
import projectsReducer from "./slices/ProjectsSlice";
import workprogressReducers from "./slices/WorkprogressSlice";
import ContractorBenReducers from "./slices/ContractorBenSlice";
import assignContractorReducers from "./slices/AssignContractorSlice";
import renterBeneficiaryReducer from "./slices/renterBeneficiarySlice";
import customersBenReducer from "./slices/customersBeneficiarySlice";
import loanInstallmentReducer from "./slices/loanInstallmentSlice";
import loanTransactionsReducer from "./slices/loanTransactionsSlice";
import loanLogsReducer from "./slices/loanLgsSlice";
import paymentContractorReducers from "./slices/PaymentContractorSlice";
import guarantorContractorReducers from "./slices/ContractorGurantorSlice";
import supplierBenSliceReducers from "./slices/SupplierBenSlice";
import TypesModuleSliceReducers from "./slices/TypesModuleSlice";
import expenseSliceReducers from "./slices/ExpenseSlice";
import incomeSliceReducers from "./slices/IncomeSlice";
import leavesReducer from "./slices/leavesSlice";
import propertySliceReducers from "./slices/PropertyInstallmentSlice";
//
import propertyReducer from "./slices/propertySlice";
import flateRentReducer from "./slices/flateRentSlice";
import rentCollectionReducer from "./slices/rentCollectionSlice";
import repairRecordsReducer from "./slices/repairRecordsSlice";
import projectProgressReducer from "./slices/projectProgressSlice";
import expenseByPropertyReducer from "./slices/ExpenseByPropertySlice";
import materialPurchaseReducer from "./slices/materialPurchaseSlice";
import materialPaymentInstallmentReducer from "./slices/materialPaymentInstallmentSlice";
import materialDispatchReducer from "./slices/materialDispatchSlice";
import productInventoryReducer from "./slices/productInventorySlice";
import materialReceiveInstallmentReducer from "./slices/materialReceiveInstallmentSlice";
import warehouseItemsReducer from "./slices/_warehouseItemsSlice";
import propertyPurchaseReducer from "./slices/_propertyPurchaseSlice";
import warehouseDispatchReducer from "./slices/_warehouseDispatchSlice";
import materialsReducer from "./slices/materialsSlice";
import materialDispatchInventoryReducer from "./slices/materialDispatchInventorySlice";
import rolesReducer from "./slices/_rolesSlice";


export const store = configureStore({
  reducer: {
    loanBeneficiary: loanBeneficiary,
    //
    rolesReducer: rolesReducer,
    propertyReducer: propertyReducer,
    materialsReducer: materialsReducer,
    materialPaymentInstallmentReducer: materialPaymentInstallmentReducer,
    materialReceiveInstallmentReducer: materialReceiveInstallmentReducer,
    warehouseDispatchReducer: warehouseDispatchReducer,
    productInventoryReducer: productInventoryReducer,
    warehouseItemsReducer: warehouseItemsReducer,
    materialDispatchReducer: materialDispatchReducer,
    materialPurchaseReducer: materialPurchaseReducer,
    leavesReducer: leavesReducer,
    propertyPurchaseReducer: propertyPurchaseReducer,
    flateRentReducer: flateRentReducer,
    rentCollectionReducer: rentCollectionReducer,
    repairRecordsReducer: repairRecordsReducer,
    projectProgressReducer: projectProgressReducer,
    expenseByPropertyReducer: expenseByPropertyReducer,
    //
    loanLogsReducer: loanLogsReducer,
    materialDispatchInventoryReducer: materialDispatchInventoryReducer,
    renterBeneficiaryReducer: renterBeneficiaryReducer,
    loanTransactionsReducer: loanTransactionsReducer,
    loanInstallmentReducer: loanInstallmentReducer,
    customersBenReducer: customersBenReducer,
    brandsReducer: brandsReducer,
    salaryReducer: salaryReducer,
    businessProfileReducer: businessProfileReducer,
    floorsReducer: floorsReducer,
    projectsReducer: projectsReducer,
    phoneReducers: phoneReducers,
    employeeReducers: employeeReducers,
    ownerReducers: ownerReducers,
    attendanceReducers: attendanceReducers,
    applabelReducer: applabelReducer,
    workprogressReducers: workprogressReducers,
    ContractorBenReducers: ContractorBenReducers,
    assignContractorReducers: assignContractorReducers,
    paymentContractorReducers: paymentContractorReducers,
    guarantorContractorReducers: guarantorContractorReducers,
    supplierBenSliceReducers: supplierBenSliceReducers,
    TypesModuleSliceReducers: TypesModuleSliceReducers,
    expenseSliceReducers: expenseSliceReducers,
    incomeSliceReducers: incomeSliceReducers,
    propertySliceReducers: propertySliceReducers,
  },
});
