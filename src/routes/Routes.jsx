import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/LayoutMain";
import Login_Page from "../pages/Login_Page";
import HomePage from "../pages/Dashboard/HomePage";
import PrivetRoute from "./PrivetRoute";
import CreateAttendance from "../pages/Dashboard/Attendance/CreateAttendance";
import Attendance from "../pages/Dashboard/Attendance/Attendance";
import EditAttendance from "../pages/Dashboard/Attendance/EditAttendance";

import LeavesList from "../pages/Dashboard/Leaves/LeavesList";
import CreateLeaves from "../pages/Dashboard/Leaves/CreateLeaves";
import EditLeaves from "../pages/Dashboard/Leaves/EditLeaves";

import Salaries from "../pages/Dashboard/Salaries/Salaries";
import CreateSalaries from "../pages/Dashboard/Salaries/CreateSalaries";
import EditSalaries from "../pages/Dashboard/Salaries/EditSalaries";

import Employee from "../pages/Dashboard/Employee/Employee";
import CreateEmployee from "../pages/Dashboard/Employee/CreateEmployee";
import EditEmployee from "../pages/Dashboard/Employee/EditEmployee";

import RolesList from "../pages/Dashboard/Roles/RolesList";
import EditRoles from "../pages/Dashboard/Roles/EditRoles";
import CreateRoles from "../pages/Dashboard/Roles/CreateRoles";

import CreatePhone from "../pages/Dashboard/PhonePage/CreatePhone";
import PhoneList from "../pages/Dashboard/PhonePage/PhoneList";
import PhoneDetailsEdit from "../pages/Dashboard/PhonePage/PhoneDetailsEdit";

import AppLabel from "../pages/Dashboard/AppLabel/AppLabel";
import CreateApplabel from "../pages/Dashboard/AppLabel/CreateApplabel";
import EditAppLabel from "../pages/Dashboard/AppLabel/EditAppLabel";

import TypesLists from "../pages/Dashboard/Types/TypesLists";
import TypesEdit from "../pages/Dashboard/Types/TypesEdit";
import TypesCreate from "../pages/Dashboard/Types/TypesCreate";


