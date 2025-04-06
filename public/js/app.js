async function loadActors() {
  const res = await fetch('/api/actors');
  const actors = await res.json();

  const container = document.getElementById('actor-list');
  container.innerHTML = '';

  actors.forEach(actor => {
    const card = document.createElement('div');
    card.className = 'actor-card';
    card.innerHTML = `
      <img src="${actor.image}" alt="${actor.name}" class="thumb"/>
      <p>${actor.name}</p>
    `;
    card.onclick = () => showDetails(actor.name);
    container.appendChild(card);
  });
}

async function showDetails(name) {
  const res = await fetch(`/api/actors/${name}`);
  const actor = await res.json();

  const detailBox = document.getElementById('actor-detail');
  detailBox.innerHTML = `
    <h2>${name}</h2>
    <img src="${actor.image}" class="large"/>
    <p>${actor.info}</p>
    <button onclick="showPhotos('${name}')">See more photos</button>
  `;
}

function showPhotos(name) {
  const img = document.createElement('img');
  img.src = `images/${name}.js`; // Assuming it's a URL exported from JS
  document.getElementById('photo-gallery').innerHTML = '';
  document.getElementById('photo-gallery').appendChild(img);
}

window.onload = loadActors;
