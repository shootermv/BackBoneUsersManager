
// Router
var AppRouter = Backbone.Router.extend({

    routes: {
        "": "list",
        "users/page/:page": "list",
        "users/new": "newUser",
        "users/:id": "userDetails"
    },
    initialize: function () {
        this.headerView = new HeaderView();
        $('.header-actions').html(this.headerView.el);
        this.SearchView = new SearchView();
        $('ul.top-nav').html(this.SearchView.el);
    },
    list: function (page) {

        
        var self = this;

        if (this.usersList==null) {
            this.usersList = new UsersCollection();
            
            this.usersList.fetch({
                success: function () {


                    var p = page ? parseInt(page, 10) : 1;


                    self.UsersListView = new UsersListView({ model: self.usersList, page: p });


                    $('#sidebar').html(self.UsersListView.render().el);


                    //paginator
                    $('#sidebar').append(new Paginator({ model: self.usersList, page: p }).render().el);


                } //end of success
            })//end of fetch


        }
         else//if already fetched
        {


            var p = page ? parseInt(page, 10) : 1;


            self.UsersListView = new UsersListView({ model: self.usersList, page: p });


            $('#sidebar').html(self.UsersListView.render().el);


            //paginator
            $('#sidebar').append(new Paginator({ model: self.usersList, page: p }).render().el);
        }
    },

    userDetails: function (id) {

        if (this.usersList) {
            //unselect prevously selected


            if (this.user) this.user.set({ 'selected': false });


            this.user = this.usersList.get(id);

            //select current
            this.user.set({ 'selected': true });


            if (this.UserDetailsView) this.UserDetailsView.close();
            this.UserDetailsView = new UserDetailsView({ model: this.user });

            //update header too
            //passing model
            this.headerView.model = app.UserDetailsView.model;

            $('#content').html(this.UserDetailsView.render().el);
        }
        else {
            this.list();
        }
    },
    newUser: function () {

        if (this.UserDetailsView) this.UserDetailsView.close();
        this.UserDetailsView = new UserDetailsView({ model: new User() });
        $('#content').html(this.UserDetailsView.render().el);

    }


});

utils.loadTemplate(['SearchView', 'HeaderView', 'UserListItemView', 'UserDetailsView'], function () {
    app = new AppRouter();
    Backbone.history.start();
});