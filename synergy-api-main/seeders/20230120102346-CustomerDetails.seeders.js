"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "sc_customer_details",
      [
        {
          customerIdFk : 1,
          customerBranchId : 1,
          customerCompanyAddress : "FRISENBORGVEJ 33, 7800 SKIVE",
          customerState : "NULL",
          customerCity : "NULL",
          customerZip : 75412,
          customerEmail : "info@deif.com",
          customerPhone : 88552211,
          customerFax : "77553322",
          customerNetwork : "NA",
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 2,
          customerBranchId : 1,
          customerCompanyAddress : "RAJAH ANNAMALAI BUILDINGS, ANNEXE 3RD FLOOR, 18\/3, RUKMANI LAKSHMIPATHY ROAD, EGMORE",
          customerState : "TAMIL NADU",
          customerCity : "CHENNAI",
          customerZip : 600008,
          customerEmail : "enquiry@timescan.com",
          customerPhone : 7755441122,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : true,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 2,
          customerBranchId : 1,
          customerCompanyAddress : "628, JEEWAN JYOTI BUILDING, MALIKPU, KOHI, RANGPURI EXTN, NEAR TATA MOTORS",
          customerState : "NULL",
          customerCity : "DELHI",
          customerZip : 110037,
          customerEmail : "enquiry@timescan.com",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "SECONDARY",
          customerBankStatus : true,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 3,
          customerBranchId : 1,
          customerCompanyAddress : "STRONGVILLE, OH",
          customerState : "NULL",
          customerCity : "NULL",
          customerZip : 44149,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 4,
          customerBranchId : 1,
          customerCompanyAddress : "13\/F., PARK SUN BUILDING, 97-107 WO YI HOP ROAD,",
          customerState : "NULL",
          customerCity : "HONG KONG",
          customerZip : null,
          customerEmail : "info@cnlogistics.com",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 5,
          customerBranchId : 1,
          customerCompanyAddress : "RM B, 11\/F, NATHAN COMMERCIAL BLDG. ,  430-436 NATHAN ROAD",
          customerState : "Kawloon",
          customerCity : "HONG KONG",
          customerZip : 775533,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : "NA",
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 6,
          customerBranchId : 1,
          customerCompanyAddress : "9810 BIANCO TERRACE, UNIT A, DES PLAINES",
          customerState : "ILLINOIS",
          customerCity : "NULL",
          customerZip : 60016,
          customerEmail : "contact@andnintl.com",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : true,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 7,
          customerBranchId : 1,
          customerCompanyAddress : "80 SW 8TH STREET, STE 2000, MIAMI,",
          customerState : "FLORIDA",
          customerCity : "NULL",
          customerZip : 33031,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : "{\"agent\": true, \"airline\": false, \"trucker\": false, \"coloader\": true, \"terminal\": true, \"warehouse\": false, \"shippingLine\": false, \"customsBroker\": false}",
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 8,
          customerBranchId : 1,
          customerCompanyAddress : "6 LIBERTY SQUARE #2202, BOSTON,",
          customerState : "MASSACHUSETTS",
          customerCity : "NULL",
          customerZip : 2109,
          customerEmail : "contact@ameritrans.com",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : true,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 9,
          customerBranchId : 1,
          customerCompanyAddress : "1338 ENGRACIA AVENUE, SUITE 4, TORRANCE,",
          customerState : "CALIFORNIA",
          customerCity : "NULL",
          customerZip : 90501,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : true,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 10,
          customerBranchId : 1,
          customerCompanyAddress : "556 SEQUOIA TRAIL, ROSELLE,",
          customerState : "ILLINOIS",
          customerCity : "NULL",
          customerZip : 60172,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 11,
          customerBranchId : 1,
          customerCompanyAddress : "PO BOX 15111, MANAMA",
          customerState : "NULL",
          customerCity : "NULL",
          customerZip : 60000,
          customerEmail : "NULL",
          customerPhone : 7774445522,
          customerFax : "000",
          customerNetwork : "NA",
          customerStatus : false,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 12,
          customerBranchId : 1,
          customerCompanyAddress : "PO BOX 1457, PRINCE NAYEF STREET, CROSS 24, AL-KHOBAR 31518",
          customerState : "NULL",
          customerCity : "SAUDI ARABIA",
          customerZip : 600074,
          customerEmail : "hello@marsfreights.com",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : true,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 12,
          customerBranchId : 1,
          customerCompanyAddress : "PO BOX 1457, PRINCE NAYEF STREET, CROSS 24, AL-KHOBAR 31518",
          customerState : "NULL",
          customerCity : "NULL",
          customerZip : null,
          customerEmail : "hello@marsfreights.com",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "SECONDARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 13,
          customerBranchId : 1,
          customerCompanyAddress : "NO 27, NEW, MGR MAIN RD, KANDANCAVADI, PERUNGUDI",
          customerState : "TAMIL NADU",
          customerCity : "CHENNAI",
          customerZip : 600096,
          customerEmail : "ram@linkindia.in",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : "{\"agent\": true, \"airline\": false, \"trucker\": false, \"coloader\": true, \"terminal\": true, \"warehouse\": false, \"shippingLine\": false, \"customsBroker\": false}",
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 13,
          customerBranchId : 1,
          customerCompanyAddress : "THAMBU CHETTY ST, PARRYS, GEORGE TOWN",
          customerState : "TAMIL NADU",
          customerCity : "CHENNAI",
          customerZip : 600001,
          customerEmail : "info@markshipping.com",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 15,
          customerBranchId : 1,
          customerCompanyAddress : "CARGOMAR HOUSE, NO. III\/695-C, NEW NO. XIII\/168, KOTTARAM JUNCTION, MARADU POST OFFICE,",
          customerState : "KERALA",
          customerCity : "ERNAKULAM",
          customerZip : null,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 16,
          customerBranchId : 1,
          customerCompanyAddress : "PLOT NO.23A, 2ND STREET OLD, 13TH STREET NEW, SARATHY NAGAR EXTENSION, PUTHAGARAM, KOLATHUR",
          customerState : "TAMIL NADU",
          customerCity : "CHENNAI",
          customerZip : 600099,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 17,
          customerBranchId : 1,
          customerCompanyAddress : "32, KATCHALEESWARA AGHRM, KATCHALEESWARA AGHRM,",
          customerState : "TAMIL NADU",
          customerCity : "CHENNAI",
          customerZip : 600001,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 18,
          customerBranchId : 1,
          customerCompanyAddress : "ABBUSALI ST, SALIGRAMAM,",
          customerState : "TAMIL NADU",
          customerCity : "CHENNAI",
          customerZip : 600093,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : "{\"agent\": true, \"airline\": false, \"trucker\": false, \"coloader\": true, \"terminal\": true, \"warehouse\": false, \"shippingLine\": false, \"customsBroker\": false}",
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 19,
          customerBranchId : 1,
          customerCompanyAddress : "9, MOOKER NALLAMUTHU ST, PARRYS CORNER, GEORGE TOWN",
          customerState : "TAMIL NADU",
          customerCity : "CHENNAI",
          customerZip : 600001,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 20,
          customerBranchId : 1,
          customerCompanyAddress : "HOUSE, 54, SBL, 28, MONTIETH RD, EGMORE",
          customerState : "TAMIL NADU",
          customerCity : "CHENNAI",
          customerZip : 600008,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : "{\"agent\": true, \"airline\": false, \"trucker\": false, \"coloader\": true, \"terminal\": true, \"warehouse\": false, \"shippingLine\": false, \"customsBroker\": false}",
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 21,
          customerBranchId : 1,
          customerCompanyAddress : "TEMPLE STEPS, BLOCK NO-1, GROUND FLOOR, NO. 184-187,",
          customerState : "TAMIL NADU",
          customerCity : "NULL",
          customerZip : 600015,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 22,
          customerBranchId : 1,
          customerCompanyAddress : "ANGERIPAYALAYAM, TIRUPPUR",
          customerState : "TAMIL NADU",
          customerCity : "TIRUPPUR",
          customerZip : 641602,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 23,
          customerBranchId : 1,
          customerCompanyAddress : "10, GROUND FLOOR, ABDUL RAZZAK ST, PALLAVARAM",
          customerState : "TAMIL NADU",
          customerCity : "CHENNAI",
          customerZip : 600043,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 24,
          customerBranchId : 1,
          customerCompanyAddress : "2JAINS, APOORVA APARTMENTS, FLAT GH, BLOCK, 158, DHARGA RD, PALLAVARAM",
          customerState : "TAMILNADU",
          customerCity : "NULL",
          customerZip : 600043,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 25,
          customerBranchId : 1,
          customerCompanyAddress : "SP 135, SOUTHERN AVE, NEAR WAVIN SIGNAL, AMBATTUR INDUSTRIAL ESTATE",
          customerState : "TAMIL NADU",
          customerCity : "CHENNAI",
          customerZip : 600094,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 26,
          customerBranchId : 1,
          customerCompanyAddress : "8, NEW AVADI RD, KILPAUK GARDEN COLONY, , KILPAUK",
          customerState : "TAMILNADU",
          customerCity : "CHENNAI",
          customerZip : 600010,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : "{\"agent\": true, \"airline\": false, \"trucker\": false, \"coloader\": true, \"terminal\": true, \"warehouse\": false, \"shippingLine\": false, \"customsBroker\": false}",
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 27,
          customerBranchId : 1,
          customerCompanyAddress : "4\/57, SESHACHALAM STREET, PERIYAPET, SAIDAPET",
          customerState : "TAMIL NADU",
          customerCity : "NULL",
          customerZip : 600015,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 28,
          customerBranchId : 1,
          customerCompanyAddress : "NO 26-A, JAWAHARLAL NEHRU RD, GUINDY INDUSTRIAL ESTATE,  THIRU VI KA INDUSTRIAL ESTATE, EKKATUTHANGAL",
          customerState : "TAMILNADU",
          customerCity : "CHENNAI",
          customerZip : 600032,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 29,
          customerBranchId : 1,
          customerCompanyAddress : "KANAGAM RD, KANAGAM, THARAMANI",
          customerState : "TAMILNADU",
          customerCity : "CHENNAI",
          customerZip : 600113,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 30,
          customerBranchId : 1,
          customerCompanyAddress : "39846, MCFAR LANE, KATTUR SADAYAPPAN STREET,  PARK TOWN",
          customerState : "TAMIL NADU",
          customerCity : "CHENNAI",
          customerZip : 600003,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        },
        {
          customerIdFk : 31,
          customerBranchId : 1,
          customerCompanyAddress : "9810 BIANCO TERRACE, UNIT A, DES PLAINES",
          customerState : "ILLINOIS",
          customerCity : "NULL",
          customerZip : 60016,
          customerEmail : "NULL",
          customerPhone : 0,
          customerFax : "0",
          customerNetwork : null,
          customerStatus : true,
          customerLogId : 1,
          customerRegDate : null,
          shipmentParty : null,
          vendorParty : null,
          customerType : "PRIMARY",
          customerBankStatus : false,
          custGlobalCompanyId: 2,
          custCompanyCountryId: 1,
          custCompanyBranchId :1,
          createdBy: 4,
          modifiedBy : 4,
          createdAt :new Date(),
          updatedAt :new Date(),
        }
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_customer_details", null, {});
  },
};
