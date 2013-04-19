window.HeaderView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    events: {
        "click .new": "newUser",
        "click .save": "saveUser",
        "click .delete": "deleteUser"
    },

    newUser: function (event) {
        app.navigate("users/new", true);
        //passing model
        this.model=app.UserDetailsView.model;
        return false;
    },

    saveUser: function (event) {

        this.model.set({
            name: $('#name').val()
        });

        if (this.model.isNew()) {
            var self = this;

            app.usersList.create(this.model, {
                wait: true,
                success: function () {
                    console.log('success to add!');
                    utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');
                }
            });

        } else {
            this.model.save();
        }

        return false;
    },

    deleteUser: function (event) {
        this.model.destroy({
            success: function () {
                alert('user deleted successfully');

            }
        });
        return false;


    }


});
