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

  let idForItem = 1;

  function createMenuElement (data) {
    let result = $(`
      <div class="row content">
          <div class="col-sm-2 sidenav">

          </div>
          <div class="col-sm-8 text-left">
            <div class="row menu-area">
              <div class="col-sm-6 text-left">
                <div id="item${idForItem}">${data.item}</div>
                <div id="item_description${idForItem}">${data.item_description}</div>
              </div>
              <div class="col-sm-2 text-center price" id="price${idForItem}">
                ${data.price}
              </div>
              <div class="col-sm-2 text-center">
                <button class="minus">-</button><label class="qty" id="qty${idForItem}">0</label><button class="plus">+</button>
              </div>
            </div>
          </div>
          <div class="col-sm-2 sidenav">

          </div>
        </div>
    `)
    idForItem++;
    return result;
  }

  function renderMenu (items) {
      // $('.container').empty();
      for (item of items) {
        let $item = createMenuElement(item);
        $('.menuList').append($item);
      }
  }

  function countTotalPrice(price, qty){
    return price * qty;
  }

  function getValAndParseInt(name){
    return parseInt($(name)[0].innerHTML, 10);
  }

  function loadMenu () {
    $.ajax({
      method: "GET",
      url: "/api/menu/1",
      success: ((items) => {
        renderMenu(items);
        $(".minus").click(function(){
          if (parseInt($(this).siblings(".qty")[0].innerHTML, 10) > 0) {
            let total = getValAndParseInt('#totalPrice') - countTotalPrice(parseInt($(this).parent().siblings(".price")[0].innerHTML, 10), 1);
            $(this).siblings(".qty")[0].innerHTML -= 1;
            $('#totalPrice')[0].innerHTML = total;
          }
        });
        $(".plus").click(function(){
          let qtyValue = $(this).siblings(".qty").val();
          qtyValue = parseInt($(this).siblings(".qty")[0].innerHTML, 10);
          $(this).siblings(".qty")[0].innerHTML = qtyValue + 1;
          let total = getValAndParseInt('#totalPrice') + countTotalPrice(parseInt($(this).parent().siblings(".price")[0].innerHTML, 10), 1);
          $('#totalPrice')[0].innerHTML = total;
        });
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
