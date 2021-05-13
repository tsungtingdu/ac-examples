const movies = [
  {
    title: "The Avengers",
    image: "https://bit.ly/2NQOG6H",
    rating: 0
  },
  {
    title: "Our Times",
    image: "https://bit.ly/2OsGmv2",
    rating: 0
  }
]

const dataPanel = document.querySelector("#data-panel")

function displayMovieList(movies) {
  let HTMLContent = `
   <table class="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Rating</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let i = 0; i < movies.length; i++) {
    HTMLContent += `
      <tr>
        <td>
          <img src = ${movies[i].image} width = "70" class="img-thumbnail" >
        </td>
        <td>${movies[i].title}</td>
        <td>
          <span class="fa fa-thumbs-up"></span>
          <span class="fa fa-thumbs-down px-2"></span>
          <span>${movies[i].rating}</span>
        </td>
        <td>
          <button class="btn btn-sm btn-danger">X</button>
        </td>
      </tr>
    `;
  }

  HTMLContent += `
    </tbody>
      </table>
  `;

  return HTMLContent
}

dataPanel.innerHTML = displayMovieList(movies)

dataPanel.addEventListener("click", function (event) {
  const target = event.target
  
  if (target.matches(".btn-sm")){
    let movie = target.parentElement.parentElement
    movie.remove()
    return
  }
  
  const ratingBox = target.parentElement.children[2]
  let rating = Number(ratingBox.innerText)
  
  if (target.matches(".fa-thumbs-up")) {
    rating += 1
  } else if (target.matches(".fa-thumbs-down")) {
    rating -= 1
  }
  ratingBox.innerText = rating
})
