/*global QUnit*/

sap.ui.define([
	"app/tripti56/controller/MiningReport.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MiningReport Controller");

	QUnit.test("I should test the MiningReport controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
