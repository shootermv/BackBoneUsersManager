var userList=[
  { id: 1  , name:'moshe' },
  { id: 2  , name:'shlomo'}
]

User=Backbone.Model.extend({
    
   defaults:{
        "id":null,
        "name": ""
   },
   url: function() {
       return this.isNew() ? 'UsersManager/CreateUser' : 'UsersManager/UpdateUser/' + this.get('id');
   }
})
//Collection
window.UsersCollection = Backbone.Collection.extend({
    model:User,
    url: "UsersManager/GetUsers"
		
});
//ListView
window.UsersListView = Backbone.View.extend({
   

});
// Router
var AppRouter = Backbone.Router.extend({

    routes: {
        "": "saveUser"
    },
    list: function () {
        this.userList = new UsersCollection(/*userList*/);
        var self = this;


        this.userList.fetch({
            success: function () {
                new UsersListView({ model: userList });
            }
        })//end of fetch
    },
    newUser: function () {
        this.usersList = new UsersCollection();
        this.usersList.create(new User(), {
            success: function () {
                //  app.navigate('users/' + self.model.id, false);
            }
        });
    },
    saveUser: function () {
        var u = new User();


        u.set({ id: 1, name: 'sasha' });
        u.save();

    }


});
var app = new AppRouter();
Backbone.history.start();