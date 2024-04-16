document.addEventListener('DOMContentLoaded', function() {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    githubForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            searchUsers(searchQuery);
        } else {
            alert('Please enter a search query.');
        }
    });

    userList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            const username = event.target.textContent;
            getUserRepositories(username);
        }
    });

    function searchUsers(query) {
        const url = `https://api.github.com/search/users?q=${query}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to search users. Status code: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayUsers(data.items);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function getUserRepositories(username) {
        const url = `https://api.github.com/users/${username}/repos`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to retrieve repositories. Status code: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayRepositories(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.login;
            userList.appendChild(li);
        });
    }

    function displayRepositories(repositories) {
        reposList.innerHTML = '';
        if (repositories.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No repositories found.';
            reposList.appendChild(li);
        } else {
            repositories.forEach(repo => {
                const li = document.createElement('li');
                li.textContent = repo.name;
                reposList.appendChild(li);
            });
        }
    }
});
