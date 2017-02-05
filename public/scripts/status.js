$(() => {
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


function createOrderElement (orderData) {
  let result = $(
    `<div> ${orderData.order_status} ${orderData.order_time} </div>
  `)
 }

function renderOrder (items) {
  for (item of items) {
    let $item = createOrderElement(item);
    $('.conainer').append($item);
  }
}

function updater (orderId) {
  $('.container').empty();
  $.get("./api/updates" + orderId)
    .success((res) => {
      renderOrder(res)
    })
 }

 // function gatherOrder () {
 //   let itemsOrdered = []
 //   $(".qty").each(function(){
 //    itemsOrdered.push(this.next())
 //    console.log(itemsOrdered)
 // }
 // gatherOrder ()

 // [
 //   {
 //     "item_id": 3,
 //     "order_id": 68
 //   },
 //   {
 //     "item_id": 4,
 //     "order_id": 68
 //   }
 // ]


// $(".confirm").on("click", function(){
//   event.preventDefault();
//   console.log("juicy")
//   $.ajax({
//     method: "POST",
//     url: "/api/order/",
//     data: {
//       order_modifications: $(".modifications").serialize(),
//       order_phone_num: $(".phoneNum").serialize(),
//       itemid: $(".itemsById")
//     },
//       success: ((res) => {
//         updater(res);
//     })
//   });
// })

});
