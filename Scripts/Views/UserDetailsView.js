window.UserDetailsView = Backbone.View.extend({


    initialize: function () {

    },
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        var self = this;
        //place groups of this user
        $(this.el).find('table tr:not(:first)').each(function (index, group) {
            if (self.foundInUserGroups($(group).find('td:eq(1)').text()))
                $(group).find(':checkbox').prop('checked', 'true');
        });

        return this;
    },
    foundInUserGroups: function (groupname) {
        var result = false;
        _(this.model.get('groupsList').models).each(function (item) {
            if (item.get('name') === groupname) {
                result = true;
                // break;
            }

        }, this);


        return result;
    },
    events: {
        "change": "change"
    },
    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
        console.log(target.name);

        var groupsList = new GroupsList();

        //insert selected groups
        $(this.el).find('table :checkbox:checked').each(function (index, group) {
            var group={
              id : (index + 1),
              name : $(group).closest('tr').find('td:eq(1)').text()
            };
            groupsList.push(group);
        });

        this.model.set('groupsList', groupsList);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }

    },

    close: function () {
        $(this.el).unbind();
        $(this.el).empty();
    }

});
