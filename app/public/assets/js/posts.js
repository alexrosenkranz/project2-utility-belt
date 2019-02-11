$(document).ready(function () {
  // get categories on load
  $.ajax({
    url: '/api/categories',
    method: 'GET'
  }).then(function (dbCategory) {
    console.log(dbCategory);

    dbCategory.forEach(category => {
      const catOption = $('<option>')
        .val(category.id)
        .text(category.category_name)
        .appendTo($('#category-select'));
    });
  });

  $('#post-form').on('submit', function (e) {
    e.preventDefault();

    // grab form dataa
    const postData = {
      title: $("#post-title").val().trim(),
      body: $("#post-body").val().trim()
    }

    // if we used the category select, grab the values (in an array)
    const selectedCategories = $('#category-select').val();
    console.log(selectedCategories);
    if (selectedCategories.length) {
      postData.categoryList = selectedCategories;
    }

    // if we created a new category, grab the value
    const newCategory = $("#category-input").val().trim();
    if (newCategory) {
      postData.newCategory = newCategory;
    }

    // get image data (only works for single file, not multiple)
    const imageData = $("#image-input").props("files")[0];

    // create formData object (needed for sending image)
    const form = new FormData();
    form.append('title', postData.title);
    form.append('body', postData.body);
    form.append('categoryList', postData.categoryList);
    form.append('newCategory', postData.newCategory);
    form.append('image', imageData);

    $.ajax({
      url: "/api/posts",
      method: "POST",
      data: form,
      cache: false,
      contentType: false,
      processData: false,
    })
    .then(function(data) {
      console.log(data);
    });

  });
});
