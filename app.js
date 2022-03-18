///////fetch
async function getData(url) {
    let response = await fetch(url);
    return response.json()
}

// Consommation
let input = document.querySelector('input');

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.length > 0) {
        getData(`https://api.github.com/users/${input.value}`).then((data) => {
            if (data.message) {
                // utilisateur non existant
                console.log('Non existant');
            } else {
                let img = document.querySelector('.profile img')
                img.src = data.avatar_url
                let h5 = document.querySelector('h5');
                h5.innerText = data.login + ' (' + data.location + ')'
                h5.style.color = "gray";
                document.querySelector('h3').innerText = data.name

                document.querySelector('.user-find').classList.remove('d-none')
            }
        })
    } else {
        // Message erreur
    }
})