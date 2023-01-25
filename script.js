fetch('./games.json')
  .then(res => {
    return res.json();
  })
  .then(data => {
    data.forEach(x => {
      const container = _.get("#container");

      const div = document.createElement("div");
      const header = document.createElement("h1");
      const descrip = document.createElement("p");
      header.innerHTML = x.title;
      descrip.innerHTML = x.description;
      div.appendChild(header)
      div.appendChild(descrip)
      div.classList = 'card';

      
      
      _.on(div, "click", () => {
        window.location.href = `/?play=${x.id}`
      })

      container.appendChild(div)
      
      const params = new URLSearchParams(window.location.search)
      if (params.get("play") == x.id) {
        _.hide("#main")
        _.show("#game")
        document.title = "DynamicRuffle - " + x.title
        window.RufflePlayer = window.RufflePlayer || {};
        window.addEventListener("load", (event) => {
          const ruffle = window.RufflePlayer.newest();
          const player = ruffle.createPlayer();
          const container = document.getElementById("game");
          container.appendChild(player);
          player.load(x.file)
        });
      }
      
    });
  });
