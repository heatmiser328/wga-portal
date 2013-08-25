'use strict';

ica.module('wgaPortalLbApp.controllers', [])
	.controller('BattleCtrl', function ($routeParams, $rootScope, $scope, $log, game) {
    	var battlescenario = game.restore($routeParams.battleid, $routeParams.scenarioid);
        $scope.current = {
        	battle: battlescenario.battle,
        	scenario: battlescenario.scenario,
        	dateTime: game.formatCurrentDateTime(battlescenario.scenario, battlescenario.saved.turn),
            phase: game.getCurrentPhase(battlescenario.saved.phase)
		};
        $rootScope.current = {
        	battle: {
            	name: battlescenario.battle.name
            },
        	scenario: {
            	name: battlescenario.scenario.name
            }
            
        }
        $scope.tabs = {
            one: true,
            two: false,
            three: false,
            four: false
        };
        
        $scope.changeTurn = function(c) {
        	battlescenario.saved.turn += c;
            
            var result = game.nextTurn(battlescenario.scenario, battlescenario.saved.turn);
            battlescenario.saved.turn = result.turn;
            $scope.current.dateTime = result.dateTime;
        }
        $scope.changePhase = function(c) {
	        battlescenario.saved.phase += c;
            var result = game.nextPhase(battlescenario.scenario, battlescenario.saved.turn, battlescenario.saved.phase);
            
            battlescenario.saved.turn = result.turn;
            battlescenario.saved.phase = result.phase;
            $scope.current.dateTime = result.dateTime || $scope.current.dateTime;
            $scope.current.phase = result.phaseStr;
            
        }
        
        $scope.save = function() {
        	game.save(battlescenario);
        }
        
        $scope.reset = function() {
        	battlescenario.saved.turn = 1;
        	battlescenario.saved.phase = 0;
            changePhase(0);
        }
	});
