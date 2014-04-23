angular.module('TaskManager', ['ngResource']);

function TaskController($scope, $resource) {

  $scope.taskResource = $resource('/tasks/:id', { id: '@id' }, { 
    index:   { method: 'GET',    responseType: 'json', isArray: true },
    show:    { method: 'GET',    responseType: 'json'  },
    update:  { method: 'PUT',    responseType: 'json'  },
    create:  { method: 'POST',   responseType: 'json'  },
    remove:  { method: 'DELETE', responseType: 'json'  }
  });

  $scope.tasks = $scope.taskResource.index();

  $scope.taskComplete = function(task) {
    var _id = task._id;
    $scope.taskResource.update({id: _id, complete: task.complete})
  }

  $scope.remove = function(task) {
    var _id = task._id;
    $scope.taskResource.remove({id: _id});
    $scope.tasks = $scope.taskResource.index();
  }

  $scope.add = function() {
    var task = {
      description: $scope.descriptionText, 
      complete: false
    }

    $scope.taskResource.create(task);
    $scope.tasks = $scope.taskResource.index();
    $scope.descriptionText = '';
  }

}