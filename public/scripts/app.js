$(() => {

  // code below is what was originally in this file. i have left it for reference

  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createMenuElement (data) {
    let result = $(

      //TODO HTML code to be inserted here that will be rendered everything should use
      //the escape function. I should also look at making section titles. Might need to
      //add a category to the database indicating what categories, i.e. mains, apps,
      //are to be included
    )
    return result;
  }

  function renderMenu (items) {
      $('#menu-area').empty();
      for (item of menu) {
        let $item = createMenuElement(item);
        $('#menu-area').append($item);
      }
  }

  function loadMenu () {
    $.ajax({
      method: "GET",
      url: "/api/menu/:id"
    }).success((items) => {
      for(item of menu) {
        renderMenu(items);
      }
    });;
  }

  function createOrderElement (orderData) {
    let result = $(
      // TODO HTML code for the items in the rendered in the order status
    )
  }

  function renderOrder (orderedItems) {
    $('#menu-area').empty();
    // TODO render order. also going to need to see how to get the timing to update
    // confirmation of order it also something thats going to need to update
  }

  $(".confirm").on("click", function(){
    event.preventDefault();
        $.post( "./order", $(".order").serialize())
        .success( function() {
          renderOrder();
          });
  });

  loadMenu();

});
