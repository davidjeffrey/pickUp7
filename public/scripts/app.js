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

//   function renderOrder (orderedItems) {
//     $('.container').empty();
//     $.ajax({
//       method: "GET",
//       url: "/api/updates/",
//       data:
//       success: ((items) => {
//         console.log("pp")
//         renderMenu(items);
//       })
//     [
//   {
//     "item_id": 3,
//     "order_id": 68
//   },
//   {
//     "item_id": 4,
//     "order_id": 68
//   }
// ]

    // TODO render order. also going to need to see how to get the timing to update
    // confirmation of order it also something thats going to need to update
  // }

  // $(".confirm").on("click", function(){
  //   event.preventDefault();
  //   $.ajax({
  //     method: "POST",
  //     url: "/api/order/",
  //     data: {
  //       order_modifications: $(".modifications").serialize(),
  //       order_phone_num: $(".phoneNum").serialize(),
  //       itemid: TODO an array
  //       }
  //     success: ((res) => {
  //       renderOrder(res);
  //     })
  //   });
  // })

  loadMenu();

});