// import EditLoanBen from "../pages/Dashboard/LoanBeneficiary/EditLoanBen";
// import Owner from "../pages/Dashboard/Owner/Owner";
// import CreateOwner from "../pages/Dashboard/Owner/CreateOwner";
// import EditOwner from "../pages/Dashboard/Owner/EditOwner";
// import CreateLoanBeneficiary from "../pages/Dashboard/LoanBeneficiary/CreateLoanBeneficiary";
// import LoanBeneficiaryList from "../pages/Dashboard/LoanBeneficiary/LoanBeneficiaryList";
// import Floors from "../pages/Dashboard/Floors/Floors";
// import CreateFloors from "../pages/Dashboard/Floors/CreateFloors";
// import FloorsDetails from "../pages/Dashboard/Floors/FloorsDetails";
// import Projects from "../pages/Dashboard/Projects/Projects";
// import CreateProjects from "../pages/Dashboard/Projects/CreateProjects";
// import EditProjects from "../pages/Dashboard/Projects/EditProjects";
// import WorkProgressLists from "../pages/Dashboard/WorkProgress/WorkProgressLists";
// import WorkProgressCreate from "../pages/Dashboard/WorkProgress/WorkProgressCreate";
// import WorkProgressEdit from "../pages/Dashboard/WorkProgress/WorkProgressEdit";
// import ContractorBenLists from "../pages/Dashboard/ContractorBeneficary/ContractorBenLists";
// import ContractorBenCreate from "../pages/Dashboard/ContractorBeneficary/ContractorBenCreate";
// import ContractorBenEdit from "../pages/Dashboard/ContractorBeneficary/ContractorBenEdit";
// import ContractorAssignList from "../pages/Dashboard/ContractorAssign/ContractorAssignList";
// import ContractorAssignCreate from "../pages/Dashboard/ContractorAssign/ContractorAssignCreate";
// import ContractorAssignEdit from "../pages/Dashboard/ContractorAssign/ContractorAssignEdit";
// import BusinessProfile from "../pages/Dashboard/BusinessProfile/BusinessProfile";
// import CreateBusinessProfile from "../pages/Dashboard/BusinessProfile/CreateBusinessProfile";
// import EditBusinessProfile from "../pages/Dashboard/BusinessProfile/EditBusinessProfile";
// import ProjectsDetails from "../pages/Dashboard/Projects/ProjectsDetails";
// import FloorDetails from "../pages/Dashboard/Projects/FloorDetails";
// import FloorTypeDetails from "../pages/Dashboard/Projects/FloorTypeDetails";
import Brands from "../pages/Dashboard/Brands/Brands";
import EditBrands from "../pages/Dashboard/Brands/EditBrands";
import CreateBrand from "../pages/Dashboard/Brands/CreateBrands";
// import RenterBeneficiaries from "../pages/Dashboard/RenterBeneficiaries/RenterBeneficiaries";
// import RenterBeneficiariesCrete from "../pages/Dashboard/RenterBeneficiaries/RenterBeneficiariesCrete";
// import EditRenterBeneficiaries from "../pages/Dashboard/RenterBeneficiaries/EditRenterBeneficiaries";
// import CustomerBeneficiaries from "../pages/Dashboard/CustomerBeneficiaries/CustomerBeneficiaries";
// import CreateCustomerBeneficiaries from "../pages/Dashboard/CustomerBeneficiaries/CreateCustomerBen";
// import EditCustomerBen from "../pages/Dashboard/CustomerBeneficiaries/EditCustomerBen";
// import LoanInstallment from "../pages/Dashboard/LoanInstallment/LoanInstallment";
// import CreateInstallment from "../pages/Dashboard/LoanInstallment/CreateInstallment";
// import LoanTransactions from "../pages/Dashboard/LoanTransactions/LoanTransactions";
// import CreateTransactions from "../pages/Dashboard/LoanTransactions/CreateTransactions";
// import EditLoanTransactions from "../pages/Dashboard/LoanTransactions/EditLoanTransactions";
// import ContractorPaymentList from "../pages/Dashboard/ContractorPayment/ContractorPaymentList";
// import ContractorPaymentcreate from "../pages/Dashboard/ContractorPayment/ContractorPaymentcreate";
// import ContractorPaymentEdit from "../pages/Dashboard/ContractorPayment/ContractorPaymentEdit";
// import ContractorGurantorLists from "../pages/Dashboard/ContractorGurantor/ContractorGurantorLists";
// import ContractorGurantorCreate from "../pages/Dashboard/ContractorGurantor/ContractorGurantorCreate";
// import ContractorGuarantorEdit from "../pages/Dashboard/ContractorGurantor/ContractorGuarantorEdit";
import SupBenLists from "../pages/Dashboard/SuppliersBeneficary/SupBenLists";
import SupBencreate from "../pages/Dashboard/SuppliersBeneficary/SupBencreate";
import SupBenEdit from "../pages/Dashboard/SuppliersBeneficary/SupBenEdit";
// import EditInstallment from "../pages/Dashboard/LoanInstallment/EditInstallment";
// import Expenselist from "../pages/Dashboard/Expenses/Expenselist";
// import Expensecreate from "../pages/Dashboard/Expenses/Expensecreate";
// import Expenseedit from "../pages/Dashboard/Expenses/Expenseedit";
// import IncomeLists from "../pages/Dashboard/Incomes/IncomeLists";
// import Incomescreate from "../pages/Dashboard/Incomes/Incomescreate";
// import Incomesedit from "../pages/Dashboard/Incomes/Incomesedit";
// import LoanLogs from "../pages/Dashboard/LoanLogs/LoanLogs";
// import CreateFlateRent from "../pages/Dashboard/FlateRent/CreateFlateRent";
// import FlateRentList from "../pages/Dashboard/FlateRent/FlateRentList";
// import EditFlateRent from "../pages/Dashboard/FlateRent/EditFlateRent";
// import PropertyList from "../pages/Dashboard/Property/PropertyList";
// import CreateProperty from "../pages/Dashboard/Property/CreateProperty";
// import EditProperty from "../pages/Dashboard/Property/EditProperty";
// import PropertyPurchaseList from "../pages/Dashboard/PropertyPurchase/PropertyPurchaseList";
// import CreatePropertyPurchase from "../pages/Dashboard/PropertyPurchase/CreatePropertyPurchase";
// import EditPropertyPurchase from "../pages/Dashboard/PropertyPurchase/EditPropertyPurchase";
// import RentCollectionList from "../pages/Dashboard/RentCollection/RentCollectionList";
// import CreateRentCollection from "../pages/Dashboard/RentCollection/CreateRentCollection";
// import EditRentCollection from "../pages/Dashboard/RentCollection/EditRentCollection";
// import ProjectProgressList from "../pages/Dashboard/ProjectProgress/ProjectProgressList";
// import CreateProjectProgress from "../pages/Dashboard/ProjectProgress/CreateProjectProgress";
// import RepairRecordsList from "../pages/Dashboard/RepairRecords/RepairRecordsList";
// import CreateRepairRecords from "../pages/Dashboard/RepairRecords/CreateRepairRecords";
// import PropertyInstallmentlist from "../pages/Dashboard/PropertyInstallment/PropertyInstallmentlist";
// import PropertyInstallmentcreate from "../pages/Dashboard/PropertyInstallment/PropertyInstallmentcreate";
// import PropertyInstallmentedit from "../pages/Dashboard/PropertyInstallment/PropertyInstallmentedit";
// import Expensebypropertycreate from "../pages/Dashboard/ExpenseByProperty/Expensebypropertycreate";
// import ExpenseBypropertyedit from "../pages/Dashboard/ExpenseByProperty/ExpenseBypropertyedit";
// import ExpenseByPropertyList from "../pages/Dashboard/ExpenseByProperty/ExpenseByPropertyList";
// import CreateExpenseByProperty from "../pages/Dashboard/ExpenseByProperty/CreateExpenseByProperty";
// import EditExpenseByProperty from "../pages/Dashboard/ExpenseByProperty/EditExpenseByProperty";
// import EditRepairRecords from "../pages/Dashboard/RepairRecords/EditRepairRecords";
// import EditProjectProgress from "../pages/Dashboard/ProjectProgress/EditProjectProgress";
import WarehouseItemsList from "../pages/Dashboard/WarehouseItems/WarehouseItemsList";
import CreateWarehouseItems from "../pages/Dashboard/WarehouseItems/CreatewarehouseItems";
import EditWarehouseItems from "../pages/Dashboard/WarehouseItems/EditwarehouseItems";
import MaterialPurchaseList from "../pages/Dashboard/MaterialPurchase/MaterialPurchaseList";
import EditMaterialPurchase from "../pages/Dashboard/MaterialPurchase/EditMaterialPurchase";
import CreateMaterialPurchase from "../pages/Dashboard/MaterialPurchase/CreateMaterialPurchase";
import MaterialPaymentInstallmentList from "../pages/Dashboard/MaterialPaymentInstallment/MaterialPaymentInstallmentList";
import EditMaterialPaymentInstallment from "../pages/Dashboard/MaterialPaymentInstallment/EditMaterialPaymentInstallment";
import CreateMaterialPaymentInstallment from "../pages/Dashboard/MaterialPaymentInstallment/CreateMaterialPaymentInstallment";
import CreateMaterialDispatch from "../pages/Dashboard/MaterialDispatch/CreateMaterialDispatch";
import EditMaterialDispatch from "../pages/Dashboard/MaterialDispatch/EditMaterialDispatch";
import MaterialDispatchList from "../pages/Dashboard/MaterialDispatch/MaterialDispatchList";
import MaterialReceiveInstallmentList from "../pages/Dashboard/MaterialReceiveInstallmentList/MaterialReceiveInstallmentList";
import CreateMaterialReceiveInstallment from "../pages/Dashboard/MaterialReceiveInstallmentList/CreateMaterialReceiveInstallment";
import EditMaterialReceiveInstallment from "../pages/Dashboard/MaterialReceiveInstallmentList/EditMaterialReceiveInstallment";
import ProductInventoryList from "../pages/Dashboard/ProductInventory/ProductInventoryList";
import EditProductInventory from "../pages/Dashboard/ProductInventory/EditProductInventory";
import CreateProductInventory from "../pages/Dashboard/ProductInventory/CreateProductInventory";
import MaterialsList from "../pages/Dashboard/Materials/MaterialsList";
import CreateMaterials from "../pages/Dashboard/Materials/CreateMaterials";
import EditMaterials from "../pages/Dashboard/Materials/EditMaterials";
import CreateMaterialDispatchInventory from "../pages/Dashboard/MaterialDispatchInventory/CreateMaterialDispatchInventory";
import MaterialDispatchInventoryList from "../pages/Dashboard/MaterialDispatchInventory/MaterialDispatchInventoryList";
import EditMaterialDispatchInventory from "../pages/Dashboard/MaterialDispatchInventory/EditMaterialDispatchInventory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <PrivetRoute>
            <HomePage />
          </PrivetRoute>
        ),
      },
      {
        path: "/login",
        element: <Login_Page />,
      },
      // {
      //   path: "/beneficiarylist/loan-beneficiary-crete",
      //   element: (
      //     <PrivetRoute>
      //       <CreateLoanBeneficiary />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/beneficiarylist",
      //   element: (
      //     <PrivetRoute>
      //       <LoanBeneficiaryList />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/beneficiarylist/editloan",
      //   element: (
      //     <PrivetRoute>
      //       <EditLoanBen />
      //     </PrivetRoute>
      //   ),
      // },
      {
        path: "/phone",
        element: (
          <PrivetRoute>
            <PhoneList />
          </PrivetRoute>
        ),
      },
      {
        path: "/phone/createphone",
        element: (
          <PrivetRoute>
            <CreatePhone />
          </PrivetRoute>
        ),
      },
      {
        path: "/phone/editphone",
        element: (
          <PrivetRoute>
            <PhoneDetailsEdit />
          </PrivetRoute>
        ),
      },
      // employee
      {
        path: "/employee",
        element: (
          <PrivetRoute>
            <Employee />
          </PrivetRoute>
        ),
      },
      {
        path: "/employee/createemployee",
        element: (
          <PrivetRoute>
            <CreateEmployee />
          </PrivetRoute>
        ),
      },
      {
        path: "/employee/editemployee",
        element: (
          <PrivetRoute>
            <EditEmployee />
          </PrivetRoute>
        ),
      },
      // // Owner
      // {
      //   path: "/owner",
      //   element: (
      //     <PrivetRoute>
      //       <Owner />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/owner/createowner",
      //   element: (
      //     <PrivetRoute>
      //       <CreateOwner />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/owner/editeowner",
      //   element: (
      //     <PrivetRoute>
      //       <EditOwner />
      //     </PrivetRoute>
      //   ),
      // },
      // attendance
      {
        path: "/attendance",
        element: (
          <PrivetRoute>
            <Attendance />
          </PrivetRoute>
        ),
      },
      {
        path: "/attendance/createattendance",
        element: (
          <PrivetRoute>
            <CreateAttendance />
          </PrivetRoute>
        ),
      },
      {
        path: "/attendance/editeattendance",
        element: (
          <PrivetRoute>
            <EditAttendance />
          </PrivetRoute>
        ),
      },
      // // Projects
      // {
      //   path: "/projects",
      //   element: (
      //     <PrivetRoute>
      //       <Projects />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/projects/:projectId",
      //   element: (
      //     <PrivetRoute>
      //       <ProjectsDetails />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/projects/:id/floor-details",
      //   element: (
      //     <PrivetRoute>
      //       <FloorDetails />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/projects/:id/floor-details/:id",
      //   element: (
      //     <PrivetRoute>
      //       <FloorTypeDetails />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/projects/crete-projects",
      //   element: (
      //     <PrivetRoute>
      //       <CreateProjects />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/projects/editprojects",
      //   element: (
      //     <PrivetRoute>
      //       <EditProjects />
      //     </PrivetRoute>
      //   ),
      // },
      // // Business profile
      // {
      //   path: "/business-profile",
      //   element: (
      //     <PrivetRoute>
      //       <BusinessProfile />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/business-profile/crete-business-profile",
      //   element: (
      //     <PrivetRoute>
      //       <CreateBusinessProfile />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/business-profile/edit-business-profile",
      //   element: (
      //     <PrivetRoute>
      //       <EditBusinessProfile />
      //     </PrivetRoute>
      //   ),
      // },
      // Brand
      {
        path: "/brands",
        element: (
          <PrivetRoute>
            <Brands />
          </PrivetRoute>
        ),
      },
      {
        path: "/brands/create-brands",
        element: (
          <PrivetRoute>
            <CreateBrand />
          </PrivetRoute>
        ),
      },
      {
        path: "/brands/edit-brands",
        element: (
          <PrivetRoute>
            <EditBrands />
          </PrivetRoute>
        ),
      },
      // Salary
      {
        path: "/salary",
        element: (
          <PrivetRoute>
            <Salaries />
          </PrivetRoute>
        ),
      },
      {
        path: "/salary/crete-salaries",
        element: (
          <PrivetRoute>
            <CreateSalaries />
          </PrivetRoute>
        ),
      },
      {
        path: "/salary/edit-salary",
        element: (
          <PrivetRoute>
            <EditSalaries />
          </PrivetRoute>
        ),
      },
      // // renter
      // {
      //   path: "/renter-beneficiaries",
      //   element: (
      //     <PrivetRoute>
      //       <RenterBeneficiaries />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/renter-beneficiaries/renter-beneficiaries-crete",
      //   element: (
      //     <PrivetRoute>
      //       <RenterBeneficiariesCrete />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/renter-beneficiaries/edit-renter-beneficiaries",
      //   element: (
      //     <PrivetRoute>
      //       <EditRenterBeneficiaries />
      //     </PrivetRoute>
      //   ),
      // },
      // // renter
      // {
      //   path: "/customer-beneficiaries",
      //   element: (
      //     <PrivetRoute>
      //       <CustomerBeneficiaries />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/customer-beneficiaries/customer-beneficiaries-crete",
      //   element: (
      //     <PrivetRoute>
      //       <CreateCustomerBeneficiaries />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/customer-beneficiaries/edit-customer-beneficiaries",
      //   element: (
      //     <PrivetRoute>
      //       <EditCustomerBen />
      //     </PrivetRoute>
      //   ),
      // },
      // // loan-installment
      // {
      //   path: "/loan-installment",
      //   element: (
      //     <PrivetRoute>
      //       <LoanInstallment />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/loan-installment/create-loan-installment",
      //   element: (
      //     <PrivetRoute>
      //       <CreateInstallment />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/loan-installment/edit-loan-installment",
      //   element: (
      //     <PrivetRoute>
      //       <EditInstallment />
      //     </PrivetRoute>
      //   ),
      // },
      // // Loan-Transactions
      // {
      //   path: "/loan-transactions",
      //   element: (
      //     <PrivetRoute>
      //       <LoanTransactions />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/loan-transactions/create-loan-transactions",
      //   element: (
      //     <PrivetRoute>
      //       <CreateTransactions />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/loan-transactions/edit-loan-transactions",
      //   element: (
      //     <PrivetRoute>
      //       <EditLoanTransactions />
      //     </PrivetRoute>
      //   ),
      // },
      // // Loan-Logs
      // {
      //   path: "/loan-logs",
      //   element: (
      //     <PrivetRoute>
      //       <LoanLogs />
      //     </PrivetRoute>
      //   ),
      // },
      // // flat-rent
      // {
      //   path: "/flat-rent",
      //   element: (
      //     <PrivetRoute>
      //       <FlateRentList />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/flat-rent/flat-rent-crete",
      //   element: (
      //     <PrivetRoute>
      //       <CreateFlateRent />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/flat-rent/edit-flat-rent",
      //   element: (
      //     <PrivetRoute>
      //       <EditFlateRent />
      //     </PrivetRoute>
      //   ),
      // },      
      // // Property
      // {
      //   path: "/property",
      //   element: (
      //     <PrivetRoute>
      //       <PropertyList />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/property/property-crete",
      //   element: (
      //     <PrivetRoute>
      //       <CreateProperty />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/property/edit-property",
      //   element: (
      //     <PrivetRoute>
      //       <EditProperty />
      //     </PrivetRoute>
      //   ),
      // },      
      // // Property
      // {
      //   path: "/property-purchase",
      //   element: (
      //     <PrivetRoute>
      //       <PropertyPurchaseList />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/property-purchase/property-purchase-crete",
      //   element: (
      //     <PrivetRoute>
      //       <CreatePropertyPurchase />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/property-purchase/edit-property-purchase",
      //   element: (
      //     <PrivetRoute>
      //       <EditPropertyPurchase />
      //     </PrivetRoute>
      //   ),
      // },      
      // // repear-records
      // {
      //   path: "/repear-records",
      //   element: (
      //     <PrivetRoute>
      //       <RepairRecordsList />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/repear-records/repear-records-crete",
      //   element: (
      //     <PrivetRoute>
      //       <CreateRepairRecords />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/repear-records/edit-repear-records",
      //   element: (
      //     <PrivetRoute>
      //       <EditRepairRecords />
      //     </PrivetRoute>
      //   ),
      // },      
      // // Project Progress
      // {
      //   path: "/project-progress",
      //   element: (
      //     <PrivetRoute>
      //       <ProjectProgressList />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/project-progress/project-progress-crete",
      //   element: (
      //     <PrivetRoute>
      //       <CreateProjectProgress />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/project-progress/edit-project-progress",
      //   element: (
      //     <PrivetRoute>
      //       <EditProjectProgress />
      //     </PrivetRoute>
      //   ),
      // },      
      // // Property
      // {
      //   path: "/rent-collections",
      //   element: (
      //     <PrivetRoute>
      //       <RentCollectionList />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/rent-collections/rent-collections-crete",
      //   element: (
      //     <PrivetRoute>
      //       <CreateRentCollection />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/rent-collections/edit-rent-collections",
      //   element: (
      //     <PrivetRoute>
      //       <EditRentCollection />
      //     </PrivetRoute>
      //   ),
      // },      
      // Material Payment Installment
      {
        path: "/material-payment-installment",
        element: (
          <PrivetRoute>
            <MaterialPaymentInstallmentList />
          </PrivetRoute>
        ),
      },
      {
        path: "/material-payment-installment/material-payment-installment-crete",
        element: (
          <PrivetRoute>
            <CreateMaterialPaymentInstallment />
          </PrivetRoute>
        ),
      },
      {
        path: "/material-payment-installment/edit-material-payment-installment",
        element: (
          <PrivetRoute>
            <EditMaterialPaymentInstallment />
          </PrivetRoute>
        ),
      },      
      // Product Inventory
      {
        path: "/materials",
        element: (
          <PrivetRoute>
            <MaterialsList />
          </PrivetRoute>
        ),
      },
      {
        path: "/materials/materials-crete",
        element: (
          <PrivetRoute>
            <CreateMaterials />
          </PrivetRoute>
        ),
      },
      {
        path: "/materials/edit-materials",
        element: (
          <PrivetRoute>
            <EditMaterials />
          </PrivetRoute>
        ),
      },      
      // Product Inventory
      {
        path: "/product-inventory",
        element: (
          <PrivetRoute>
            <ProductInventoryList />
          </PrivetRoute>
        ),
      },
      {
        path: "/product-inventory/product-inventory-crete",
        element: (
          <PrivetRoute>
            <CreateProductInventory />
          </PrivetRoute>
        ),
      },
      {
        path: "/product-inventory/edit-product-inventory",
        element: (
          <PrivetRoute>
            <EditProductInventory />
          </PrivetRoute>
        ),
      },      
      // material-dispatch-inventory
      {
        path: "/material-dispatch-inventory",
        element: (
          <PrivetRoute>
            <MaterialDispatchInventoryList />
          </PrivetRoute>
        ),
      },
      {
        path: "/material-dispatch-inventory/material-dispatch-inventory-crete",
        element: (
          <PrivetRoute>
            <CreateMaterialDispatchInventory />
          </PrivetRoute>
        ),
      },
      {
        path: "/material-dispatch-inventory/edit-material-dispatch-inventory",
        element: (
          <PrivetRoute>
            <EditMaterialDispatchInventory />
          </PrivetRoute>
        ),
      },      
      // Material Purchase
      {
        path: "/material-receive-installment",
        element: (
          <PrivetRoute>
            <MaterialReceiveInstallmentList />
          </PrivetRoute>
        ),
      },
      {
        path: "/material-receive-installment/material-receive-installment-crete",
        element: (
          <PrivetRoute>
            <CreateMaterialReceiveInstallment />
          </PrivetRoute>
        ),
      },
      {
        path: "/material-receive-installment/edit-material-receive-installment",
        element: (
          <PrivetRoute>
            <EditMaterialReceiveInstallment />
          </PrivetRoute>
        ),
      },      
      // Material Purchase
      {
        path: "/material-dispatch",
        element: (
          <PrivetRoute>
            <MaterialDispatchList />
          </PrivetRoute>
        ),
      },
      {
        path: "/material-dispatch/material-dispatch-crete",
        element: (
          <PrivetRoute>
            <CreateMaterialDispatch />
          </PrivetRoute>
        ),
      },
      {
        path: "/material-dispatch/edit-material-dispatch",
        element: (
          <PrivetRoute>
            <EditMaterialDispatch />
          </PrivetRoute>
        ),
      },      
      // Material Purchase
      {
        path: "/material-purchase",
        element: (
          <PrivetRoute>
            <MaterialPurchaseList />
          </PrivetRoute>
        ),
      },
      {
        path: "/material-purchase/material-purchase-crete",
        element: (
          <PrivetRoute>
            <CreateMaterialPurchase />
          </PrivetRoute>
        ),
      },
      {
        path: "/material-purchase/edit-material-purchase",
        element: (
          <PrivetRoute>
            <EditMaterialPurchase />
          </PrivetRoute>
        ),
      },      
      // Warehouse Items
      {
        path: "/warehouse-items",
        element: (
          <PrivetRoute>
            <WarehouseItemsList />
          </PrivetRoute>
        ),
      },
      {
        path: "/warehouse-items/warehouse-items-crete",
        element: (
          <PrivetRoute>
            <CreateWarehouseItems />
          </PrivetRoute>
        ),
      },
      {
        path: "/warehouse-items/edit-warehouse-items",
        element: (
          <PrivetRoute>
            <EditWarehouseItems />
          </PrivetRoute>
        ),
      },      
      // Leaves
      {
        path: "/leaves",
        element: (
          <PrivetRoute>
            <LeavesList />
          </PrivetRoute>
        ),
      },
      {
        path: "/leaves/leaves-crete",
        element: (
          <PrivetRoute>
            <CreateLeaves />
          </PrivetRoute>
        ),
      },
      {
        path: "/leaves/edit-leaves",
        element: (
          <PrivetRoute>
            <EditLeaves />
          </PrivetRoute>
        ),
      },      
      // roles
      {
        path: "/roles",
        element: (
          <PrivetRoute>
            <RolesList />
          </PrivetRoute>
        ),
      },
      {
        path: "/roles/roles-crete",
        element: (
          <PrivetRoute>
            <CreateRoles />
          </PrivetRoute>
        ),
      },
      {
        path: "/roles/edit-roles",
        element: (
          <PrivetRoute>
            <EditRoles />
          </PrivetRoute>
        ),
      },      
      // // expense By Property
      // {
      //   path: "/expense-by-property",
      //   element: (
      //     <PrivetRoute>
      //       <ExpenseByPropertyList />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/expense-by-property/expense-by-property-crete",
      //   element: (
      //     <PrivetRoute>
      //       <CreateExpenseByProperty />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/expense-by-property/edit-expense-by-property",
      //   element: (
      //     <PrivetRoute>
      //       <EditExpenseByProperty />
      //     </PrivetRoute>
      //   ),
      // },      
      // // floors
      // {
      //   path: "/floors",
      //   element: (
      //     <PrivetRoute>
      //       <Floors />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/floors/floors-crete",
      //   element: (
      //     <PrivetRoute>
      //       <CreateFloors />
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/floors/:floorId",
      //   element: (
      //     <PrivetRoute>
      //       <FloorsDetails />
      //     </PrivetRoute>
      //   ),
      // },
      {
        path: "/app-label",
        element: (
          <PrivetRoute>
            <AppLabel></AppLabel>
          </PrivetRoute>
        ),
      },
      {
        path: "/app-label/create",
        element: (
          <PrivetRoute>
            <CreateApplabel></CreateApplabel>
          </PrivetRoute>
        ),
      },
      {
        path: "/app-label/edit",
        element: (
          <PrivetRoute>
            <EditAppLabel></EditAppLabel>
          </PrivetRoute>
        ),
      },
      // {
      //   path: "/work-progress",
      //   element: (
      //     <PrivetRoute>
      //       <WorkProgressLists></WorkProgressLists>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/work-progress/create",
      //   element: (
      //     <PrivetRoute>
      //       <WorkProgressCreate></WorkProgressCreate>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/work-progress/edit",
      //   element: (
      //     <PrivetRoute>
      //       <WorkProgressEdit></WorkProgressEdit>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-beneficaries",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorBenLists></ContractorBenLists>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-beneficaries/create",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorBenCreate></ContractorBenCreate>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-beneficaries/edit",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorBenEdit></ContractorBenEdit>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-assign",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorAssignList></ContractorAssignList>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-assign/create",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorAssignCreate></ContractorAssignCreate>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-assign/edit",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorAssignEdit></ContractorAssignEdit>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-payment",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorPaymentList></ContractorPaymentList>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-payment/create",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorPaymentcreate></ContractorPaymentcreate>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-payment/edit",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorPaymentEdit></ContractorPaymentEdit>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-guarantor",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorGurantorLists></ContractorGurantorLists>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-guarantor/create",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorGurantorCreate></ContractorGurantorCreate>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/contractor-guarantor/edit",
      //   element: (
      //     <PrivetRoute>
      //       <ContractorGuarantorEdit></ContractorGuarantorEdit>
      //     </PrivetRoute>
      //   ),
      // },
      {
        path: "/suppliers-beneficaries",
        element: (
          <PrivetRoute>
            <SupBenLists></SupBenLists>
          </PrivetRoute>
        ),
      },
      {
        path: "/suppliers-beneficaries/create",
        element: (
          <PrivetRoute>
            <SupBencreate></SupBencreate>
          </PrivetRoute>
        ),
      },
      {
        path: "/suppliers-beneficaries/edit",
        element: (
          <PrivetRoute>
            <SupBenEdit></SupBenEdit>
          </PrivetRoute>
        ),
      },
      {
        path: "/types",
        element: (
          <PrivetRoute>
            <TypesLists></TypesLists>
          </PrivetRoute>
        ),
      },
      {
        path: "/types/create",
        element: (
          <PrivetRoute>
            <TypesCreate></TypesCreate>
          </PrivetRoute>
        ),
      },
      {
        path: "/types/edit",
        element: (
          <PrivetRoute>
            <TypesEdit></TypesEdit>
          </PrivetRoute>
        ),
      },
      // {
      //   path: "/expense",
      //   element: (
      //     <PrivetRoute>
      //       <Expenselist></Expenselist>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/expense/create",
      //   element: (
      //     <PrivetRoute>
      //       <Expensecreate></Expensecreate>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/expense/edit",
      //   element: (
      //     <PrivetRoute>
      //       <Expenseedit></Expenseedit>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/income",
      //   element: (
      //     <PrivetRoute>
      //       <IncomeLists></IncomeLists>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/income/create",
      //   element: (
      //     <PrivetRoute>
      //       <Incomescreate></Incomescreate>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/income/edit",
      //   element: (
      //     <PrivetRoute>
      //       <Incomesedit></Incomesedit>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/property-installment",
      //   element: (
      //     <PrivetRoute>
      //       <PropertyInstallmentlist></PropertyInstallmentlist>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/property-installment/create",
      //   element: (
      //     <PrivetRoute>
      //       <PropertyInstallmentcreate></PropertyInstallmentcreate>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/property-installment/edit",
      //   element: (
      //     <PrivetRoute>
      //       <PropertyInstallmentedit></PropertyInstallmentedit>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/expense-by-property",
      //   element: (
      //     <PrivetRoute>
      //       <ExpenseByproplists></ExpenseByproplists>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/expense-by-property/create",
      //   element: (
      //     <PrivetRoute>
      //       <Expensebypropertycreate></Expensebypropertycreate>
      //     </PrivetRoute>
      //   ),
      // },
      // {
      //   path: "/expense-by-property/edit",
      //   element: (
      //     <PrivetRoute>
      //       <ExpenseBypropertyedit></ExpenseBypropertyedit>
      //     </PrivetRoute>
      //   ),
      // },
    ],
  },
]);
