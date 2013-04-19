//Groups
Group = Backbone.Model.extend({
    defaults: {
        "id": null,
        "name": ""
    }

});

window.GroupsList = Backbone.Collection.extend({
    model: Group
});

User = Backbone.Model.extend({
    defaults: {
        "id": null,
        "name": "",
        "email": "",
        "password": "",
        "groupsList": [],
        "selected": false
    },

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? { isValid: true} : { isValid: false, message: "You must enter a name" };
        };
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return re.test(email);
        }
        this.validators.email = function (value) {
            if (value.length < 0)
                return { isValid: false, message: "You must enter email" };
            else if (!validateEmail(value))
                return { isValid: false, message: "You must enter corret email" };
            else
                return { isValid: true }; s
        };


        //faking groups of user:
        //if(this.get('name')==='moshe') this.set('groupsList', new GroupsList([{ 'id': 1, 'name': 'שומרים'}]));
        //if (this.get('name') === 'shlomo') this.set('groupsList', new GroupsList([{ 'id': 2, 'name': 'שומרים' }, { 'id': 1, 'name': 'מנהלים'}]));
        var groupsArr = this.get('groupsList');
        this.set('groupsList', new GroupsList(groupsArr));
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : { isValid: true };
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if (this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? { isValid: false, messages: messages} : { isValid: true };
    },
    url: function () {
        return this.isNew() ? 'UsersManager/CreateUser' : 'UsersManager/UpdateUser/' + this.get('id');
    }

})
//Collection
window.UsersCollection = Backbone.Collection.extend({
    model: User,
    //for fetch
    url: "UsersManager/GetUsers"

});

