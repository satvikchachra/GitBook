class GitHub {
    constructor() {
        this.max_repo = 6;
        this.sorted_repo = 'created: dsc';
    }

    async getUser(username) {
        const profileResponse = await fetch(`https://api.github.com/users/${username}`,
            {
                method: 'GET',
                data: {
                    client_id: 'cb1b38b3043d2618d305',
                    client_secret: '6f507170b2bea0c2172100f0a51a9db32428f063'
                }
            });

        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=${this.max_repo}&sort=${this.sorted_repo}`,
            {
                method: 'GET',
                data: {
                    client_id: 'cb1b38b3043d2618d305',
                    client_secret: '6f507170b2bea0c2172100f0a51a9db32428f063'
                }
            });

        const profileData = await profileResponse.json();
        // console.log(profileData);
        const repoData = await repoResponse.json();
        // console.log(repoData);

        return {
            profile: profileData,
            repos: repoData
        }


    }
}