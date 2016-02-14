Package.describe({
    name: 'apotex:modal',
    version: '0.0.1',
    summary: 'One more implementation of Bootstrap Modals.',
    git: 'https://github.com/apotex/modal.git'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');

    api.use([
        'templating',
        'underscore',
        'blaze'
    ], 'client');

    api.addFiles([
        'client/Modal.js',
        'client/builders.html'
    ], 'client');

    api.export('Modal', 'client');
});
