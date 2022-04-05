///////fetch
async function getData(url) {
    let response = await fetch(url);
    return response.json()
}

// Consommation
let input = document.querySelector('input');
const infos = document.querySelector('.info');


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
                h5.style.color = "#cccccc";
                document.querySelector('h3').innerText = data.name
                document.querySelector('a').href = "https://github.com/" + input.value

                document.querySelector('.user-find').classList.remove('d-none')
            }
        })
        getData("https://api.github.com/users/" + input.value + "/repos").then((data) => {
            // console.log(data);
            infos.innerHTML = "<h3>Public Repos</h3>";
            for (let i = 0; i < data.length; i++) {

                if (!data[i].private || data[i].name != input.value) {
                    infos.innerHTML = infos.innerHTML + "<p>" + data[i].name + "</p>"
                }

            }
            document.querySelector('.info').classList.remove('d-none')
        })
    } else {
        // Message erreur
    }
})