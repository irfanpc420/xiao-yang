document.addEventListener('DOMContentLoaded', () => {
    const actorsListElement = document.getElementById('actors-list');
    const actorDetailsElement = document.getElementById('actor-details');
    const backButton = document.getElementById('back-button');

    // Function to load actors from the API
    function loadActors() {
        fetch('/api/actors')
            .then(response => response.json())
            .then(actors => {
                actorsListElement.innerHTML = ''; // Clear the actors list

                // Render actors
                actors.forEach(actor => {
                    const actorCard = document.createElement('div');
                    actorCard.classList.add('actor-card');
                    actorCard.innerHTML = `
                        <div class="actor-name">${actor.name}</div>
                    `;

                    // Add click event to show actor details
                    actorCard.addEventListener('click', () => {
                        showActorDetails(actor);
                    });

                    actorsListElement.appendChild(actorCard);
                });
            })
            .catch(err => {
                console.error('Error fetching actors:', err);
            });
    }

    // Function to show actor details
    function showActorDetails(actor) {
        actorDetailsElement.innerHTML = `
            <h2>${actor.name}</h2>
            <p><strong>Bio:</strong> ${actor.bio}</p>
            <p><strong>Birth Date:</strong> ${actor.birthDate}</p>
            <p><strong>Nationality:</strong> ${actor.nationality}</p>
            <p><strong>Genres:</strong> ${actor.genres.join(', ')}</p>
            <p><strong>Debut:</strong> ${actor.debut}</p>
            <p><strong>Achievements:</strong> ${actor.achievements.join(', ')}</p>
            <div id="photos-section">
                <button id="see-photos-btn">See Photos</button>
                <div id="photos-container"></div>
                <p id="no-photos-message" class="hidden">This actor has no photos.</p>
            </div>
        `;

        // Display or hide photos
        const photosContainer = document.getElementById('photos-container');
        const seePhotosBtn = document.getElementById('see-photos-btn');
        const noPhotosMessage = document.getElementById('no-photos-message');

        // Try to fetch the actor's image URL
        fetch(`/images/${actor.name.toLowerCase()}.js`)
            .then(response => response.text())
            .then(imageUrl => {
                if (imageUrl) {
                    const imgElement = document.createElement('img');
                    imgElement.src = imageUrl;
                    photosContainer.appendChild(imgElement);
                } else {
                    noPhotosMessage.classList.remove('hidden');
                }
            })
            .catch(() => {
                noPhotosMessage.classList.remove('hidden');
            });

        // Show the actor details section and hide the actors list
        actorsListElement.style.display = 'none';
        actorDetailsElement.style.display = 'block';
        backButton.classList.remove('hidden');
    }

    // Function to go back to the actor list
    backButton.addEventListener('click', () => {
        actorDetailsElement.style.display = 'none';
        actorsListElement.style.display = 'flex';
        backButton.classList.add('hidden');
    });

    // Load actors when the page is loaded
    loadActors();
});
