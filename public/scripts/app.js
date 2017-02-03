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
      `<p>djdjdj</p>
      <p></p>
      <p></p>`
    )
    return result;
  }

  function renderMenu (items) {
      // $('.container').empty();
      for (item of items) {
        let $item = createMenuElement(item);
        $('.container').append($item);
      }
  }

  function loadMenu () {
    $.ajax({
      method: "GET",
      url: "/api/menu/1",
      success: ((items) => {
      // for(item of menu) {
        console.log("pp")
        renderMenu(items);
      // }
      })
    })
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
