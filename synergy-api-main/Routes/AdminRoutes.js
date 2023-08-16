const express = require('express');
const router = express.Router();

const authController = require('../Admin-controllers/auth');
const validation = require('../middleware/validation');
router.post('/signup',validation.signupValidation ,authController.signup);
router.post('/login', validation.loginValidation,authController.login);
router.post('/logout',authController.logout);
router.post('/verify',authController.verify);

const carrierController = require('../Admin-controllers/Carriers.controller');
router.get('/carrier', carrierController.getAll);
router.get('/carrier-all', carrierController.findAndCountAll);
router.post('/carrier/', carrierController.create);
router.get('/carrier/:id', carrierController.find);
router.patch('/carrier/:id', carrierController.update);
router.delete('/carrier/:id', carrierController.delete);

//Get a list of all Employee
const employeeController = require('../Admin-controllers/Employee.controller');
router.get('/employee/', employeeController.getAll);
router.get('/employee-get-branch/', employeeController.assignBranchGet);
router.get('/employee-view/',employeeController.viewEmployee);
router.get('/employee-all/', employeeController.findAndCountAll);
router.post('/employee/', employeeController.create);
router.get('/employee/:id', employeeController.find);
router.patch('/employee/:id', employeeController.update);
router.delete('/employee/:id', employeeController.delete);

//Get a list of all Role
const employeeRoleController = require('../Admin-controllers/EmployeeRoles.controller');
router.get('/employee-role/', employeeRoleController.getAll);
router.post('/employee-role/', employeeRoleController.create);
router.get('/employee-role/:id', employeeRoleController.find);
router.patch('/employee-role/:id', employeeRoleController.update);
router.delete('/employee-role/:id', employeeRoleController.delete);
router.get('/employee-role-all', employeeRoleController.findAndCountAll);

//Get a list of all Charges
const chargesController = require('../Admin-controllers/Charges.controller');
router.get('/charges/', chargesController.getAll);
router.get('/view-charges/:id', chargesController.viewallcharge);
router.get('/freight-charges/', chargesController.getFreightCharges);
router.get('/get-air-freight/', chargesController.getAFCHAR);
router.get('/common-charges/', chargesController.getCommonCharges);
router.post('/charges/', chargesController.create);
router.get('/charges/:id', chargesController.find);
router.patch('/charges/:id', chargesController.update);
router.delete('/charges/:id', chargesController.delete);
router.get('/charges-all/', chargesController.findAndCountAll);
router.get('/load-charge-types/', chargesController.loadChargeTypes);
router.get('/load-carrier-types/', chargesController.loadCarrierTypes);

//Get a list of all Currency
const currencyController = require('../Admin-controllers/Currency.controller');
router.get('/currency/', currencyController.getAll);
router.post('/currency/', currencyController.create);
router.get('/currency/:id', currencyController.find);
router.patch('/currency/:id', currencyController.update);
router.delete('/currency/:id', currencyController.delete);
router.get('/currency-all/', currencyController.findAndCountAll);

//Get a list of all Unit Of Measurment
const UnitOfMeasurmentController = require('../Admin-controllers/UnitOfMeasurment.controller');
router.get('/uom/', UnitOfMeasurmentController.getAll);
router.get('/uom-all/', UnitOfMeasurmentController.findAndCountAll);
router.post('/uom/', UnitOfMeasurmentController.create);
router.get('/uom/:id', UnitOfMeasurmentController.find);
router.patch('/uom/:id', UnitOfMeasurmentController.update);
router.delete('/uom/:id', UnitOfMeasurmentController.delete);

//Get a list of all SeaPort
const SeaPortController = require('../Admin-controllers/SeaPort.controller');
router.get('/seaport/', SeaPortController.getAll);
router.post('/seaport/', SeaPortController.create);
router.get('/seaport/:id', SeaPortController.find);
router.patch('/seaport/:id', SeaPortController.update);
router.delete('/seaport/:id', SeaPortController.delete);
router.get('/seaport-all/', SeaPortController.findAndCountAll);

//Get a list of all SeaPort
const employeeDesignationController = require('../Admin-controllers/EmployeeDesignation.controller');
router.get('/employee-designation/', employeeDesignationController.getAll);
router.post('/employee-designation/', employeeDesignationController.create);
router.get('/employee-designation/:id', employeeDesignationController.find);
router.patch('/employee-designation/:id', employeeDesignationController.update);
router.delete('/employee-designation/:id', employeeDesignationController.delete);
router.get('/employee-designation-all', employeeDesignationController.findAndCountAll);

//Get a list of all SeaPort
const employeeDepartmentController = require('../Admin-controllers/EmployeeDepartment.controller');
router.get('/employee-department/', employeeDepartmentController.getAll);
router.get('/employee-department-all/', employeeDepartmentController.findAndCountAll);
router.post('/employee-department/', employeeDepartmentController.create);
router.get('/employee-department/:id', employeeDepartmentController.find);
router.patch('/employee-department/:id', employeeDepartmentController.update);
router.delete('/employee-department/:id', employeeDepartmentController.delete);

