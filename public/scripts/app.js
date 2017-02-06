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
                <div id="item${idForItem}" class="item_name">${data.item}</div>
                <div id="item_description${idForItem}" class="food_description">${data.item_description}</div>
              </div>
              <div class="col-sm-2 text-center price" id="price${idForItem}">
                ${data.price}
              </div>
              <div class="col-sm-2 text-center qtyBox">
                <i class="fa fa-minus qtyButton minus" aria-hidden="true"></i><label class="qty" id="qty${idForItem}">0</label><i class="fa fa-plus qtyButton plus" aria-hidden="true"></i><div class= "id" style= "display: none">${data.id}</div>
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

  function createOrderElement (orderData) {
    let result = $(`
      <div class="row content">
        <div class="col-sm-2 sidenav">
        </div>
        <div class="col-sm-8 text-left">
          <div class="row menu-area">
            <div class="col-sm-6 text-left">
              <div id="item${idForItem}" class="item_name">${orderData.item}</div>
              <div id="item_description${idForItem}" class="food_description">${orderData.item_description}</div>
            </div>
            <div class="col-sm-2 text-center price" id="price${idForItem}">
              ${orderData.price}
            </div>
            <div class="col-sm-2 text-center">

            </div>
          </div>
        </div>
        <div class="col-sm-2 sidenav">
        </div>
      </div>


      ${orderData.order_status}
      ${orderData.order_time}
      ${orderData.order_estimated_time}
      ${orderData.order_modifications}
      ${orderData.order_phone_num}
      ${orderData.order_id}
      ${orderData.item}
      ${orderData.price}
      ${orderData.item_description}


      // {
      //   "id": 3,
      //   "order_estimated_time": null,
      //   "order_modifications": "none",
      //   "order_phone_num": "9999999999",
      //   "order_status": "order sent",
      //   "order_time": "Sat Feb 04 2017 19:08:42 GMT+0000 (UTC)",
      //   "item_id": 3,
      //   "order_id": 67,
      //   "menu_id": 1,
      //   "item": "cheesecake",
      //   "price": "10",
      //   "item_description": "new york style, out of this world"
      // }

      `)
      return result;
   }

   function orderDetails(data, subTotal, tax, priceAfterTax) {
      let result = $(`
        <div class="row content">
          <div class="col-sm-2 sidenav">
          </div>
          <div class="col-sm-8 text-left priceDetails">
            <div class="row">
              <div class="col-sm-6 text-right">
                <label>Sub Total </label>
              </div>
              <div class="col-sm-2 text-center">
                <div id="subTotal">${subTotal}</div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 text-right">
                <label>Tax (13%) </label>
              </div>
              <div class="col-sm-2 text-center">
                <div id="tax">${tax}</div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 text-right">
                <label id="totalPriceLabel">Total </label>
              </div>
              <div class="col-sm-2 text-center">
                <div id="total">${priceAfterTax}</div>
              </div>
            </div>
          </div>
          <div class="col-sm-2 sidenav">
          </div>
        </div>
        <div class="row content userInfo">
          <div class="col-sm-2 sidenav">
          </div>
          <div class="col-sm-8 text-left">
            <div class="row">
              <div class="col-sm-5 text-center">
                <div>Phone Number</div><div id="userPhone">${data.order_phone_num}</div>
              </div>
              <div class="col-sm-5 text-center">
                <div>Order Status</div><div id="userOrderStatus">${data.order_status}</div>
              </div>
            </div>
          </div>
          <div class="col-sm-2 sidenav">
          </div>
        </div>
        `);
      return result;
   }

  function renderMenu (items) {
      for (item of items) {
        let $item = createMenuElement(item);
        $('.menuList').append($item);
      }
  }

  function renderOrder (items) {
    let subTotal = 0;
    let itemData;
    for (item of items) {
      subTotal += parseInt(item.price, 10);
      let $item = createOrderElement(item);
      $('.container').append($item);
      itemData = item;
    }
    let tax = (subTotal * 0.13).toFixed(2);
    let priceAfterTax = (subTotal * 1.13).toFixed(2);
    let $details = orderDetails(itemData, subTotal, tax, priceAfterTax);
    $('.container').append($details);
  }

  function countTotalPrice(price, qty){
    return price * qty;
  }

  function getValAndParseInt(name){
    return parseInt($(name)[0].innerHTML, 10);
  }

  function removeFromOrder(order, id) {
    let index = order.indexOf(id)
    if (index > -1) {
      order.splice(index, 1);
    }
  }

  function loadMenu () {
    $.ajax({
      method: "GET",
      url: "/api/menu/" + window.location.pathname.replace("/u/", ""),
      success: ((items) => {
        console.log(items)
        renderMenu(items);
        let $itemsOrdered = []
        $(".minus").click(function(){
          removeFromOrder($itemsOrdered, $(this).siblings(".id")[0].innerHTML)
          if (parseInt($(this).siblings(".qty")[0].innerHTML, 10) > 0) {
            let subTotal = getValAndParseInt('#subTotal') - countTotalPrice(parseInt($(this).parent().siblings(".price")[0].innerHTML, 10), 1);
            $(this).siblings(".qty")[0].innerHTML -= 1;
            let tax = (subTotal * 0.13).toFixed(2);
            let totalPrice = (subTotal * 1.13).toFixed(2);
            $('#subTotal')[0].innerHTML = subTotal;
            $('#tax')[0].innerHTML = tax;
            $('#totalPrice')[0].innerHTML = totalPrice;
          }
        });
        $(".plus").click(function(){
          $itemsOrdered.push($(this).siblings(".id")[0].innerHTML)
          let qtyValue = $(this).siblings(".qty").val();
          console.log(qtyValue)
          qtyValue = parseInt($(this).siblings(".qty")[0].innerHTML, 10);
          $(this).siblings(".qty")[0].innerHTML = qtyValue + 1;
          let subTotal = getValAndParseInt('#subTotal') + countTotalPrice(parseInt($(this).parent().siblings(".price")[0].innerHTML, 10), 1);
          let tax = (subTotal * 0.13).toFixed(2);
          let totalPrice = (subTotal * 1.13).toFixed(2);
          $('#subTotal')[0].innerHTML = subTotal;
          $('#tax')[0].innerHTML = tax;
          $('#totalPrice')[0].innerHTML = totalPrice;
        });
        $(".confirm").on("click", function(){
          event.preventDefault();
          $.ajax({
            method: "POST",
            url: "/api/order/",
            data: {
              // order_modifications: $(".modifications").serialize(),
              order_phone_num: $(".phoneNum").val(),
              itemid: $itemsOrdered
            },
            success: ((res) => {
              console.log(res)
              $('.menuList').empty();
              $('.finalizeOrder').empty();
              $.ajax({
                method: "GET",
                url: "/api/updates/" + res,
                success: ((theOrder) => {
                  renderOrder(theOrder)

                })
              })
            })
          });
        })
      })
      })
}

  loadMenu();


});
