'use strict';

angular.module('myApp.controllers', [])

.controller('headCtrl', ['pics', 'filterFilter', '$scope', '$http', '$sce', 'getData', 'tools',
	headCtrl])

.controller('artisteCtrl', ['tools', 'getData', '$scope', '$routeParams', '$http', '$sce', 
	artisteCtrl])

.controller('artistesCtrl', ['pics', 'getData', '$scope', '$routeParams', '$http', '$sce', 
	artistesCtrl])

.controller('locauxCtrl', ['pics', 'getData', '$scope', '$routeParams', '$http', '$sce',
	locauxCtrl])

.controller('visiteursCtrl', ['pics', 'getData', '$scope', '$routeParams', '$http', '$sce', 
	visiteursCtrl])

.controller('quartierCtrl', ['tools', 'getData', '$scope', '$routeParams', '$http', '$sce', 
	quartierCtrl])

.controller('quartiersCtrl', ['pics', 'getData', '$scope', '$routeParams', '$http', '$sce', 
	quartiersCtrl])

.controller('picsCtrl', ['pics', 'getData', '$scope', '$routeParams', '$http', '$sce', 
	picsCtrl])

.controller('aboutCtrl', ['getData', '$scope', '$sce', 
	aboutCtrl])

.controller('contactCtrl', ['$http', 'getData', '$scope', '$sce',
	contactCtrl])

.controller('partnersCtrl', ['$http', 'getData', '$scope', '$sce', 
	partnersCtrl]);