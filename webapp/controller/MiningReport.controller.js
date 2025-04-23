sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], (Controller,JSONModel,Filter,FilterOperator,Sorter) => {
    "use strict";

    return Controller.extend("app.tripti56.controller.MiningReport", {
        onInit() {
        },
        onDetailView: function(){
            let oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteDetail")
        },
        onSort: function(){
            if(!this.bDescending){
                this.bDescending=false;
            }
            
            var oSorter=new Sorter("Type of mineral", this.bDescending);
            var oList=this.getView().byId("idListCtrl1");
            var oBinding=oList.getBinding("items");
            oBinding.sort(oSorter);
                this.bDescending=!this.bDescending;
        },
        onSearch: function(oEvent){
            var searchString=oEvent.getParameter("query")||oEvent.getParameter("newValue");
            var oName=new Filter("Mineral Type", FilterOperator.Contains, searchString);
            var oAvail=new Filter("Operational", FilterOperator.Contains, searchString);
            
            var aFilter=[oName, oAvail];
            var mainFilter=new Filter({
                filters:aFilter,
                and:false
            });
            var oList=this.getView().byId("idListCtrl");
            var oBinding=oList.getBinding("items");
            oBinding.filter(mainFilter);
        },
        onItemSelect: function(oEvent){
            var oList=oEvent.getParameter("listItem");
            let sPath=oList.getBindingContextPath();
            let aItems=sPath.split("/");
            let id=aItems[aItems.length-1];
            let oRouter= this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail", {
                index:id
            });
        }    
    });
});