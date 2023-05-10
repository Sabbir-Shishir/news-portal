const allCategoryOnload = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCatagory(data.data.news_category))
        .catch(err => console.log(err))
}

const displayCatagory = (names) => {
    const categoryContainer = document.getElementById('category-container');
    names.forEach(name => {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
        <a class="nav-link catagory-link" href="#" onclick="newsOnload(${name.category_id}, '${name.category_name}'), loader(true)">${name.category_name}</a>
        `
        categoryContainer.appendChild(li);
    });

}

const newsOnload = (categoryId, categoryName) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data, categoryName))
        .catch(err => console.log(err))
}

const displayNews = (allNews, categoryName) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``
    
    // Display Category Items Number and Category Name
    const categoryDisplay = document.getElementById('category-display');
    categoryDisplay.innerHTML = `
    <p class="fw-semibold">${allNews.length} items found for category ${categoryName}</p>
    `

    // Display Warning
    const notFound = document.getElementById('warning')
    if (allNews.length === 0) {
        notFound.classList.remove('d-none');
        categoryDisplay.classList.add('d-none');
    } else {
        notFound.classList.add('d-none');
        categoryDisplay.classList.remove('d-none');
    }

    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('shadow');
        newsDiv.classList.add('my-4');
        newsDiv.classList.add('p-3');
        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3">
                <div class="card-thumbnail">
                <img src="${news ? news.thumbnail_url : 'No Data Found'}" class="img-fluid rounded-start" alt="...">
                </div>
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title mb-3">${news ? news.title : 'No Data Found'}</h5>
                    <p class="card-text news-text">${news ? news.details.slice(0, 250) : 'No Data Found'}.</p>
                    <p class="card-text news-text mt-4">${news ? news.details.slice(250, 400) : 'No Data Found'}...</p>
                    <div class="news-details">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="news-author d-flex">
                                    <img src="${news.author ? news.author.img : 'No Data Found'}" alt="">
                                    <div class="ms-2">
                                        <p class="author-name">${news.author.name ? news.author.name : 'No Data Found'}</p>
                                        <p class="publish-date">${news.author.published_date ? news.author.published_date : 'No Data Found'}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="views d-flex">
                                    <i class="fa-regular fa-eye"></i>
                                    <span class="ms-2 fw-bold">${news.total_view ? news.total_view + 'M' : 'No Data Found'}</span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="ratings">
                                    <i class="fa-solid fa-star"></i>
                                    <span class="ms-2 fw-bold">${news.rating.number ? news.rating.number : 'No Data Found'}</span>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="details-button">
                                    <button class="btn btn-outline-dark" onclick="newsDetailsOnload('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
                                    <i class="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(newsDiv);
    });

    // Stop Loading
    loader(false);
}

const newsDetailsOnload = (detailsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${detailsId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]))
    .catch(err => console.log(err))
}

const displayNewsDetails = (newsDetails) => {
    const newsDetailsTitle = document.getElementById('newsDetailsLabel');
    newsDetailsTitle.innerText = `${newsDetails.title}`;
    const newsDetailsContent = document.getElementById('news-details');
    newsDetailsContent.innerHTML = `
    <div class="details-img-wrapper my-4">
        <img src="${newsDetails.image_url}" class="details-image" alt="something wrong">
    </div>
    <div class="details-table-wrapper">
        <table class="table table-bordered">
            <thead class="text-center">
                <tr>
                    <th scope="row">Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <span class="details-property">Category ID:</span>
                        ${newsDetails.category_id ? newsDetails.category_id : 'Not Found'}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="details-property">Total View:</span>
                        ${newsDetails.total_view ? newsDetails.total_view + ' Million' : 'Not Found'}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="details-property">Rating Badge:</span>
                        ${newsDetails.rating ? newsDetails.rating.badge : 'Not Found'}
                    </td>
                </tr>
            </tbody>
        </table>
        
        <table class="table table-bordered">
            <thead class="text-center">
                <tr>
                    <th scope="row">Others Information</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <span class="details-property">Todays Pick:</span>
                        ${newsDetails.others_info ? newsDetails.others_info.is_todays_pick : 'Not Found'}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="details-property">Trending:</span>
                        ${newsDetails.others_info ? newsDetails.others_info.is_trending : 'Not Found'}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `
}

const loader = loading => {
    const loaderSection = document.getElementById('loader');
    if (loading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}

allCategoryOnload()
newsOnload(8, 'All News');