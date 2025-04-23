sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
], (Controller,JSONModel,Filter,FilterOperator, Fragment) => {
    "use strict";

    return Controller.extend("app.tripti56.controller.DetailView", {
        onInit() {
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function(oEvent){
            //console.log(oEvent);
            let index=oEvent.getParameter("arguments").index;
            let sPath="MiningModel>/miningListSet/"+ index;
            let oView=this.getView();
            oView.bindElement(sPath);
        },
        onF4Help:function(oEvent){
 
            this.inputField = oEvent.getSource().getId();
            let oModel=this.getView().getModel("MiningModel")
            let aData=oModel.getProperty("/contractorList")
            let deepCopy=JSON.parse(JSON.stringify(aData))
            let oModelFrag=new JSONModel({newcontractorList:deepCopy})
       
            if(!this.oDialog){
                this.oDialog = Fragment.load({
                    fragmentName:"app.tripti56.fragments.popUp",
                    controller:this
                }).then((dialog)=>{
                    this.oDialog = dialog;
                    this.getView().addDependent(this.oDialog)
                    this.getView().setModel(oModelFrag, "FragmentModel")
                    this.oDialog.open();
                })
            }else{
                this.oDialog.open();
            }
        },
        onConfirmAgency:function(oEvent){
 
            let oSelectedItems = oEvent.getParameter("selectedItem");
            let sValue = oSelectedItems.getProperty("info");
            let onInput = sap.ui.getCore().byId(this.inputField);
            onInput.setValue(sValue);
  
        },
        onFilter:function(){
            let aFilter = [];
            let sAgency = this.getView().byId("idInptName").getValue();
            let sMineral = this.getView().byId("idInptMineral").getValue();
            if(sAgency){
                let filterName = new Filter("name",FilterOperator.Contains,sAgency);
                aFilter.push(filterName);
            } 
            if(sMineral){
                let filterName = new Filter("type_of_mineral",FilterOperator.Contains,sMineral);
                aFilter.push(filterName);
            }
 
            let oTable = this.getView().byId("idMTable");
            let bindingInfo = oTable.getBinding("items");
            bindingInfo.filter(aFilter);
        },
        onListView: function(){
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteMiningReport");
        }
    });
});   