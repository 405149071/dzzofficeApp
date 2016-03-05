

angular.module('starter.services')
.factory('Category',function($http){

  return {
    loadCategoryList : function(catid){
      return $http.get(url_category_list(catid)).then(function(response){
        return response.data;
      })
    },

  }

});
