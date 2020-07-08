const requestUserRepos = (username) => {

    const url = `https://api.github.com/users/${username}/repos`;

    fetch(url, { method: 'GET' })
        .then(response => response.text())
        .then(result => {
            const repoArray = JSON.parse(result);
            console.log(repoArray);

            const sortedRepoArray = repoArray.sort((a, b) => {
                let dateA = new Date(a.created_at);
                let dateB = new Date(b.created_at);
                return dateB - dateA;
            });

            sortedRepoArray.map((repo) => {
                document.querySelector('.card-columns').innerHTML += `
            <div class="card">
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
            `;
            });



        })
        .catch(error => console.log(error));

}
const requestUserProfile = (username) => {

    document.querySelector('.card-columns').innerHTML = '';

    const url = `https://api.github.com/users/${username}`;

    fetch(url, { method: 'GET' })
        .then(response => response.text())
        .then(result => {
            const data = JSON.parse(result);

            document.querySelector('.user-profile').innerHTML = `
            <div class="card">
                <img class="card-img-top" src="${data.avatar_url}">
                <div class="card-body">
                <h3 class="card-title">
                <a href="${data.html_url}">${data.name}</a>
                </h3>
                <h5 class="card-title">@${data.login}</h5>
                <p class="card-text">${data.bio === null ? '' : data.bio}</p>
                <p class="card-text">
                    <div class="profile-analytics" style="display: inline-flex">
                    <div>
                    <i class="fa fa-users" aria-hidden="true"></i>
                    ${data.followers} followers
                    </div>
                    <div>
                    ${data.following} following
                    </div>
                    </p>
                </div>
            </div>
        `;


        })
        .catch(error => console.log(error));

    requestUserRepos(username);
}

const submitBtn = document.querySelector('#submit-btn').addEventListener('click', () => {

    document.querySelector(".navbar").style.display = 'block';

    document.querySelector(".logo-container").style.display = 'none';
    document.querySelector(".header").style.display = 'none';
    document.querySelector(".form-container").style.display = 'none';

    const username = document.querySelector('#usr').value;
    requestUserProfile(username);
});

const enterInput = document.querySelector('#usr').addEventListener('keyup', (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
        document.querySelector(".navbar").style.display = 'block';

        document.querySelector(".logo-container").style.display = 'none';
        document.querySelector(".header").style.display = 'none';
        document.querySelector(".form-container").style.display = 'none';

        const username = document.querySelector('#usr').value;
        requestUserProfile(username);
    }
});


// navbar search

const submitBtnNav = document.querySelector('#submit-btn-nav').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.querySelector('#usr-nav').value;

    requestUserProfile(username);
});

const enterInputNav = document.querySelector('#usr-nav').addEventListener('keyup', (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
        const username = document.querySelector('#usr-nav').value;
        requestUserProfile(username);
    }
});