//Get a list of all Container
const containerController = require('../Admin-controllers/Container.controller');
router.get('/container/', containerController.getAll);
router.post('/container/', containerController.create);
router.get('/container/:id', containerController.find);
router.patch('/container/:id', containerController.update);
router.delete('/container/:id', containerController.delete);
router.get('/container-all', containerController.findAndCountAll);

//Get a list of all Vessels
const vesselsController = require('../Admin-controllers/Vessels.controller');
router.get('/vessels/', vesselsController.getAll);
router.post('/vessels/', vesselsController.create);
router.get('/vessels/:id', vesselsController.find);
router.patch('/vessels/:id', vesselsController.update);
router.delete('/vessels/:id', vesselsController.delete);
router.get('/vessels-all/', vesselsController.findAndCountAll);

//Get a list of all IncoTerms
const incoTermController = require('../Admin-controllers/IncoTerm.controller');
router.get('/inco-term', incoTermController.getAll);
router.post('/inco-term/', incoTermController.create);
router.get('/inco-term/:id', incoTermController.find);
router.patch('/inco-term/:id', incoTermController.update);
router.delete('/inco-term/:id', incoTermController.delete);
router.get('/inco-term-all', incoTermController.findAndCountAll);

//Get a list of all Sales man
const salesManMappingController = require('../Admin-controllers/SalesManMapping.controller');
router.get('/sales-man-mapping', salesManMappingController.getAll);
router.post('/sales-man-mapping/', salesManMappingController.create);
router.get('/sales-man-mapping/:id', salesManMappingController.find);
router.patch('/sales-man-mapping/:id', salesManMappingController.update);
router.delete('/sales-man-mapping/:id', salesManMappingController.delete);

//Get a list of all Charges Mapping
const chargesMappingController = require('../Admin-controllers/ChargesMapping.controller');
router.get('/charges-mapping', chargesMappingController.getAll);
router.get('/charges-mapping-all/', chargesMappingController.findAndCountAll);
router.post('/charges-mapping/', chargesMappingController.create);
router.get('/charges-mapping/:id', chargesMappingController.find);
router.patch('/charges-mapping/:id', chargesMappingController.update);
router.delete('/charges-mapping/:id', chargesMappingController.delete);

//Get a list of all Charges Mapping
const ChargesSegmentMapping = require('../Admin-controllers/ChargesSegmentMapping.controller');
router.get('/charges-segment-mapping', ChargesSegmentMapping.getAll);
router.get('/charges-segment-quote', ChargesSegmentMapping.getChargesQuote);
router.get('/charges-segment-mapping-all/', ChargesSegmentMapping.findAndCountAll);
router.get('/charges-segment-mapping-view/',ChargesSegmentMapping.viewChargeSegmapping);
router.post('/charges-segment-mapping/', ChargesSegmentMapping.create);
router.get('/charges-segment-mapping/:id', ChargesSegmentMapping.find);
router.get('/load-segments', ChargesSegmentMapping.loadSegments);
router.get('/load-movement-type', ChargesSegmentMapping.loadMovement);
router.patch('/charges-segment-mapping/:id', ChargesSegmentMapping.update);
router.delete('/charges-segment-mapping/:id', ChargesSegmentMapping.delete);

//Get a list of all Sailing Schedule
const SailingScheduleController = require('../Admin-controllers/SailingSchedule.controller');
router.get('/sailing-schedule', SailingScheduleController.getAll);
router.get('/sailing-schedule-all/', SailingScheduleController.findAndCountAll);
router.get('/sailing-schedule-view/',SailingScheduleController.viewSailingSchedule);
router.post('/sailing-schedule/', SailingScheduleController.create);
router.get('/sailing-schedule/:id', SailingScheduleController.find);
router.patch('/sailing-schedule/:id', SailingScheduleController.update);
router.delete('/sailing-schedule/:id', SailingScheduleController.delete);

//Get a list of all Customers
const CustomerController = require('../Admin-controllers/Customers.controller');
router.get('/customers', CustomerController.getAll);
router.post('/customers/', CustomerController.create);
router.get('/customers/:id', CustomerController.find);
router.patch('/customers/:id', CustomerController.update);
router.delete('/customers/:id', CustomerController.delete);
router.get('/load-countries', CustomerController.loadCountries);

