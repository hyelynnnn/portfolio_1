$(document).ready(function () {
    // 초기화면 출력시 전체checked 속성 부여하기, 전체선택 check box도 포함
    $('#all_chk').prop('checked', true);
    $('[name="item_chk"]').prop('checked', true);
    calculateTotalPrice();


      function pay_total_func(){
        //2번 단
        var amount_total=0;
        var converse_unit=0;
        $('.cart_list li').each(function() {
          //console.log($(this).find('.price_amount').text());
          converse_unit=$(this).find('.price_amount').text().replace(/[^0-9]/g,"");
          amount_total=amount_total+(parseInt(converse_unit)|| 0);
          //총 상품금액
          //console.log(amount_total);
        });
        //총 상품금액
        //var total_amount_money = $('.cart_total_price').children().find('.item_price').text();
        var total_amount_money =$('.cart_total_price').children().find('.item_price').text(amount_total.toLocaleString());
        //할인금액
        var total_sale_money = parseInt($('.cart_total_price').children().find('.sale_price').text().replace(/[^0-9]/g,"")|| 0);
        console.log(total_sale_money);
        //총 배송비
        var total_delivery_price = parseInt($('.cart_total_price').children().find('.delivery_price').text().replace(/[^0-9]/g,"")|| 0);
        console.log(total_delivery_price);
        //총 결제금액
        var total_price=(parseInt(amount_total|| 0)-total_sale_money+total_delivery_price);
        var total_total_price = $('.cart_total_price').children().find('.total_price').text(total_price.toLocaleString());

      }



    // 합계 업데이트 함수
    function updateTotal() {
        var total = 0;
        var checkboxes = document.querySelectorAll('[name="item_chk"]:checked');
        checkboxes.forEach(function (checkbox) {
            var row = checkbox.parentElement.parentElement;
            var amount = parseInt(row.querySelector('.number').value);
            var itemPrice = parseInt(row.querySelector('.itemPrice').value);
            total += amount * itemPrice;
        });

        calculateTotalPrice(total); // Pass the total to the calculateTotalPrice function
        var totalElement = document.querySelector('.total_price');
        totalElement.innerText = total;
    }

    document.getElementById('all_chk').addEventListener('change', function () {
        var checkboxes = document.querySelectorAll('[name="item_chk"]');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = this.checked;
        });
        updateTotal();
    });


    // document.getElementById('all_chk').addEventListener("change", updateAllCheckbox);
    // // 전체 선택 체크박스 업데이트 함수
    // function updateAllCheckbox() {
    //     var checkboxes = document.querySelectorAll('[name="item_chk"]');
    //     var allCheckbox = document.getElementById('all_chk');
    //     allCheckbox.checked = Array.from(checkboxes).every(function (checkbox) {
    //         return checkbox.checked;
    //     });
    // }





    // 전체 선택 체크박스
    document.getElementById('all_chk').addEventListener('click', function () {
        document.getElementById('all_chk').addEventListener('click', function () {
            let checkboxes = document.querySelectorAll('[name="item_chk"]');
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = !checkbox.checked; // Toggle the state
            });

            updateTotal();
        });
    });



    // 개별 상품 체크박스 클릭 시
    document.querySelectorAll('[name="item_chk"]').forEach(function (checkbox) {
        checkbox.addEventListener('click', function () {
            updateTotal();
        });
    });


    $(".minus_btn").on("click", function () {
        updateQuantity(-1, $(this));
        updateCheckboxState($(this));
        calculateTotalPrice(); // Update total price after clicking "-"
    });

    $(".plus_btn").on("click", function () {
        updateQuantity(1, $(this));
        updateCheckboxState($(this));
        calculateTotalPrice(); // Update total price after clicking "+"
    });

    $(".number").on("input", function () {
        calculateTotalPrice(); // Update total price when the quantity changes manually
    });
    function updateCheckboxState(button) {
        var $checkbox = button.closest("li").find('[name="item_chk"]');
        $checkbox.prop("checked", true);
        updateTotal();
    }
    // Update total price when a checkbox is changed
    document.querySelectorAll('[name="item_chk"]').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            calculateTotalPrice();
        });
    });






    function updateQuantity(change, button) {
        var $quantityInput = button.siblings(".number");
        var currentQuantity = parseInt($quantityInput.val()) || 0;
        var newQuantity = currentQuantity + change;

        if (newQuantity >= 0 && newQuantity <= 30) {
            $quantityInput.val(newQuantity).trigger("input");
        }
    }

    function calculateTotalPrice() {
        var totalAmount = 0;

        $(".cart_list li").each(function () {
            var $item = $(this);
            var $checkbox = $item.find('[name="item_chk"]');
            var isChecked = $checkbox.is(":checked");

            var quantity = parseInt($item.find(".number").val()) || 0;
            var itemPrice = parseInt($item.find(".itemPrice").val()) || 0;

            var itemTotalAmount = quantity * itemPrice;

            if (isChecked) {
                totalAmount += itemTotalAmount;
            }

            $item.find(".price_amount").text(new Intl.NumberFormat().format(itemTotalAmount) + "원");
        });

        var totalAmountPrint = $("#totalAmountPrint");
        totalAmountPrint.text(new Intl.NumberFormat().format(totalAmount) + "원");

        // Call your function to update the total price in the cart
        pay_total_func();
    }

    // 장바구니 수량 업데이트
    /*<![CDATA[*/
    var memberId = $("#memberId").text();
    console.log(memberId);
    /*]]>*/

    // let memberId = ""; // 실제 멤버 ID를 가져오는 로직으로 대체
    // console.log(memberId);

    $(".cart-action-btn").click(function () {
        let itemId = $(this).data("item-id");
        console.log(memberId, itemId);
        let action = $(this).hasClass("plus_btn") ? "plus" : "minus";

        // AJAX 요청을 통해 백엔드 컨트롤러에 데이터 전송
        $.ajax({
            type: "GET",
            url: "/cart/amount-" + action,
            data: { memberId: memberId, itemId: itemId },
            success: function () {
                // 성공 시 페이지의 장바구니 수량 업데이트
                updateCartAmount(itemId, action);
            },
            error: function (xhr, status, error) {
                console.error("장바구니 수량 업데이트 에러:", error);
            }
        });
    });

    // 페이지의 장바구니 수량 업데이트를 위한 함수
    function updateCartAmount(itemId, action) {
        var cartAmountInput = $("input.cart-amount[data-item-id='" + itemId + "']");
        var currentAmount = parseInt(cartAmountInput.val());

        if (action === "plus") {
            currentAmount++;
        } else if (action === "minus" && currentAmount > 1) {
            currentAmount--;
        }

        // 업데이트된 수량을 페이지에 반영
        cartAmountInput.val(currentAmount);
    }










});


// =====================================================================================================================
// const plusBtn = document.querySelector('.plus_btn');
// const minusBtn = document.querySelector('.minus_btn');
//
// plusBtn.addEventListener('click', amountPlus);
// minusBtn.addEventListener('click', amountMinus);
//
//
// async function amountPlus() {
//     await amountPlusRequest();
// }
//
// function amountPlusRequest() {
//     const url=`/grrreung/cart/amount-plus?memberId=${map.MEMBER_ID}&itemId=${map.ITEM_ID}`;
//     return fetch(url)
//         .then((response) => {
//             return response.json();
//         });
// }
//
// async function amountMinus() {
//     await amountMinusRequest();
// }
// function amountMinusRequest() {
//     const url=`/grrreung/cart/amount-minus?memberId=${map.MEMBER_ID}&itemId=${map.ITEM_ID}`;
//     return fetch(url)
//         .then((response) => {
//             return response.json();
//         });
// }



























