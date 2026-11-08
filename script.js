document.addEventListener("DOMContentLoaded", () => {
    const rowsContainer = document.getElementById("rows-container");
    const hero = document.getElementById("hero");
    const heroTitle = document.getElementById("hero-title");
    const heroDesc = document.getElementById("hero-desc");
    const heroPlay = document.getElementById("hero-play");

    const modal = document.getElementById("video-modal");
    const modalClose = document.getElementById("modal-close");
    const modalVideo = document.getElementById("modal-video");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");

    let currentMovie = null;

    // Carregar dados do arquivo JSON
    fetch("filmes.json")
        .then(response => response.json())
        .then(data => {
            const categorias = data.categorias;

            // Configurar Banner Principal
            if (categorias.length > 0 && categorias[0].filmes.length > 0) {
                const firstMovie = categorias[0].filmes[0];
                hero.style.backgroundImage = `url("${firstMovie.capa}")`;
                heroTitle.textContent = firstMovie.titulo;
                heroDesc.textContent = firstMovie.descricao;
                currentMovie = firstMovie;

                heroPlay.addEventListener("click", () => {
                    openModal(currentMovie);
                });
            }

            // Gerar linhas e capas dinamicamente
            categorias.forEach(cat => {
                const row = document.createElement("div");
                row.classList.add("row");

                const rowTitle = document.createElement("h2");
                rowTitle.classList.add("row__title");
                rowTitle.textContent = cat.nome;
                row.appendChild(rowTitle);

                const rowPosters = document.createElement("div");
                rowPosters.classList.add("row__posters");

                cat.filmes.forEach(filme => {
                    const img = document.createElement("img");
                    img.classList.add("row__poster");
                    img.src = filme.capa;
                    img.alt = filme.titulo;

                    img.addEventListener("click", () => {
                        openModal(filme);
                    });

                    rowPosters.appendChild(img);
                });

                row.appendChild(rowPosters);
                rowsContainer.appendChild(row);
            });
        })
        .catch(err => console.error("Erro ao carregar o JSON:", err));

    function openModal(filme) {
        modalTitle.textContent = filme.titulo;
        modalDesc.textContent = filme.descricao;
        modalVideo.src = filme.video;
        modal.style.display = "flex";
        modalVideo.play();
    }

    modalClose.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.style.display = "none";
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }

    // Efeito de cor na Navbar ao rolar a página
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = "#141414";
        } else {
            navbar.style.backgroundColor = "transparent";
        }
    });
});