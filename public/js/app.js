document.addEventListener('DOMContentLoaded', () => {
    const artistListDiv = document.getElementById('artist-list');
    const artistInfoDiv = document.getElementById('artist-info');
    const backButton = document.getElementById('back-button');
    const artistName = document.getElementById('artist-name');
    const artistDescription = document.getElementById('artist-description');
    const artistImage = document.getElementById('artist-image');
    const artistBirthdate = document.getElementById('artist-birthdate');
    const artistProfession = document.getElementById('artist-profession');
    const artistSocialMedia = document.getElementById('artist-social-media');
    const artistAchievements = document.getElementById('artist-achievements');

    // List of artist files in the Info folder
    const artistFiles = ['jimin.js', 'jk.js', 'v.js']; // Add new files here

    // Dynamically load artists from Info folder
    artistFiles.forEach(file => {
        fetch(`/Info/${file}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`File not found: ${file}`);
                }
                return response.text();
            })
            .then(data => {
                eval(data); // Evaluate the JavaScript code from the file
                const artistKey = file.split('.')[0]; // Extract artist name from file name
                const artistData = window[`${artistKey}Data`]; // Access global variable
                if (artistData) {
                    createArtistButton(artistData);
                } else {
                    console.error(`Invalid data format in ${file}`);
                }
            })
            .catch(error => console.error(`Error loading ${file}:`, error));
    });

    // Function to create artist buttons
    function createArtistButton(artist) {
        const button = document.createElement('button');
        button.textContent = artist.name;
        button.onclick = () => displayArtistInfo(artist);
        artistListDiv.appendChild(button);
    }

    // Function to display artist info
    function displayArtistInfo(data) {
        artistName.textContent = data.name;
        artistDescription.textContent = data.description;
        artistImage.src = data.image;
        artistImage.alt = data.name;

        // Display additional details
        artistBirthdate.textContent = data.birthdate;
        artistProfession.textContent = data.profession;

        // Clear previous social media links
        artistSocialMedia.innerHTML = '';
        Object.entries(data.socialMedia).forEach(([platform, link]) => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = link;
            anchor.target = '_blank';
            anchor.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
            listItem.appendChild(anchor);
            artistSocialMedia.appendChild(listItem);
        });

        // Clear previous achievements
        artistAchievements.innerHTML = '';
        data.achievements.forEach(achievement => {
            const listItem = document.createElement('li');
            listItem.textContent = achievement;
            artistAchievements.appendChild(listItem);
        });

        // Show artist info section
        artistInfoDiv.classList.remove('hidden');
        artistInfoDiv.classList.add('show');
    }

    // Back button functionality
    backButton.onclick = () => {
        artistInfoDiv.classList.remove('show');
        artistInfoDiv.classList.add('hidden');
    };
});
