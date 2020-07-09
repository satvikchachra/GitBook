class UI {
    constructor() {
        this.profile = document.querySelector('.user-profile');
        this.repoGrid = document.querySelector('.repos-grid');
        this.containerFluid = document.querySelector('.container-fluid');
    }

    clear() {
        this.profile.innerHTML = '';
        this.repoGrid.innerHTML = '';
    }

    showProfile(username) {
        document.querySelector('.user-profile').innerHTML = `
            <div class="card profile-card">
                <img class="card-img-top" src="${username.avatar_url}">
                <div class="card-body">
                    <h3 class="card-title">
                        <a href="${username.html_url}">${username.name}</a>
                    </h3>
                    <h5 class="card-title">@${username.login}</h5>
                    <div class="card-block text-center">
                        <p class="card-text">${username.bio === null ? '' : username.bio}</p>
                        <p class="card-text">
                            <div class="profile-analytics">
                                <div>
                                    ${username.followers} followers    
                                </div>
                                <div>
                                    ${username.following} following
                                </div>
                                <div>
                                    ${username.public_repos} repositories
                                </div>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        `;

    }

    showRepos(repos) {
        repos.map((repo) => {
            document.querySelector('.repos-grid').innerHTML += `
            <div class="repo-card-container">
        <div class="card repo-card">
            <div class="card-body">
                <h4 class="card-title"><a href="${repo.html_url}" class="card-link">${repo.name}</a></h4>
                <p class="card-text">${repo.description === null ? '' : repo.description}</p>
                <p class="card-text">
                <div class="repo-analytics" style="display: inline-flex">
                <div>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                    ${repo.stargazers_count}
                </div>
                <div>
                <i class="fa fa-code-fork" aria-hidden="true"></i>
                    ${repo.forks}
                </div>
                <div>
                <i class="fa fa-code" aria-hidden="true"></i>
                    ${repo.language === null ? '' : repo.language}
                </div>
                </p>
            </div>
        </div>
        </div>
        `;
        });
    }

    showAlert(message, className) {
        document.querySelector('.latest-repos').style.display = 'none';

        if (document.querySelector('.logo-dup') === null) {
            const logo = document.createElement('img');
            logo.className = 'logo-dup';
            logo.setAttribute("src", "assets/img/github.png");
            document.querySelector('.container-fluid').appendChild(logo);
        }

        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        const parent = document.querySelector('body');
        const nav = document.querySelector('nav');
        parent.insertBefore(div, nav);
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000);
    }
}
