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
                <button class="minus">-</button><label class="qty" id="qty${idForItem}">0</label><button class="plus">+</button><div class= "id" style= "display: none">${data.id}</div>
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
        renderMenu(items);
        let itemsOrdered = []
        $(".minus").click(function(){
          removeFromOrder(itemsOrdered, $(this).siblings(".id")[0].innerHTML)
          if (parseInt($(this).siblings(".qty")[0].innerHTML, 10) > 0) {
            let total = getValAndParseInt('#totalPrice') - countTotalPrice(parseInt($(this).parent().siblings(".price")[0].innerHTML, 10), 1);
            $(this).siblings(".qty")[0].innerHTML -= 1;
            $('#totalPrice')[0].innerHTML = total;
          }
        });
        $(".plus").click(function(){
          itemsOrdered.push($(this).siblings(".id")[0].innerHTML)
          let qtyValue = $(this).siblings(".qty").val();
          console.log(qtyValue)
          qtyValue = parseInt($(this).siblings(".qty")[0].innerHTML, 10);
          $(this).siblings(".qty")[0].innerHTML = qtyValue + 1;
          let total = getValAndParseInt('#totalPrice') + countTotalPrice(parseInt($(this).parent().siblings(".price")[0].innerHTML, 10), 1);
          $('#totalPrice')[0].innerHTML = total;
        });
         $(".confirm").on("click", function(){
           function gatherOrder () {
              console.log(itemsOrdered)
            }
           gatherOrder ()
      })
      })
    })
  }


  loadMenu();


});
