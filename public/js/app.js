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

    // Load artist data from Info files
    const artists = [
        { file: '/Info/jimin.js', name: 'Jimin' },
        { file: '/Info/jk.js', name: 'Jungkook' }
    ];

    // Dynamically create buttons for each artist
    artists.forEach(artist => {
        const button = document.createElement('button');
        button.textContent = artist.name;
        button.onclick = () => loadArtistInfo(artist.file);
        artistListDiv.appendChild(button);
    });

    // Function to load artist info
    function loadArtistInfo(filePath) {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                eval(data); // Evaluate the JavaScript code from the file
                if (filePath.includes('jimin')) {
                    displayArtistInfo(jiminData);
                } else if (filePath.includes('jk')) {
                    displayArtistInfo(jkData);
                }
            })
            .catch(error => console.error('Error loading artist info:', error));
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

        // Add 3D effect
        artistInfoDiv.style.transform = 'translateZ(100px)';
        artistInfoDiv.classList.remove('hidden');
        artistInfoDiv.classList.add('show');
    }

    // Back button functionality
    backButton.onclick = () => {
        artistInfoDiv.classList.remove('show');
        artistInfoDiv.classList.add('hidden');
    };
});
