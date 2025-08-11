export const BaseUrl = process.env.REACT_APP_API_BASE_URL;
export const ApiUrls :any = {
  LoginRequest: `${BaseUrl}/Users/Login`,
  NodeRequest: `${BaseUrl}/Nodes/GetNodes`,
  FleetRequest: `${BaseUrl}/Fleets/GetFleets`,
  ZoneRequest: `${BaseUrl}/Zones/GetZones`,
  NodeCreate: `${BaseUrl}/Nodes/CreateNode`,
  ZoneCreate: `${BaseUrl}/Zones/CreateZone`,
  FleetCreate: `${BaseUrl}/Fleets/CreateFleet`,
  HubCreate: `${BaseUrl}/Hubs/CreateHub`,
  NodeDropDown: `${BaseUrl}/Nodes/NodeDropDown`,
  ZoneDropDown: `${BaseUrl}/Zones/ZoneDropDown`,
  DeliveredShipments: `${BaseUrl}/Dashboard/DeliveredShipments`,
  TotalCapacity: `${BaseUrl}/Dashboard/TotalCapacity`,
  GetNodeTypesDropDown :`${BaseUrl}/NodeData/GetNodeTypesDropDown`,
};
export const    LoginRequest = `${BaseUrl}/Users/Login`;
export const NodeRequest = `${BaseUrl}/Nodes/GetNodes`;
export const FleetRequest = `${BaseUrl}/Fleets/GetFleets`;
export const ZoneRequest = `${BaseUrl}/Zones/GetZones`;
export const NodeCreate = `${BaseUrl}/Nodes/CreateNode`;
export const ZoneCreate = `${BaseUrl}/Zones/CreateZone`;
export const FleetCreate = `${BaseUrl}/Fleets/CreateFleet`;
export const HubCreate = `${BaseUrl}/Hubs/CreateHub`;
export const NodeDropDown = `${BaseUrl}/Nodes/NodeDropDown`;
export const ZoneDropDown=`${BaseUrl}/Zones/ZoneDropDown`;
export const DeliveredShipments = `${BaseUrl}/Dashboard/DeliveredShipments`;
export const TotalCapacity = `${BaseUrl}/Dashboard/TotalCapacity`;
export const ShippingDetails = `${BaseUrl}/Dashboard/ShippingDetails`;
export const GetUserInfo = `${BaseUrl}/Users/GetUserInfo`;
export const Messages = `${BaseUrl}/Dashboard/Messages`;
export const TodayReport = `${BaseUrl}/Dashboard/TodayReport`;
export const UserDropDown = `${BaseUrl}/Users/GetUsers`;
export const FleetType = `${BaseUrl}/Fleets/FleetTypeDropDown`;
export const NodeEdit = `${BaseUrl}/Nodes/UpdateNode`;
export const NodeDelete = `${BaseUrl}/Nodes/DeleteNode`;
export const HubEdit = `${BaseUrl}/Hubs/UpdateHub`;
export const HubDelete = `${BaseUrl}/Hubs/DeleteHub`;
export const FleetEdit =`${BaseUrl}/Fleets/UpdateFleet`;
export const FleetDelete =`${BaseUrl}/Fleets/DeleteFleet`;
export const GetLastLocation = `${BaseUrl}/GpsFleet/GetLastLocation`;
export const GetNode = `${BaseUrl}/Nodes/GetNode`;
export const CreateNodeData = `${BaseUrl}/NodeData/CreateNodeData`;
export const GetFleet =`${BaseUrl}/Fleets/GetFleet`;
export const GetAllNodeData = `${BaseUrl}/NodeData/GetAll`;
export const GetNodeData = `${BaseUrl}/NodeData/GetById`;
export const GetUser = `${BaseUrl}/Users/GetUser`;
export const GetUsersDropDown = `${BaseUrl}/Users/GetUsersDropDown`;
export const UpdateUser = `${BaseUrl}/Users/UpdateUser`;
export const GetRoles = `${BaseUrl}/Users/GetRoles`;
export const CreateUser = `${BaseUrl}/Users/CreateUser`;
export const DeleteUser = `${BaseUrl}/Users/DeleteUser`;
export const GetNodeTypesDropDown =`${BaseUrl}/NodeData/GetNodeTypesDropDown`;
export const UpdateNodeData =`${BaseUrl}/NodeData/UpdateNodeData`;
export const UpdateZone = `${BaseUrl}/Zones/UpdateZone`;
export const GetZone = `${BaseUrl}/Zones/GetZone`;
export const GetBundles = `${BaseUrl}/Bundles/GetBundles`;
export const GetAllParcel = `${BaseUrl}/Parcels/GetParcels`;
export const GetBundleParcels =`${BaseUrl}/Bundles/GetBundleParcels`;
export const GetParcel = `${BaseUrl}/Parcels/GetParcel`;
export const GetBundle = `${BaseUrl}/Bundles/GetBundle`;
export const ScanAcceptance = `${BaseUrl}/Jobs/ScanAcceptance`;
export const ScanDelivery = `${BaseUrl}/Jobs/ScanDelivery`;
export const BarcodeAssignment = `${BaseUrl}/Jobs/BarcodeAssignment`;
export const GetAllJobs = (id?: string) => {
  const query = id ? `?Search=${encodeURIComponent(id)}` : "";
  return `${BaseUrl}/Jobs/GetJobs${query}`;
};
export const GetParcelsReport =`${BaseUrl}/Report/GetParcelsReport`;
export const  GetFleetPerformansReport =`${BaseUrl}/Report/GetFleetPerformansReport`;
export const GetCustomers = `${BaseUrl}/Customers/GetCustomers`;
export const GetCustomer = `${BaseUrl}/Customers/GetCustomer`;
export const CreateCustomer =`${BaseUrl}/Customers/CreateCustomer`;
export const CreateContract = `${BaseUrl}/Customers/CreateContract`;
export const UpdateCustomer = `${BaseUrl}/Customers/UpdateCustomer`;
export const DeleteCustomer = `${BaseUrl}/Customers/DeleteCustomer`;
export const ZoneList = `${BaseUrl}/Dashboard/ZoneList`;
export const NodeDataServiceData = `${BaseUrl}/NodeData/NodeDataServiceData`;
export const ForgotPassword = `${BaseUrl}/Login/ForgotPassword`;
export const BlockOrUnblockCustomer = `${BaseUrl}/Customers/BlockOrUnblockCustomer`;
export const SetContractStatus = `${BaseUrl}/Customers/SetContractStatus`;
export const Search = `${BaseUrl}/Search`;
export const ScanReturn = `${BaseUrl}/Jobs/ScanReturn`;
export const GetTaxiLines = `${BaseUrl}/TaxiLine/GetTaxiLines`;
export const CreateTaxiLine = `${BaseUrl}/TaxiLine/CreateTaxiLine`;
export const GetExpressHubs = `${BaseUrl}/TaxiLine/GetExpressHubs`;
export const GetTaxiLine = `${BaseUrl}/TaxiLine/GetTaxiLine`;
export const UpdateTaxiLine  = `${BaseUrl}/TaxiLine/UpdateTaxiLine`;
export const GetTaxiLinesDropDown =`${BaseUrl}/TaxiLine/GetTaxiLinesDropDown`;
export const GetMission = `${BaseUrl}/Jobs/GetMission`;
export const GetFreeMission = `${BaseUrl}/Jobs/GetFreeMission`;
export const FleetSharedDropDown = `${BaseUrl}/Jobs/FleetSharedDropDown`;
export const AssignToFleet = `${BaseUrl}/Jobs/AssignToFleet`;
export const GetCustomersWallet = `${BaseUrl}/Financial/GetCustomersWallet`;
export const SetCredit = `${BaseUrl}/CreditWallet/SetCredit`; 
export const GetFinancialOrdersReport = `${BaseUrl}/Report/GetFinancialOrdersReport`;
export const GetCustomersDropDown = `${BaseUrl}/Customers/GetCustomersDropDown`;
export const GetFinancialParcelReport = `${BaseUrl}/Report/GetFinancialParcelsReport`;
export const GetFinancialDebtsReport = `${BaseUrl}/Report/GetFinancialDebtsReport`;
export const GetFinancialTransactionsReport = `${BaseUrl}/Report/GetFinancialTransactionsReport`;