//Get a list of all Countries
const CountriesController = require('../Admin-controllers/Countries.controller');
router.get('/countries', CountriesController.getAll);
router.get('/countries-all', CountriesController.findAndCountAll);
router.post('/countries/', CountriesController.create);
router.get('/countries/:id', CountriesController.find);
router.patch('/countries/:id', CountriesController.update);
router.delete('/countries/:id', CountriesController.delete);
router.get('/load-state/:id',CountriesController.getState);
router.get('/load-city/:id',CountriesController.getCity);
router.get('/countries-all-view/:id',CountriesController.viewAllCountries);

//Get a list of all Customer Details
const CustomerDetailsController = require('../Admin-controllers/CustomerDetails.controller');
router.get('/customer-details', CustomerDetailsController.getAll);
router.get('/customer-details-all', CustomerDetailsController.findAndCountAll);
router.post('/customer-details/', CustomerDetailsController.create);
router.get('/customer-details/:id', CustomerDetailsController.find);
router.get('/customer-details-name-address-edit/:id', CustomerDetailsController.findNameAddressEdit);
router.get('/customer-details-name-address-view/:id', CustomerDetailsController.viewCustomerDetails);
router.patch('/customer-details/:id', CustomerDetailsController.update);
router.delete('/customer-details/:id', CustomerDetailsController.delete);
router.get('/customer-master-details', CustomerDetailsController.getMasterCompany);

const BankDetailsController = require('../Admin-controllers/BankDetails.controller');
router.get('/bank-details', BankDetailsController.getAll);
router.post('/bank-details/', BankDetailsController.create);
router.get('/bank-details/:id', BankDetailsController.findNameEdit);
router.get('/bank-details-edit/:id', BankDetailsController.findBankEdit);
router.patch('/bank-details/:id', BankDetailsController.update);
router.delete('/bank-details/:id', BankDetailsController.delete);

//Get a list of all Air Port
const AirPortController = require('../Admin-controllers/AirPorts.controller');
router.get('/air-ports/', AirPortController.getAll);
router.get('/air-ports-quote/', AirPortController.getAllForQuote);
router.post('/air-ports/', AirPortController.create);
router.get('/air-ports/:id', AirPortController.find);
router.patch('/air-ports/:id', AirPortController.update);
router.delete('/air-ports/:id', AirPortController.delete);
router.get('/air-ports-all/', AirPortController.findAndCountAll);

//Get a list of all Air Line Carrier
const AirLineCarrierController = require('../Admin-controllers/AirLineCarrier.controller');
router.get('/air-line-carrier/', AirLineCarrierController.getAll);
router.post('/air-line-carrier/', AirLineCarrierController.create);
router.get('/air-line-carrier/:id', AirLineCarrierController.find);
router.patch('/air-line-carrier/:id', AirLineCarrierController.update);
router.delete('/air-line-carrier/:id', AirLineCarrierController.delete);
router.get('/air-line-carrier-all/', AirLineCarrierController.findAndCountAll);

//Get a list of all Air Line Schedules
const AirLineScheduleController = require('../Admin-controllers/AirLineShedule.controller');
router.get('/air-line-schedule/', AirLineScheduleController.getAll);
router.post('/air-line-schedule/', AirLineScheduleController.create);
router.get('/air-line-schedule', AirLineScheduleController.find);
router.patch('/air-line-schedule/:id', AirLineScheduleController.update);
router.delete('/air-line-schedule/:id', AirLineScheduleController.delete);
router.get('/get-slab-rates', AirLineScheduleController.findAndCountAll);
router.get('/cargo-list/', AirLineScheduleController.cargoList);
router.get('/cargo-list-quote/', AirLineScheduleController.cargoListQuote);

//Get a list of all Super Admin Companies
const PASuperAdminCompany = require('../Admin-controllers/PASuperAdminCompany.controller');
router.get('/super-admin-company/', PASuperAdminCompany.getAll);
router.post('/super-admin-company/', PASuperAdminCompany.create);
router.get('/super-admin-company/:id', PASuperAdminCompany.find);
router.patch('/super-admin-company/:id', PASuperAdminCompany.update);
router.delete('/super-admin-company/:id', PASuperAdminCompany.delete);
router.get('/super-admin-company-all/', PASuperAdminCompany.findAndCountAll);
router.get('/super-admin-company-view/:id',PASuperAdminCompany.viewPASuperAdminCompany)

//Get a list of all Superf Admin Logins
const SuperAdminLogin = require('../Admin-controllers/SuperAdminLogin.controller');
router.get('/super-admin-login-all/', SuperAdminLogin.getAll);
router.post('/super-admin-login/', SuperAdminLogin.create);
router.get('/super-admin-login/:id', SuperAdminLogin.find);
router.patch('/super-admin-login/:id', SuperAdminLogin.update);
router.delete('/super-admin-login/:id', SuperAdminLogin.delete);

//Get a list of all super admin country Company
const SACompanyCountry = require('../Admin-controllers/SACompanyCountry.controller');
router.get('/super-admin-country-company/get-all/:id', SACompanyCountry);
router.use('/super-admin-country-company/', SACompanyCountry);
router.put('/super-admin-country-company/:id', SACompanyCountry);
router.get('/super-admin-country-company/view/:id',SACompanyCountry);

