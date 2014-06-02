module.exports = {
    newest: function() {
        var comments = [
            {
                image_id:   1,
                email:      'test@testing.com',
                name:       'Test Tester',
                gravatar:   'http://www.gravatar.com/avatar/9a99fac7b524fa443560ec7b5ece5ca1?d=monsterid&s=45',
                comment:    'This is a test comment...',
                timestamp:  Date.now(),
                image: {
                    uniqueId:       1,
                    title:          'Sample Image 1',
                    description:    '',
                    filename:       'sample1.jpg',
                    views:          0,
                    likes:          0,
                    timestamp:      Date.now
                }
            }, {
                image_id:   1,
                email:      'test@testing.com',
                name:       'Test Tester',
                gravatar:   'http://www.gravatar.com/avatar/9a99fac7b524fa443560ec7b5ece5ca1?d=monsterid&s=45',
                comment:    'Another followup comment!',
                timestamp:  Date.now(),
                image: {
                    uniqueId:       1,
                    title:          'Sample Image 1',
                    description:    '',
                    filename:       'sample1.jpg',
                    views:          0,
                    likes:          0,
                    timestamp:      Date.now
                }
            }
        ];

        return comments;
    }
};
