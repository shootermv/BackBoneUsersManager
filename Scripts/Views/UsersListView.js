/**
 * Created with JetBrains WebStorm.
 * User: Moshe
 * Date: 4/7/13
 * Time: 6:15 PM
 * To change this template use File | Settings | File Templates.
 */

//ListView
window.UsersListView = Backbone.View.extend({
    tagName: "ul",

    initialize: function () {

        var self = this;
        $(self.el).attr('class', 'nav nav-list bs-docs-sidenav');

        this.model.bind("reset", this.render, this);



        this.model.bind("add", function (user) {
            console.log('add event fired')
            $(self.el).append(new UserListItemView({ model: user }).render().el);
            app.navigate('users/' + user.id, true);
        });
        this.model.bind("remove", function (user) {
            var viewToRemove = new UserListItemView({ model: user });

            $('li.active').remove();



            //select the first user
            if (app.usersList.models.length > 0) {
                app.list();
                //app.navigate('users/' + app.usersList.models[0].get('id'), true);
            } else {
                $('#name').val('')
            }

        });
    },


    render: function (eventName) {
        $(this.el).empty(); //clean

        var users = this.model.models;
        var len = users.length;
        var startPos = (this.options.page - 1) * 2;
        var endPos = Math.min(startPos + 2, len);
        for (var i = startPos; i < endPos; i++) {
            $(this.el).append(new UserListItemView({ model: users[i] }).render().el);
        }
        //select the first user of current page
        app.userDetails(app.usersList.models[startPos].get('id'));


        //        _.each(this.model.models, function (user) {
        //            $(this.el).append(new UserListItemView({ model: user }).render().el);
        //        }, this);




        return this;
    }

});