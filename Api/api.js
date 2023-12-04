
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`

    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .catch(err => console.error(err))
/// lo anterior lo agarre de un ejercicio de api de scrimba que es lo que le da las imagenes cambiantes al fondo 
document.addEventListener("DOMContentLoaded", () => {
  const getDataBtn = document.getElementById("getDataBtn");
  const usersContainer = document.getElementById("usersContainer");

  getDataBtn.addEventListener("click", fetchData);

  function fetchData() {
    fetch("https://reqres.in/api/users?delay=3")
      .then(response => response.json())
      .then(data => {
        const datosUsuario = {
          data: data,
          timestamp: new Date().toLocaleTimeString(),
        };

        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
        console.log("Datos del usuario:", data);
        console.log("Hora de la solicitud:", datosUsuario.timestamp);
        mostrarDatos(data);
        usersContainer.classList.remove("d-none");
      })
      .catch(error => console.error("Error:", error));
  }

  function mostrarDatos(data) {
    usersContainer.innerHTML = "";
    data.data.forEach(user => {
      const tarjetaUsuario = document.createElement("div");
      tarjetaUsuario.classList.add("col-md-4", "mb-3");

      tarjetaUsuario.innerHTML = `
        <div class="card">
          <img src="${user.avatar}" class="card-img-top rounded-circle" alt="${user.first_name}">
          <div class="card-body">
            <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
            <p class="card-text">Email: ${user.email}</p>
          </div>
        </div>
      `;
      usersContainer.appendChild(tarjetaUsuario);
    });
  }

  const storedData = JSON.parse(localStorage.getItem("datosUsuario"));
  const currentTime = new Date().getTime();
  
  if (storedData && (currentTime - new Date(storedData.timestamp).getTime() >= 60000)) {
    fetchData();
  }
});
