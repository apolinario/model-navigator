import { publish } from 'gh-pages';

publish(
    'build', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/apolinario/model-navigator.git', // Update to point to your repository
        user: {
            name: 'Apolinario', // update to use your name
            email: 'joaopaulo.passos@gmail.com' // Update to use your email
        },
        dotfiles: true
    },
    () => {
        console.log('Deploy Complete!');
    }
);