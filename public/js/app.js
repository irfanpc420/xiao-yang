// Fetch and display actor list
fetch('/api/actors')
  .then(response => response.json())
  .then(actors => {
    const actorList = document.getElementById('actorList');
    actors.forEach(actor => {
      const li = document.createElement('li');
      li.textContent = actor.name;
      li.addEventListener('click', () => loadActorInfo(actor.id));
      actorList.appendChild(li);
    });
  })
  .catch(error => console.error('Error fetching actors:', error));

// Load actor details by ID
function loadActorInfo(actorId) {
  fetch(`/api/actors/${actorId}`)
    .then(response => response.json())
    .then(actor => {
      const actorInfo = document.getElementById('actorInfo');
      actorInfo.innerHTML = `
        <div class="actor-card">
          <!-- Front side -->
          <div class="front">
            <img src="${actor.image}" alt="${actor.name}" class="actor-image">
          </div>
          <!-- Back side -->
          <div class="back">
            <h2 class="actor-name">${actor.name}</h2>
            <p class="actor-bio">${actor.bio}</p>
          </div>
        </div>
      `;
    })
    .catch(error => console.error('Error fetching actor details:', error));
}
