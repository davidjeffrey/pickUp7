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
      `<p>${data.item}</p>
      <p>${data.price}</p>
      <p>${data.item_description}</p>`
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

  function loadMenu (id) {
    $.ajax({
      method: "GET",
      url: "/api/menu/" + window.location.pathname.replace("/u/", ""),
      success: ((items) => {
        console.log("pp")
        renderMenu(items);
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

  function composeOrder (itemsOrdered) {
    for (item of itemsOrdered) {

    }
  }

  $(".confirm").on("click", function(){
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/post/",
      data: {
        order_modifications: $(".modifications").serialize(),
        order_phone_num: $(".phoneNum").serialize(),
        items: {$(".order").serialize()}
        }
      success: ((".order") => {
        renderOrder();
      })
    });
  })


  loadMenu();

});