//Get a list of all company branches
const CompanyBranchController = require('../Admin-controllers/SACompanyBranches.controller');
router.get('/company-branch-get-all/', CompanyBranchController.findAndCountAll);
router.get('/company-branch-view',CompanyBranchController.viewSABranches);
router.post('/company-branch/', CompanyBranchController.create);
router.get('/company-branch/:id', CompanyBranchController.find);
router.patch('/company-branch/:id', CompanyBranchController.update);
router.delete('/company-branch/:id', CompanyBranchController.delete);

// //Get a list of all admin logins
const AdminLoginController = require('../Admin-controllers/AdminLogin.controller');
// router.get('/admin-login-get-all/', AdminLoginController.getAll);
// router.post('/admin-login/', AdminLoginController.create);
// router.get('/admin-login/:id', AdminLoginController.find);
// router.get('/admin-login-email/:id', AdminLoginController.checkEmail);
// router.get('/admin-get-country/:id', AdminLoginController.getCountry);
// router.get('/admin-branch-load/', AdminLoginController.getBranches);
// router.patch('/admin-login/:id', AdminLoginController.update);
// router.delete('/admin-login/:id', AdminLoginController.delete);

const BranchAssigningController = require('../Admin-controllers/BranchAssigning.controller');
router.get('/get-employees-assigned', BranchAssigningController.getAll);
router.get('/get-branches-assigned', BranchAssigningController.getBranchesEmp);
router.get('/load-branches-assigned', BranchAssigningController.loadBranchesEmp);
router.post('/assign-branches/', BranchAssigningController.create);
router.patch('/assign-branches-update', BranchAssigningController.update);
router.delete('/branches-assigned/:id', BranchAssigningController.delete);
router.get('/admin-get-country/:id', BranchAssigningController.getCountry);
router.get('/admin-branch-load/', BranchAssigningController.getBranches);

const quoteCarrierCharges = require('../Admin-controllers/QuoteCarrierCharges.controller');
router.post('/create-quote-carrier-charges/',quoteCarrierCharges.create)
router.post('/edit-chargeable-weight/',quoteCarrierCharges.editWeight)
router.patch('/edit-chargeable-weight/:id',quoteCarrierCharges.updateWeight)
router.patch('/create-quote-carrier-charges/:id',quoteCarrierCharges.update)
router.get('/package-total/:id',quoteCarrierCharges.packageWeight)
router.get('/get-carrier-quote-charges/:id',quoteCarrierCharges.find)
router.get('/get-common-charges-quote',quoteCarrierCharges.carrierCommonCharge)
router.get('/get-carrier-quote/:id',quoteCarrierCharges.getCarrier)
router.get('/get-carrier-count/:id',quoteCarrierCharges.countCarrier)
router.get('/get-carrier-quote-preview/:id',quoteCarrierCharges.getCarrierPreview)
router.get('/get-preview-quote/:id',quoteCarrierCharges.previewPortDet)
router.get('/get-preview-quote-packages/:id',quoteCarrierCharges.previewPackageDet)
router.get('/get-preview-quote-charges',quoteCarrierCharges.previewChargeDet)
router.get('/get-airlines',quoteCarrierCharges.getAirLines)
router.get('/load-added-own-airlines',quoteCarrierCharges.loadOwnAirlines)
router.get('/load-saved-airlines',quoteCarrierCharges.loadSavedAirLines)
router.get('/get-vendors',quoteCarrierCharges.getVendors)
router.delete('/delete-quote-charges/:id',quoteCarrierCharges.delete)
router.delete('/delete-carrier-charges/:id',quoteCarrierCharges.deleteFromCarrier)
router.delete('/delete-all-carrier-charges/:id',quoteCarrierCharges.deleteAllCarrier)

const AirQuoteNotesController = require('../Admin-controllers/AirQuoteNotes.controller');
router.get('/air-quote-notes-get-all/', AirQuoteNotesController.findAndCountAll);
router.post('/air-quote-notes/', AirQuoteNotesController.create);
router.get('/air-quote-notes/:id', AirQuoteNotesController.find);
router.patch('/air-quote-notes/:id', AirQuoteNotesController.update);
router.delete('/air-quote-notes/:id', AirQuoteNotesController.delete);

const quoteDocument = require('../Admin-controllers/QuoteDocument.controller');
router.use('/quote-document',quoteDocument);
router.put('/quote-document/:id',quoteDocument);
router.get('/quote-document/getDoc/:id',quoteDocument);
router.delete('/quote-document/deleteDoc/:id',quoteDocument);
router.get('/quote-document/download/:filename',quoteDocument)

module.exports = router;