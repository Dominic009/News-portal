const showCatagory = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    const catagories = data.data.news_category;

    const container = document.getElementById('catagory-container');
    catagories.forEach((catagory) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <ul class="flex gap-5">
        <button onclick = "loadNews('${catagory.category_id}')"
          class="bg-white text-black font-semibold p-2 rounded-md hover:bg-orange-400 hover:text-white cursor-pointer transition-all ease-linear">
       ${catagory.category_name}
        </button>
      </ul>
        `
        container.appendChild(div)
    })
}



const loadNews = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    const news = data.data;

    const container = document.getElementById('news-container');
    container.innerHTML = '';
    news.forEach((newsData) => {

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-side bg-gray-700 shadow-xl w-[80%] mx-auto p-4 mb-5">
        <figure class="w-[50%]">
          <img src="${newsData.thumbnail_url}" alt="Movie"/>
        </figure>
        <div class="card-body">
          <div class="flex justify-between items-center gap-6">
            <h2 class="card-title text-wrap mb-5">${newsData.title.slice(0, 51 )}</h2>
            <div class="flex gap-4 font-semibold">
              <p>Good -</p>
              <p>4.3</p>
            </div>
          </div>
          <p>${newsData.details.slice(0, 500)} ...<span class="text-gray-400">See More</span></p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary bg-orange-300 border-none">
              Read more
            </button>
          </div>
        </div>
      </div>
        `;

        container.appendChild(div);
    })
}



const handleSearch = () => {
    const userInput = document.getElementById('searched-data').value;

    if(userInput){
        loadNews(userInput)
    }
    else{
        alert("Please input valid data")
    }
}


loadNews("08")
showCatagory()