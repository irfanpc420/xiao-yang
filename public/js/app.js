document.addEventListener('DOMContentLoaded', function () {
    // Create an array of actor names (this list will grow as you add more actor files)
    const actors = ['jimin', 'jk'];  

    // Load actor names dynamically
    actors.forEach(actor => {
        fetch(`/actors/${actor}`)
            .then(response => response.json())
            .then(data => {
                const actorDiv = document.createElement('div');
                actorDiv.classList.add('actor-card');
                actorDiv.innerHTML = `
                    <div class="actor-name">${data.name}</div>
                    <div class="actor-info">
                        <p>${data.bio}</p>
                        <p><strong>Born:</strong> ${data.dateOfBirth}</p>
                        <p><strong>Nationality:</strong> ${data.nationality}</p>
                        <p><strong>Position:</strong> ${data.position}</p>
                        <p><strong>Albums:</strong> ${data.albums.join(", ")}</p>
                        <a href="${data.socialLinks.twitter}" target="_blank">Twitter</a>
                        <a href="${data.socialLinks.instagram}" target="_blank">Instagram</a>
                        <a href="${data.socialLinks.youtube}" target="_blank">YouTube</a>
                        <img src="${data.imageURL}" alt="${data.name}" class="actor-image" />
                    </div>
                `;
                document.querySelector('.actors-list').appendChild(actorDiv);

                // Add click event to show actor details
                actorDiv.addEventListener('click', function () {
                    showActorDetails(data);
                });
            });
    });

    function showActorDetails(actorData) {
        const actorDetails = document.querySelector('.actor-details');
        const detailsContent = `
            <h2>${actorData.name}</h2>
            <p>${actorData.bio}</p>
            <p><strong>Born:</strong> ${actorData.dateOfBirth}</p>
            <p><strong>Nationality:</strong> ${actorData.nationality}</p>
            <p><strong>Position:</strong> ${actorData.position}</p>
            <p><strong>Albums:</strong> ${actorData.albums.join(", ")}</p>
            <p><strong>Social Links:</strong></p>
            <a href="${actorData.socialLinks.twitter}" target="_blank">Twitter</a>
            <a href="${actorData.socialLinks.instagram}" target="_blank">Instagram</a>
            <a href="${actorData.socialLinks.youtube}" target="_blank">YouTube</a>
            <img src="${actorData.imageURL}" alt="${actorData.name}" />
        `;
        actorDetails.innerHTML = detailsContent;
        actorDetails.classList.remove('hidden');
        document.querySelector('#back-button').classList.remove('hidden');
    }
});
