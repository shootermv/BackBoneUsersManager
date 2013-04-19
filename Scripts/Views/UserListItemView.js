/**
 * Created with JetBrains WebStorm.
 * User: Moshe
 * Date: 4/7/13
 * Time: 6:16 PM
 * To change this template use File | Settings | File Templates.
 */
window.UserListItemView = Backbone.View.extend({
    tagName: "li",

    //template: _.template($('#tpl-user-list-item').html()),

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },




    initialize: function () {
        // listen to your model
        this.listenTo(this.model, 'change:selected', this.updateClass);

        this.listenTo(this.model, 'change:name', this.changed);
    },
    changed:function(){
        if (this.model.get('name').length>0) $(this.el).html(this.template(this.model.toJSON()));
    },
    updateClass: function () {

        (this.model.get('selected')) ? this.$el.addClass('active') : this.$el.removeClass('active');
    },
    render: function (eventName) {
        //if(this.model.get('selected')==true){$(this.el).addClass('active');}
        $(this.el).html(this.template(this.model.toJSON()));

        return this;
    }
});