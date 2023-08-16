const express = require('express');
const router = express.Router();

const authController = require('../User-controllers/auth');
const validation = require('../middleware/validation');
router.post('/signup',validation.signupValidation ,authController.signup);
router.post('/user-login', validation.loginValidation,authController.login);
router.post('/logout',authController.logout);
router.post('/verify',authController.verify)

const FclExportBookingController = require('../User-controllers/FclExportBooking.controller');
router.get('/fcl-export-booking', FclExportBookingController.getAll);
router.get('/fcl-export-booking-all', FclExportBookingController.findAndCountAll);
router.get('/fcl-export-booking-for-job', FclExportBookingController.getAllForJobs);
router.get('/fcl-export-booking-for-BOL/:id', FclExportBookingController.getAllForBOL);
router.get('/fcl-booking-job-details', FclExportBookingController.getAllBookingForJobs);
router.post('/fcl-export-booking/', FclExportBookingController.create);
router.get('/fcl-export-booking/:id', FclExportBookingController.find);
router.patch('/fcl-export-booking/:id', FclExportBookingController.update);
router.delete('/fcl-export-booking/:id', FclExportBookingController.delete);
router.get('/get-seaport-data', FclExportBookingController.getSeaportData);
router.get('/get-container-data', FclExportBookingController.getContainerData);
router.get('/get-incoterm-data', FclExportBookingController.getIncoTermData);
router.get('/get-incoterm-data/:id', FclExportBookingController.getIncoTermDataId);
router.get('/get-customer-data', FclExportBookingController.getCustomerData);
router.get('/get-customer-data/:id', FclExportBookingController.getCustomerDataId);
router.get('/load-packages-data', FclExportBookingController.getPackages);

const FclExportBookingContainerDetailsController = require('../User-controllers/FclExportBookingContainerDetails.controller');
router.get('/fcl-export-booking-containers-details', FclExportBookingContainerDetailsController.getAll);
router.get('/fcl-export-booking-containers-details-all', FclExportBookingContainerDetailsController.getAllForTable);
router.post('/fcl-export-booking-containers-details/', FclExportBookingContainerDetailsController.create);
router.get('/fcl-export-booking-containers-details/:id', FclExportBookingContainerDetailsController.find);
router.patch('/fcl-export-booking-containers-details/:id', FclExportBookingContainerDetailsController.update);
router.post('/fcl-export-booking-containers-details/:id', FclExportBookingContainerDetailsController.delete);

const FclExportBookingContainer = require('../User-controllers/fclExportBookingContainer.controller');
router.get('/fcl-export-booking-containers', FclExportBookingContainer.getAll);
router.post('/fcl-export-booking-containers/', FclExportBookingContainer.create);
router.get('/fcl-export-booking-containers/:id', FclExportBookingContainer.find);
router.patch('/fcl-export-booking-containers/:id', FclExportBookingContainer.update);
router.delete('/fcl-export-booking-containers/:id', FclExportBookingContainer.delete);

const FclBookingHistory = require('../User-controllers/FclBookingHistory.controller');
router.get('/fcl-export-booking-history/:id', FclBookingHistory.getAll);

const FclJobDetailsController = require('../User-controllers/FclJobDetails.controller');
router.get('/fcl-job-details', FclJobDetailsController.getAll);
router.post('/fcl-job-details/', FclJobDetailsController.create);
router.get('/fcl-job-details/:id', FclJobDetailsController.find);
router.patch('/fcl-job-details/:id', FclJobDetailsController.update);
router.delete('/fcl-job-details/:id', FclJobDetailsController.delete);

const FclJobAttachmentController = require('../User-controllers/FclJobAttachment.controller');
router.get('/fcl-job-attachment', FclJobAttachmentController.getAll);
router.post('/fcl-job-attachment/', FclJobAttachmentController.create);
router.get('/fcl-job-attachment/:id', FclJobAttachmentController.find);
router.patch('/fcl-job-attachment/:id', FclJobAttachmentController.update);
router.delete('/fcl-job-attachment/:id', FclJobAttachmentController.delete);

const PartyInfoController = require('../User-controllers/PartyInfo.controller');
router.get('/fcl-party-info', PartyInfoController.getAll);
router.post('/fcl-party-info/', PartyInfoController.create);
router.get('/fcl-party-info/:id', PartyInfoController.find);
router.patch('/fcl-party-info/:id', PartyInfoController.update);
router.delete('/fcl-party-info/:id', PartyInfoController.delete);

const LinerInformationController = require('../User-controllers/LinerInformation.controller');
router.get('/liner-info', LinerInformationController.getAll);
router.post('/liner-info/', LinerInformationController.create);
router.get('/liner-info/:id', LinerInformationController.find);
router.patch('/liner-info/:id', LinerInformationController.update);
router.delete('/liner-info/:id', LinerInformationController.delete);
router.get('/get-carrier/', LinerInformationController.getCarrierData);
router.get('/get-vessel/', LinerInformationController.getVesselData);
router.get('/get-sailing-schedule/', LinerInformationController.getSailingSchedule);

const FclChargesController = require('../User-controllers/FclCharges.controller');
router.get('/fcl-charges', FclChargesController.getAll);
router.post('/fcl-charges/', FclChargesController.create);
router.get('/fcl-charges/:id', FclChargesController.find);
router.patch('/fcl-charges/:id', FclChargesController.update);
router.delete('/fcl-charges/:id', FclChargesController.delete);
router.get('/charges-mapping-fcl/:id', FclChargesController.findChargesFcl);
router.get('/load-charges-fcl/', FclChargesController.getChargesFcl);
router.get('/load-currencies-fcl/', FclChargesController.getCurrenciesFcl);
router.get('/load-currencies-fcl/:id', FclChargesController.getCurrenciesFclId);
router.get('/load-uom-fcl/', FclChargesController.getUomFcl);

