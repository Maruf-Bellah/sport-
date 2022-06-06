const searchButton = () =>{
     const searchText = document.getElementById('searchInput').value;
     const erro = document.getElementById('main');
     erro.style.display='none'
     const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
     fetch(url)
     .then(res => res.json())
     .then(data => displayPlayers(data.player))
     
}

const displayPlayers = players => {
     const container = document.getElementById('player');
     container.textContent ='';
     players.forEach(player =>{
          // console.log(player);
          const div = document.createElement('div');
          div.innerHTML =`
          <div class="card my-5" >
          <img widht="50" src="${player.strThumb}"  class="card-img-top" alt="...">
     <div class="card-body">
          <h4 class="card-title">${player.strNationality}</h4>
          <h5 class="card-title">${player.strPlayer}</h5>
          <img id='img' src="${player.strRender ? player.strRender: player.strThumb}"  class="card mb-2">
          <button onclick="deleteButton()" href="#" class="btn btn-danger">Delete</button>
          <button onclick="detailsButton(${player.idPlayer})"  href="#" class="btn btn-primary">Details</button>
     </div>
     </div>
          `
         
          container.appendChild(div)
     });

}


const deleteButton = () => {
     const players =document.getElementById('player');
     players.style.display='none';
}

const detailsButton  = details =>{
     const container = document.getElementById('player');
     container.style.display='none' ;

     const url =`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${details}`;
     fetch(url)
     .then(res => res.json())
     .then(data => detailsContainer(data.players[0]))
} 

const detailsContainer = players =>{
     console.log(players);
     const container = document.getElementById('details');
          const div = document.createElement('div');
          div.innerHTML =`
          <div class="card mb-3 mt-5" >
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${players.strThumb}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Born : ${players.dateBorn}</h5>
                <p class="card-text">Details : ${players.strDescriptionDE.slice(0, 300)}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
          `
           container.appendChild(div)
   
    
       
   
}