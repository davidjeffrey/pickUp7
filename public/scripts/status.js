$(() => {



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