const FclVASController = require('../User-controllers/FclVAS.controller');
router.get('/fcl-vas', FclVASController.getAll);
router.post('/fcl-vas/', FclVASController.create);
router.get('/fcl-vas/:id', FclVASController.find);
router.patch('/fcl-vas/:id', FclVASController.update);
router.delete('/fcl-vas/:id', FclVASController.delete);
router.get('/customer-details-trucker', FclVASController.getCustomerTruker);

const FilesController = require('../User-controllers/FclFiles.controllers');
router.use('/files',FilesController);
router.put('/files/:id',FilesController);
router.get('/files/getFiles/:id',FilesController);

const GateOutController = require('../User-controllers/GateOut.controller');
router.get('/gate-out', GateOutController.getAll);
router.post('/gate-out/', GateOutController.create);
router.get('/gate-out/:id', GateOutController.find);
router.patch('/gate-out/:id', GateOutController.update);
router.delete('/gate-out/:id', GateOutController.delete);

const GateInController = require('../User-controllers/GateIn.controller');
router.get('/gate-in', GateInController.getAll);
router.post('/gate-in/', GateInController.create);
router.get('/gate-in/:id', GateInController.find);
router.patch('/gate-in/:id', GateInController.update);
router.delete('/gate-in/:id', GateInController.delete);

const ReleaseDateController = require('../User-controllers/ReleaseDate.controller');
router.get('/release-date', ReleaseDateController.getAll);
router.post('/release-date/', ReleaseDateController.create);
router.get('/release-date/:id', ReleaseDateController.find);
router.patch('/release-date/:id', ReleaseDateController.update);
router.delete('/release-date/:id', ReleaseDateController.delete);

const VgmFillingController = require('../User-controllers/VgmFillingDate.controller');
router.get('/vgm-filling', VgmFillingController.getAll);
router.post('/vgm-filling/', VgmFillingController.create);
router.get('/vgm-filling/:id', VgmFillingController.find);
router.patch('/vgm-filling/:id', VgmFillingController.update);
router.delete('/vgm-filling/:id', VgmFillingController.delete);

const QuotationController = require('../User-controllers/Quotation.controller');
router.get('/create-quotation', QuotationController.getAll);
router.get('/create-quotation-all', QuotationController.getAllForView);
router.post('/create-quotation/', QuotationController.create);
router.get('/create-quotation/:id', QuotationController.find);
router.patch('/create-quotation/:id', QuotationController.update);
router.delete('/create-quotation/:id', QuotationController.delete);
router.get('/get-quotation-status', QuotationController.getStatus);
router.patch('/update-quote-status/:id', QuotationController.updateStatus);

//Get a list of all FCL Quotation
const fclQuotation = require('../User-controllers/fclQuotation');
router.get('/fcl-quotation', fclQuotation.getAll);
router.get('/fcl-quotation-all', fclQuotation.findAndCountAll);
router.post('/fcl-quotation/', fclQuotation.create);
router.get('/fcl-quotation/:id', fclQuotation.find);
router.patch('/fcl-quotation/:id', fclQuotation.update);
router.delete('/fcl-quotation/:id', fclQuotation.delete);

//Get a list of all LCL Quotation
const lclQuotation = require('../User-controllers/LCLQuotattion.controller');
router.get('/lcl-quotation', lclQuotation.getAll);
router.get('/lcl-quotation-all', lclQuotation.findAndCountAll);
router.post('/lcl-quotation/', lclQuotation.create);
router.get('/lcl-quotation/:id', lclQuotation.find);
router.patch('/lcl-quotation/:id', lclQuotation.update);
router.delete('/lcl-quotation/:id', lclQuotation.delete);

//Get a list of all LCL Quotation
const landQuotation = require('../User-controllers/LandQuotation.controller');
router.get('/land-quotation', landQuotation.getAll);
router.get('/land-quotation-all', landQuotation.findAndCountAll);
router.post('/land-quotation/', landQuotation.create);
router.get('/land-quotation/:id', landQuotation.find);
router.patch('/land-quotation/:id', landQuotation.update);
router.delete('/land-quotation/:id', landQuotation.delete);

//Get a list of all Air Quotation
const AirQuotation = require('../User-controllers/AfQuotation.controller');
router.get('/air-quotation', AirQuotation.getAll);
router.get('/air-quotation-all', AirQuotation.findAndCountAll);
router.post('/air-quotation/', AirQuotation.create);
router.get('/air-quotation/:id', AirQuotation.find);
// router.get('/air-quotation-preview/:id', AirQuotation.getQuoteForPreview);
// router.get('/air-quotation-preview-charge/:id', AirQuotation.getQuoteForPreviewCharge);
router.patch('/air-quotation/:id', AirQuotation.update);
router.delete('/air-quotation/:id', AirQuotation.delete);
router.get('/get-salesman-mapping/:id', AirQuotation.getSalesMan);

const QuotePackage = require('../User-controllers/QuotePackages.controller')
router.get('/quote-package', QuotePackage.getAll);
router.post('/quote-package/', QuotePackage.create);
router.get('/quote-package/:id', QuotePackage.find);
router.get('/load-quote-package', QuotePackage.loadPackages);
router.patch('/quote-package/:id', QuotePackage.update);
router.delete('/quote-package/:id', QuotePackage.delete);

module.exports = router;