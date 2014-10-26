'use strict';

angular.module('piraBoardApp')
<<<<<<< HEAD
  .controller('DashboardCtrl', function ($scope, $http, Auth) {
    $scope.groups = [];

    //When groups are added, they are also added here with their $scope.groups index
    $scope.groupIndexFromName = {}
  .controller('DashboardCtrl', function ($scope, $http, Auth, AllUsers) {
=======
  .controller('DashboardCtrl', function ($scope, $http, Auth, AllUsers, Modal) {
>>>>>>> Modal is working!
    $scope.groups = [
      {
        groupName:'Omnicron', 
        members: [{name:'Tony Chong', email: 'brokenhearted@nolove.com',role: 'user'}, {name:'Tony Tiger', email:'wheat@bloodsugar.com',role: 'user'}, {name: 'John Cheech', email: 'smokesthings@420.com', role: 'admin'}]
      },       
      {
        groupName:'CSI110', 
        members: [{name:'Tony Chong', email: 'brokenhearted@nolove.com',role: 'user'}, {name:'Tony Tiger', email:'wheat@bloodsugar.com',role: 'user'}, {name: 'John Cheech', email: 'smokesthings@420.com', role: 'admin'}]
      }, 
      {
        groupName:'Micronub',
        members: [{name:'Tony Chong', email: 'brokenhearted@nolove.com',role: 'user'}, {name:'Tony Tiger', email:'wheat@bloodsugar.com',role: 'user'}, {name: 'John Cheech', email: 'smokesthings@420.com', role: 'admin'}]
      }
    ];

    $scope.numLead = 0;
    $scope.numGroups = $scope.groups.length;
    $scope.addGroupToggle = false; 
    $scope.profileToggle = false;
    $scope.infoBoxToggle = false;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.allUsers = AllUsers.query();
    $scope.currentGroup = {}; // currently selected group


    $scope.createGroup = function (name, callback) {
      // alert(name);
      console.log('creating a group');

      // make group in database and add group to list on success
      $scope.groups.push( {groupName: name, members: []} );
      // $scope.numGroups++ && $scope.numLead++;
      $scope.numLead++;

      $http.post('/api/users/userGroup/'+name)
      .success(function(data){
        console.log('added group '+ name +' to server');
        $scope.groupName = '';
        $scope.addGroupToggle = false;

        //Don't create groups that already exist
        if(!$scope.groupIndexFromName[name]){
          
          _addGroupToLocal(name);

          if(callback){
            console.log('callback')
            callback($scope.numGroups);
          }
        }
      })
      .error(function(err){

      });
    };

    var _addGroupToLocal = function(name){
      console.log('num groups ', $scope.numGroups);
      $scope.groupIndexFromName[name] = $scope.numGroups;
      $scope.groups[$scope.numGroups] = 
      {
        groupName:name, 
        members: [],
        invitations: []
      };
      $scope.numGroups++;
    };

    $scope.addGroupMembers = function(groupName, members){
      var index = $scope.groupIndexFromName[groupName];

      for(var i=0; i<members.length; i++){
        $scope.groups[index].members.push(members[i]); 
      }
    };

    $scope.setGroupMembers = function(groupName, members){
      var index = $scope.groupIndexFromName[groupName];
      $scope.groups[index].members = members; 
    };

    $scope.addGroupInvitations = function(groupName, members){
      var index = $scope.groupIndexFromName[groupName];

      for(var i=0; i<members.length; i++){
        $scope.groups[index].invitations.push(members[i]); 
      }
    };

    $scope.setGroupInvitations = function(groupName, members){
      var index = $scope.groupIndexFromName[groupName];
      $scope.groups[index].invitations = members; 
    };

    $scope.getGroup = function(index) {
      $scope.infoBoxToggle = true;
      $scope.profileToggle = false;
      return $scope.currentGroup = $scope.groups[index];
    };

    $scope.isCurrentGroup = function (group) {
      return $scope.currentGroup.groupName === group;
    };

    $scope.updateGroupsFromServer = function (callback) {
      $http.get('/api/users/userGroups')
      .success(function(data){
        console.log('groups from server: ', data);
        if(data){
          for(var i=0; i<data.length; i++){
            var groupName = data[i];
            if(!$scope.groups[groupName]){
              console.log('add ' + groupName + ' to local');
              _addGroupToLocal(groupName);
            }
          }
          if(callback){
            callback();
          }
        }
      })
      .error(function(err){
        console.log(err);
      });
    };

<<<<<<< HEAD
    $scope.updateGroupsFromServer();
=======


    $scope.initPiraBoard = function (data) {
      console.log('in initPiraBoard')
      return Modal.app('hi');
      // return Modal.app(data);
    }
>>>>>>> Modal is working!
  });
