window.SearchView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },
    events: {
        'click .btn': 'search'
    },
    search: function (event) {
        var term = $(this.el).find('input').val();

        if (term.length == 0) { app.usersList = null; app.list(); return; }

        var filtered = _.filter(app.usersList.models, function (item) {
            return item.get("name").toLowerCase().indexOf(term) >= 0;
        });

        app.usersList = new UsersCollection(filtered);
        app.list();


    },
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
})