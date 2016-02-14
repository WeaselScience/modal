/* global Modal: true, _ */

Modal = {
    _stack: [],
    getTemplate: function() {
        if (!Modal.isShown()) {
            return null;
        }

        return Blaze.TemplateInstance(_.last(Modal._stack));
    },
    isShown: function() {
        return !_.isEmpty(Modal._stack);
    },
    show: function(args) {
        args = _({
            template: null,
            data: null,
            backdrop: true,
            keyboard: true
        }).extend(args);

        var instance = new Blaze.Template(function() {
            return args.template;
        });

        instance.onRendered(function() {
            if (_.size(Modal._stack) > 1) {
                // One modal rendered, one created but not yet rendered
                Blaze.TemplateInstance(Modal._stack[_.size(Modal._stack) - 2]).$('.modal').one('hidden.bs.modal', function() {
                    Modal.getTemplate().$('.modal').modal({
                        show: true,
                        backdrop: args.backdrop,
                        keyboard: args.keyboard
                    }).on('hidden.bs.modal', function() {
                        Blaze.remove(_.last(Modal._stack));
                        Modal._stack.pop();
                        Modal.getTemplate().$('.modal').modal('show');
                    });
                }).modal('hide');
            } else {
                Modal.getTemplate().$('.modal').on('hidden.bs.modal', function() {
                    if (_.size(Modal._stack) === 1) {
                        Blaze.remove(_.last(Modal._stack));
                        Modal._stack.pop();
                    }
                }).modal('show');
            }
        });

        Modal._stack.push(Blaze.renderWithData(
            instance,
            args.data,
            $('body').get(0)
        ));
    },
    hide: function() {
        if (Modal.isShown()) {
            Modal.getTemplate().$('.modal').modal('hide');
        }
    }
};