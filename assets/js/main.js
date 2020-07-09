const github = new GitHub();
const ui = new UI();

const boilerPlate = (ifNav) => {
    ui.clear();
    document.querySelector(".navbar").style.display = 'block';
    document.querySelector(".container-fluid").style.display = 'block';
    document.querySelector(".main").style.display = 'none';


    const username = ifNav ? getNavUser() : getDefaultUser();
    if (username != '') {
        github.getUser(username)
            .then(data => {
                if (data.profile.message === 'Not Found') {
                    ui.showAlert('User not found', 'alert alert-danger');
                } else {
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
            })
    } else {
        ui.showAlert('Input field is empty.', 'alert alert-danger');
    }
};

const getDefaultUser = () => document.querySelector('#usr').value;
const getNavUser = () => document.querySelector('#usr-nav').value;


const submitBtn = document.querySelector('#submit-btn').addEventListener('click', () => boilerPlate(false));

const enterInput = document.querySelector('#usr').addEventListener('keyup', (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
        boilerPlate(false);
    }
});


// navbar search

const submitBtnNav = document.querySelector('#submit-btn-nav').addEventListener('click', (e) => {
    e.preventDefault();
    boilerPlate(true);
});

const enterInputNav = document.querySelector('#usr-nav').addEventListener('keyup', (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
        boilerPlate(true);
    }
});

// When the user scrolls the page, execute myFunction
window.onscroll = function () { myFunction() };

// Get the navbar
const navbar = document.querySelector(".navbar");

// Get the offset position of the navbar
const sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}