

angular.module('starter.services')
.factory('Category',function($http){

  return {
    loadCategoryList : function(){
      return $http.get(url_category_list).then(function(response){
        return response.data;
      })
    },

  }

});
