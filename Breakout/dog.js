fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(data => data.json())
    .then(response => {
        if (response.status === 'success') {
            const dog = document.querySelector('.dog');
            dog.childNodes[3].src = response.message;
        }
    });
