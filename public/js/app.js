// Fetch the actors' data from the API and render the list of actors
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
                        <img src="${actor.imageUrl}" alt="${actor.name}">
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
            <img src="${actor.imageUrl}" alt="${actor.name}">
            <h2>${actor.name}</h2>
            <p>${actor.bio}</p>
        `;

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
