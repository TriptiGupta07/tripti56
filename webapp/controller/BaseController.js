sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
  ], (Controller,JSONModel) => {
    "use strict";
  
    return Controller.extend("app.tripti56.controller.BaseController", {
        onInit() {
        },
        getModel:function(model){
            return this.getView().getModel(model);
        }
    });
  });